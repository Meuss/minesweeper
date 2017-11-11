<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <grid v-bind:gameStarted="gameStarted"></grid>
    <button @click="startGame">Start game</button>
  </div>
</template>

<script>
import bus from "./bus.js";
import Grid from "./components/Grid.vue";
export default {
  name: "app",
  data() {
    return {
      title: "Minesweeper",
      gameStarted: false
    };
  },
  components: {
    grid: Grid
  },
  methods: {
    startGame() {
      bus.$emit("startGame");
      this.gameStarted = !this.gameStarted;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}
button {
  padding: 10px;
  background-color: white;
  margin-top: 20px;
  border: 1px solid #2c3e50;
  outline: none;
}
a,
button {
  color: #42b983;
}
</style>
