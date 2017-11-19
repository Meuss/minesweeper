import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    gameStarted: false,
    gameEnded: false,
    minesleft: 0
  },
  getters: {},
  mutations: {
    reset(state) {
      state.gameStarted = false;
      state.gameEnded = false;
    },
    start(state) {
      state.gameStarted = true;
      state.gameEnded = false;
    },
    end(state) {
      state.gameStarted = false;
      state.gameEnded = true;
    },
    setMinesLeft(state, amount) {
      state.minesleft = amount;
    },
    reduceMinesleft: (state, amount) => {
      state.minesleft -= amount;
    },
    addMinesleft: (state, amount) => {
      state.minesleft += amount;
    }
  },
  actions: {
    reduceMinesleft: (context, amount) => {
      context.commit('reduceMinesleft', amount);
    },
    addMinesleft: (context, amount) => {
      context.commit('addMinesleft', amount);
    }
  }
});
