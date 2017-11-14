<template>
  <div class="cell" :class="{ mined: mined, flagged: flagged, revealed: revealed }" @click.prevent="handleReveal()"></div>
</template>

<script>
import bus from "../bus.js";
export default {
  name: "Cell",
  data: function() {
    return initialState();
  },
  props: ["x", "y", "mined", "gameSize", "gameStarted", "gameEnded"],
  methods: {
    handleReveal() {
      // if game is started
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
  },
  watch: {
    gameEnded: function(){
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
  width: 40px;
  height: 40px;
  border: 1px solid black;
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