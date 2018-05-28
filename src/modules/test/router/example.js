// 0: 系统路由
// 1: 模块路由
export const routerLevel = 1;

export default [{
  path: 'test',
  name: 'test',
  meta: {
    title: '测试管理',
  },
  children: [{
    path: 'apis',
    name: 'apis',
    meta: {
      title: '接口测试'
    },
    component: () => import('../view/example.vue'),
  }]
}];
