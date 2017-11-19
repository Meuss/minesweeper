<template>
  <div class="wrapper">
    <div class="grid">
      <div v-for="(cell, index) in totalCells">
        <cell :index="index" :neighbors="calculateNeighbors(index)" :number="calculateNumber(index)" :mined="checkIfMined(index)"></cell>
      </div>
    </div>
    <div class="mines-left">{{minesleft}} mines left!</div>
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
      totalMines: 150,
      minePositions: []
    };
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
  beforeMount() {
    this.setMines();
  },
  mounted() {
    let mines = this.minePositions;
    bus.$on("floodfillToGrid", function(cells) {
      let cellsFlood = [];
      // bus.$emit("floodfillCells", cells);
      cells.forEach(function(index) {
        if (mines.includes(index)) {
        } else {
          cellsFlood.push(index);
        }
      });
      bus.$emit("floodfillToCells", cellsFlood);
    });
  },
  methods: {
    setMines() {
      this.minePositions = [];
      let possibilities = [];
      for (var i = 1; i < this.totalCells; i++) {
        possibilities.push(i);
      }
      for (var i = 0; i < this.totalMines; i++) {
        const choice = this.generateMinePos(0, this.totalCells);
        // removing duplicates
        if (possibilities.includes(choice)) {
          possibilities.splice(choice, 1);
          this.minePositions.push(choice);
        } else {
          // refactor this. For now this means one less mine.
        }
      }
      this.$store.commit("setMinesLeft", this.minePositions.length);
    },
    generateMinePos(min, max) {
      const x = Math.floor(max - Math.random() * (max - min));
      return x;
    },
    checkIfMined(x) {
      let mines = this.minePositions;
      if (mines.includes(x)) {
        return true;
      } else {
        return false;
      }
    },
    calculateNeighbors(x) {
      let neighbors = [];
      const a = Math.sqrt(this.totalCells);

      if (x === 0) {
        // top left corner
        neighbors.push(x + 1, x + a, x + a + 1);
      } else if (x === a - 1) {
        // top right corner
        neighbors.push(x - 1, x + a - 1, x + a);
      } else if (x === this.totalCells - a) {
        // bottom left corner
        neighbors.push(x - a, x - (a - 1), x + 1);
      } else if (x === this.totalCells - 1) {
        // bottom right corner
        neighbors.push(x - (a + 1), x - a, x - 1);
      } else if (x != 0 && x != a - 1 && x < a) {
        // top side
        neighbors.push(x - 1, x + 1, x + (a - 1), x + a, x + a + 1);
      } else if (x != 0 && x % a === 0) {
        // left side
        neighbors.push(x - a, x - (a - 1), x + 1, x + a, x + a + 1);
      } else if (x != a - 1 && x % a === a - 1) {
        // right side
        neighbors.push(x - (a + 1), x - a, x - 1, x + (a - 1), x + a);
      } else if (x > this.totalCells - a && x <= this.totalCells - 1) {
        // bottom side
        neighbors.push(x - (a + 1), x - a, x - (a - 1), x - 1, x + 1);
      } else {
        // all other values
        neighbors.push(
          x - (a + 1),
          x - a,
          x - (a - 1),
          x - 1,
          x + 1,
          x + (a - 1),
          x + a,
          x + a + 1
        );
      }
      const filteredN = neighbors.filter(function(x) {
        return x >= 0;
      });
      return filteredN;
    },
    calculateNumber(x) {
      const theNeighbors = this.calculateNeighbors(x);
      let mines = this.minePositions;
      const intersection = mines.filter(element =>
        theNeighbors.includes(element)
      );
      const neighbMines = [...new Set(intersection)];
      return neighbMines;
    },
    restart() {
      this.$store.commit("reset");
      this.setMines();
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