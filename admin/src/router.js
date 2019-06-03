import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'NotFound404',
      component: resolve => { require(['./components/NotFound404'],resolve)},

    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => { require(['./views/login'],resolve)},
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => { require(['./views/index'],resolve)},
      redirect: '/index/display',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        {
          path: '/index/display',
          name: 'display',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: resolve => { require(['./views/index/display'],resolve)},
        },

        {
          path: '/index/setting',
          name: 'setting',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: resolve => { require(['./views/index/setting'],resolve)},

        }
      ]
    },

    {
      path: '/page',
      name: 'page',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => { require(['@/views/index'], resolve)},
      redirect: '/page/list',
      children: [
        {
          path: '/page/list',
          name: 'list',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: resolve => { require(['@/views/page/list'],resolve)},
        },

        {
          path: '/page/addPage',
          name: 'addPage',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: resolve => { require(['@/views/page/addPage'],resolve)},
        }
      ]
    },

    {
      path: '/label',
      name: 'label',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => { require(['@/views/index'], resolve)},
      redirect: '/label/manageLabel',
      children: [
        {
          path: '/label/manageLabel',
          name: 'manageLabel',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: resolve => { require(['@/views/label/manageLabel'],resolve)},
        },

      ]
    },

    {
      path: '/about',
      name: 'about',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => { require(['@/views/index'], resolve)},
      redirect: '/about/see',
      children: [
        {
          path: '/about/see',
          name: 'see',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: resolve => { require(['@/views/about/see'],resolve)},
        },

      ]
    },

    {
      path: '/message',
      name: 'message',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => { require(['@/views/index'], resolve)},
      redirect: '/message/status',
      children: [
        {
          path: '/message/status',
          name: 'status',
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: resolve => { require(['@/views/message/status'],resolve)},
        },
      ]
    },
  ]

})
