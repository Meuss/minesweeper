<template>
  <div class="cell" :class="{ mined: mined, flagged: flagged, revealed: revealed }" @click.prevent="handleReveal()">
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
  props: ["index", "neighbors", "number", "mined", "gameStarted", "gameEnded"],
  methods: {
    handleReveal() {
      // if game is started
      console.log(this.index);
      if (this.gameStarted) {
        this.reveal();
      } else if (!this.gameStarted && !this.gameEnded) {
        // if this is first click
        bus.$emit("startGame");
        this.reveal();
      } else {
        // if game is already finished
        this.revealed = true;
      }
    },
    reveal() {
      this.revealed = true;
      if (this.mined) {
        bus.$emit("endGame");
      } else if (this.number.length === 0) {
        console.log("flood fill time!");
        bus.$emit("floodfillToGrid", this.neighbors);
        // for each neighbor,
        // if neighbor is not mined and it is not revealed
        // reveal it
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
    bus.$on("restartGame", () => {
      this.reset();
    });
    bus.$on("floodfillCells", function(cells) {
      // uh oh... i think i need learn about vuex
      // console.log('floodfill back!!'+ cells);
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
</script>

<style lang="scss" scoped>
.cell {
  width: 25px;
  height: 25px;
  // border: 1px solid black;
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