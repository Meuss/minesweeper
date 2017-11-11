<template>
  <div class="cell" v-bind:class="{ mined: mined, flagged: flagged, revealed: revealed }" @click="handleReveal"></div>
</template>

<script>
export default {
  name: "Cell",
  data() {
    return {
      flagged: false,
      revealed: false
    };
  },
  props: ["x", "y", "mined", "gameSize"],
  methods: {
    handleReveal() {
      this.reveal();
      this.getNeighbors(this.x, this.y);
    },
    reveal() {
      this.revealed = true;
    },
    // returns array with arrays of positions of neighbor cells
    getNeighbors(x,y) {
      const nb = [];
      nb.push([x-1,y-1]);
      nb.push([x,y-1]);
      nb.push([x+1,y-1]);
      nb.push([x-1,y]);
      nb.push([x+1,y]);
      nb.push([x-1,y+1]);
      nb.push([x,y+1]);
      nb.push([x+1,y+1]);
      const gs = this.gameSize;
      function sideCells(pos) {
        const positions = Object.values(pos); 
        if(positions.includes(-1) || positions.includes(gs)) {
          return;
        } else {
          return pos;
        }
      }
      const filtered = nb.filter(sideCells);
      return filtered;
    }
  }
};
</script>


<style lang="scss" scoped>
.cell {
  width: 40px;
  height: 40px;
  border: 1px solid black;
}
.revealed {
  background-color: lightgray;
  &.mined {
    background-color: red;
  }
}
.flagged {
  background-color: green;
}
</style>