<template>
  <div class="grid">
    <div class="row" v-for="(row, indexY) in rows">
      <div class="col" v-for="(col, indexX) in cols">
        <cell :x="indexX" :y="indexY" :mined="checkIfMined(indexX,indexY)" :gameSize="cols"></cell>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../bus.js";
import Cell from "./Cell.vue";

export default {
  name: "Grid",
  data() {
    return {
      cols: 10,
      rows: 10,
      totalMines: 30,
      minePositions: []
    };
  },
  props: ["gameStarted"],
  created() {
    bus.$on("startGame", this.setMines);
  },
  methods: {
    setMines() {
      this.minePositions = [];
      for (var i = 0; i < this.totalMines; i++) {
        // still need to make sure minePositions doesn't have duplicates
        this.minePositions.push(this.generateMinePos(0, 10));
      }
    },
    generateMinePos(min, max) {
      const arrayPos = [];
      const x = Math.floor(max - Math.random() * (max - min));
      const y = Math.floor(max - Math.random() * (max - min));
      arrayPos.push(x, y);
      return arrayPos;
    },
    checkIfMined(x,y) {
      let mines = this.minePositions;
      let thisPos = [x,y];
      mines = JSON.stringify(mines);
      thisPos = JSON.stringify(thisPos);
      const yes = mines.indexOf(thisPos);
      if(yes != -1){
        return true;
      } else {
        return false;
      }
    }
    // isArrayInArray(arrayToSearch, arrayToFind) {
    //   for (let i = 0; i < arrayToSearch.length; i++) {
    //     if (arrayToSearch[i][0] === arrayToFind[0] && arrayToSearch[i][1] === arrayToFind[1]) {
    //       return true;
    //     }
    //   }
    //   return false;
    // },
    // pushArray(array) {
    //   if (!isArrayInArray(arrayArr, array)) {
    //     arrayArr.push(array);
    //   }
    // }
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