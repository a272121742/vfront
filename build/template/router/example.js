// 0: 系统路由（开发人员禁用）
// 1: 模块路由
export const routerLevel = 1;

export default [{

}];

/**
 *  @example
 *  export default [{
      path: 'roles',
      name: 'roles',
      meta: {
        title: '角色管理',
      },
      component: () => import('abstract_roles.vue'),
      children: [{
        path: 'qxgl1',
        name: 'role-item1',
        meta: {
          title: '角色item-1'
        },
        component: () => import('_item1.vue'),
      }, {
        path: 'qxgl2',
        name: 'role-item2',
        meta: {
          title: '角色item-2'
        },
        component: () => import('_item2.vue'),
      }]
    }, {
      path: 'accounts',
      meta: {
        title: '用户管理',
      },
      component: () => import('abstractUser.vue'),
      children: [{
        path: 'list',
        meta: {
          title: '账户列表'
        },
        component: () => import('list.vue'),
      }]
    }];
 */
