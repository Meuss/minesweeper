<template>
  <div class="grid">
    <div class="row" v-for="(row, indexY) in rows">
      <div class="col" v-for="(col, indexX) in cols">
        <cell :x="indexX" :y="indexY" :mined="checkIfMined(indexX,indexY)" :gameSize="cols" :gameStarted="gameStarted" :gameEnded="gameEnded">
        </cell>
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
      cols: 8,
      rows: 8,
      totalMines: 30,
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
        this.minePositions.push(this.generateMinePos(0, this.cols));
      }
    },
    generateMinePos(min, max) {
      const arrayPos = [];
      const x = Math.floor(max - Math.random() * (max - min));
      const y = Math.floor(max - Math.random() * (max - min));
      arrayPos.push(x, y);
      return arrayPos;
    },
    checkIfMined(x, y) {
      let mines = this.minePositions;
      let thisPos = [x, y];
      mines = JSON.stringify(mines);
      thisPos = JSON.stringify(thisPos);
      const yes = mines.indexOf(thisPos);
      if (yes != -1) {
        return true;
      } else {
        return false;
      }
    },
    calculateNumber() {
      const cells = this.getNeighbors(this.x, this.y);
      for (const cell of cells) {
        console.log(cell);
      }
    },
    getNeighbors(x, y) {
      const nb = [];
      nb.push([x - 1, y - 1]);
      nb.push([x, y - 1]);
      nb.push([x + 1, y - 1]);
      nb.push([x - 1, y]);
      nb.push([x + 1, y]);
      nb.push([x - 1, y + 1]);
      nb.push([x, y + 1]);
      nb.push([x + 1, y + 1]);
      const gs = this.gameSize;
      function sideCells(pos) {
        const positions = Object.values(pos);
        if (positions.includes(-1) || positions.includes(gs)) {
          return;
        } else {
          return pos;
        }
      }
      const filtered = nb.filter(sideCells);
      return filtered;
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
.row {
  display: flex;
  justify-content: center;
}
</style>