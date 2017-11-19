<template>
  <div class="cell" :class="{ mined: mined, flagged: flagged, revealed: revealed }" @click.prevent="handleReveal()" :data-index="index">
    <span v-if="number.length > 0 && !mined && revealed">{{number.length}}</span>
  </div>
</template>

<script>
import bus from "../bus.js";
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
    }
  },
  props: ["index", "neighbors", "number", "mined"],
  methods: {
    handleReveal() {
      if (this.gameStarted && !this.revealed) {
      console.log(this.index);
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
  const toClick = document.querySelector('.cell:not(.revealed)[data-index="'+i+'"]');
  toClick.click();
}
</script>

<style lang="scss" scoped>
.cell {
  width: 25px;
  height: 25px;
  background-color: white;
}
.revealed {
  background-color: #c1c1c1;
  &.mined {
    background-color: red;
  }
}
.flagged {
  background-color: green;
}
</style>