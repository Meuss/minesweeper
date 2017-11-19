<template>
  <div class="cell" 
    :class="{ mined: mined, flagged: flagged, revealed: revealed }" 
    @click.prevent="handleReveal()" 
    :data-index="index"
    @contextmenu.prevent="rightClickHandler($event, index)"
    >
    <span v-if="number.length > 0 && !mined && revealed">{{number.length}}</span>
    <span v-if="flagged">
      <svg x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve">
        <polygon style="fill:#CC4B4C;" points="52,23.5 10,40 10,22 10,4 "/>
        <path style="fill:#424A60;" d="M9,0C8.448,0,8,0.447,8,1v3v55c0,0.553,0.448,1,1,1s1-0.447,1-1V4V1C10,0.447,9.552,0,9,0z"/>
      </svg>
    </span>
  </div>
</template>

<script>
import bus from "../bus.js";
import {mapActions} from 'vuex';

export default {
  name: "Cell",
  data: function() {
    return initialState();
  },
  computed: {
    gameStarted() {
      return this.$store.state.gameStarted;
    },
    gameEnded() {
      return this.$store.state.gameEnded;
    },
    minesleft() {
      return this.$store.state.minesleft;
    }
  },
  props: ["index", "neighbors", "number", "mined"],
  methods: {
    ...mapActions([
      'reduceMinesleft',
      'addMinesleft'
    ]),
    rightClickHandler(e, i) {
      if(!this.revealed) {
        if(!this.flagged) {
          this.flagged = true;
          this.reduceMinesleft(1);
        } else {
          this.flagged = false;
          this.addMinesleft(1);
        }
      }
    },
    handleReveal() {
      if (!this.flagged) {
        if (this.gameStarted && !this.revealed) {
          // if game is started
          this.reveal();
        } else if (!this.gameStarted && !this.gameEnded) {
          // if this is first click
          this.$store.commit("start");
          this.reveal();
        } else {
          // if game is already finished
          this.revealed = true;
        }
      }
    },
    reveal(i) {
      this.revealed = true;
      if (this.mined) {
        this.$store.commit("end");
      } else if (this.number.length === 0) {
        bus.$emit("floodfillToGrid", this.neighbors);
      }
    },
    reset() {
      let initialData = initialState();
      for (let prop in initialData) {
        this[prop] = initialData[prop];
      }
    }
  },
  mounted() {
    const i = this.index;
    bus.$on("floodfillToCells", function(cells) {
      if (cells.includes(i)) {
        extFct(i);
      }
    });
  },
  watch: {
    gameEnded: function() {
      if (this.gameEnded == true) {
        this.revealed = true;
      } else {
        this.revealed = false;
      }
    }
  }
};
function initialState() {
  return {
    flagged: false,
    revealed: false
  };
}
function extFct(i) {
  const toClick = document.querySelector('.cell:not(.revealed):not(.flagged)[data-index="'+i+'"]');
  if(toClick != null) {
    toClick.click();
  }
}
</script>

<style lang="scss" scoped>
.cell {
  width: 25px;
  height: 25px;
  background-color: #c1c1c1;
}
.revealed {
  background-color: white;
  &.mined {
    background-color: red;
  }
}
.flagged {
  background-color: #c1c1c1;
}
</style>