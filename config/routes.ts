export default [
  {
    path: '/',
    component: 'Home',
  },
  {
    path: '/home',
    component: 'Home',
    name: '主页'
  },
  {
    path: '/find',
    component: 'Find',
    name: '发现'
  },
  {
    path: '/publish',
    component: 'Topic/Publish',
    name: '发布文章'
  },
  {
    path: '/list',  //在List组件中设置筛选条件
    component: 'Topic/List',
    name: '文章列表',
    menuRender: false
  },
  {
    path: '/login',
    component: 'Login',
    layout: false,  //关闭整体布局
  },
  {
    path: '/register',
    component: 'Register',
    layout: false
  },
  {
    path: '/userinfo',
    component: 'UserInfo'
  }
]