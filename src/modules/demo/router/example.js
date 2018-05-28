// 0: 系统路由
// 1: 模块路由
export const routerLevel = 1;

export default [{
  path: 'demo',
  name: 'demo',
  meta: {
    title: '示例',
  },
  children: [{
    path: 'datatable',
    name: 'datatable',
    meta: {
      title: '列表'
    },
    component: () => import('../view/list.vue'),
  }, {
    path: 'dragable',
    name: 'dragable',
    meta: {
      title: '拖拽门户'
    },
    component: () => import('../view/dragable.vue')
  }]
}];
