export const routerLevel = 0;
export default [
  {
    path: '/403',
    meta: {
      title: '403'
    },
    component: () => import('../view/403.vue'),
  },
  {
    path: '/404',
    meta: {
      title: '404'
    },
    component: () => import('../view/404.vue'),
  },
  {
    path: '/500',
    meta: {
      title: '500'
    },
    component: () => import('../view/500.vue'),
  }
];
