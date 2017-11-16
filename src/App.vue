<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <grid></grid>
  </div>
</template>

<script>
import bus from "./bus.js";
import Grid from "./components/Grid.vue";
export default {
  name: "app",
  data() {
    return {
      title: "Minesweeper with Vue.js"
    };
  },
  components: {
    grid: Grid
  }
};
</script>

<style lang="scss">
html {
}
body {
  height: 100vh;
  margin: 0px;
  // background: linear-gradient(to bottom, #F0CB35, #C02425);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

h1,
h2 {
  font-weight: normal;
  margin-top: 0px;
}
</style>
