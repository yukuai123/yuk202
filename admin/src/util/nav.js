export default {
  index: {
    title: '首页',
    path: '/index/display',
    child: [
      {
        sub: '展示',
        menu: [
          {name: '数据', path: 'display'},
          {name: '设置', path: 'setting'}
        ]
      }
    ]
  },
  page: {
    title: '文章',
    path: '/page/list',
    child: [{
      sub: '管理',
      menu: [
        { name: '列表', path: 'list'},
        {name: '瞎比比', path: 'addPage'},
      ]
    }]
  },
  label: {
    title: '标签',
    path: '/label/manageLabel',
    child: [{
      sub: '管理',
      menu: [
        {name: '分类&标签', path: 'manageLabel'},
      ]
    }]
  },
  about: {
    title: '关于',
    path: '/about/see',
    child: [{
      sub: '管理',
      menu: [
        {name: '查看', path: 'see'},
      ]
    }]
  },
  message: {
    title: '留言',
    path: '/message/status',
    child: [{
      sub: '操作',
      menu: [
        {name: '审核', path: 'status'}
      ]
    }]
  }
}
