<template>
  <div class="wrapper">
    <div class="grid">
      <div v-for="(cell, index) in totalCells">
        <cell :index="index" :number="calculateNeighbors(index)" :mined="checkIfMined(index)" :gameStarted="gameStarted" :gameEnded="gameEnded"></cell>
      </div>
    </div>
    <button v-show="gameEnded" @click="restart">Restart</button>
  </div>
</template>

<script>
import bus from "../bus.js";
import Cell from "./Cell.vue";

export default {
  name: "Grid",
  data() {
    return {
      totalCells: 676,
      totalMines: 200,
      minePositions: [],
      gameStarted: false,
      gameEnded: false
    };
  },
  beforeMount() {
    this.setMines();
  },
  mounted() {
    bus.$on("startGame", () => {
      console.log("started in grid");
      this.gameStarted = true;
      this.gameEnded = false;
      // this.setMines();
    });
    bus.$on("endGame", () => {
      console.log("ended in grid");
      this.gameStarted = false;
      this.gameEnded = true;
    });
  },
  methods: {
    setMines() {
      this.minePositions = [];
      for (var i = 0; i < this.totalMines; i++) {
        // still need to make sure minePositions doesn't have duplicates
        this.minePositions.push(this.generateMinePos(0, this.totalCells));
      }
      // console.log(this.minePositions.length);
    },
    generateMinePos(min, max) {
      const x = Math.floor(max - Math.random() * (max - min));
      return x;
    },
    checkIfMined(x) {
      let mines = this.minePositions;
      // console.log(mines);
      if(mines.includes(x)) {
        return true;
      } else {
        return false;
      }
    },
    calculateNeighbors(x) {
      // still need to remove corners
      // top side
      if(x < 26) {
        const neighbors = [x-1, x+1, x+25, x+26, x+27];
        const filteredN = neighbors.filter(function(x){ return x > 0 });
        return filteredN;
      }
      // left side
      else if((x != 0) && (x % 26 === 0)) {
        const neighbors = [x-26, x-25, x+1, x+26, x+27];
        const filteredN = neighbors.filter(function(x){ return x > 0 });
        return filteredN;
      }
      // right side
      else if((x != 25) && (x % 26 === 25)) {
        const neighbors = [x-27, x-26, x-1, x+25, x+26];
        const filteredN = neighbors.filter(function(x){ return x > 0 });
        return filteredN;
      }
      // bottom side
      else if((x > 650) && (x < 675)) {
        const neighbors = [x-27, x-26, x-25, x-1, x+1];
        const filteredN = neighbors.filter(function(x){ return x > 0 });
        return filteredN;
      // all other values
      } else {
        const neighbors = [x-27, x-26, x-25, x-1, x+1, x+25, x+26, x+27];
        const filteredN = neighbors.filter(function(x){ return x > 0 });
        return filteredN;
      }
    },
    restart() {
      this.gameStarted = false;
      this.gameEnded = false;
      this.setMines();
      bus.$emit("restartGame");
    }
  },
  components: {
    cell: Cell
  }
};
</script>


<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-rows: repeat(26, 1fr);
  grid-template-columns: repeat(26, 1fr);
  grid-gap: 1px;
  background-color: black;
  padding: 2px;
}
</style>