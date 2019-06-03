import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'NotFound404',
      component: resolve => { require(['@/components/NotFound404'],resolve)},
    },
    {
      path: '/',
      name: 'index',
      component: resolve => { require(['@/view/index'],resolve)},
      redirect: '/index/list',
      children: [
        {
          path: '/index/list',
          name: 'indexList',
          component: resolve => { require(['@/view/indexList'],resolve)},
        },

        {
          path: '/index/pageDetail',
          name: 'pageDetail',
          component: resolve => { require(['@/view/pageDetail'],resolve)},
        },
        {
          path: '/index/arrange',
          name: 'arrange',
          component: resolve => { require(['@/view/arrange'],resolve)},
        },
        {
          path: '/index/about',
          name: 'about',
          component: resolve => { require(['@/view/about'],resolve)},
        },
        {
          path: '/index/messageBoard',
          name: 'messageBoard',
          component: resolve => { require(['@/view/messageBoard'],resolve)},
        }
      ]
    }
  ]
})
