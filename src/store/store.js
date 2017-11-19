import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    gameStarted: false,
    gameEnded: false
  },
  getters: {
    // saleProducts: (state) => {
    //   var saleProducts = state.products.map( product => {
    //     return {
    //       name:  '**' + product.name + '**',
    //       price: product.price / 2,
    //       };
    //     });
    //   return saleProducts;
    // }
  },
  mutations: {
    // reducePrice: (state, payload) => {
    //   state.products.forEach( product => {
    //     product.price -= payload
    //   });
    // }
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
    }
  },
  actions: {
    // reducePrice: (context, payload) => {
    //   setTimeout(function(){ // reach out for data
    //     context.commit('reducePrice', payload);
    //   }, 2000);
    // }
  }
});
