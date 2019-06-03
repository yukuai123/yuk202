import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    user: JSON.parse(sessionStorage.getItem('user')) || {},
    //默认路由样式
    path: '/index/display'
  },
  mutations: {
    setUser: (state, content) => {
      state.user = content;
      sessionStorage.setItem('user', content);
    },
    clearUser: ()=> sessionStorage.removeItem('user'),
    setPath: (state,  content)=> state.path = content ,
  },

  actions: {

  },
  getters: {
    getUser: state => state.user,
    getPath: state => state.path,
  }
})
