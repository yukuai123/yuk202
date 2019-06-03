import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    hasSubmitMsg: false
  },
  mutations: {
    submit(state, content){
      state.hasSubmitMsg = true;
    },
    clearSubmit(state, content){
      state.hasSubmitMsg = false;
    }
  },
  getters: {
    getStatus: (state)=> state.hasSubmitMsg,
  }
})
