// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//路由
import router from './router'

//element框架 记得引入css框架样式
import 'element-ui/lib/theme-chalk/index.css';
import element from 'element-ui';

//自定义插件
import plug from './util/plug';

//自定义css
import '@/assets/css/global.scss';
import '@/assets/css/reset.css';

//vuex
import store from './store.js';

//css动画库
import '@/assets/css/animation.css';



//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//使用插件
Vue.use(VueQuillEditor);
Vue.use(element);
Vue.use(plug);
Vue.config.productionTip = false;



//路由守卫 判断是否有登录token 设置每一次路由改变时路由名给vuex 改变状态。
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限

    if (!sessionStorage.getItem('user') || JSON.stringify(store.getters.user) === '{}') { // 判断是否登录

      if (to.name === 'login'){
        next();
      } else{
        router.replace('/')
      }
    }
    else {
      store.commit('setPath', to.path);
      next()
    }
  } else {
    next()
  }
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
