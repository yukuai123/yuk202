// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/style/global.scss';
import './assets/css-source/reset.css';
import './assets/iconfont/iconfont.css';
import plug from '@/util/plug';
import store from '@/store/index';
import '@/assets/css-source/animation.css';

Vue.use(plug);
Vue.config.productionTip = false;



Vue.directive('typist',{
      bind(el,binding){
        let delay = 1;
        let str = el.innerText;
        el.innerText = '';
        str.split('').forEach(i=>{
          setTimeout(()=>{
            el.innerText += i;
          },100 * delay)
          delay++;
        })
      }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
});
