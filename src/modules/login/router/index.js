export const routerLevel = 0;
export default [
  {
    path: '/login',
    meta: {
      title: '登陆页面'
    },
    component: () => import('../view/login.vue'),
    children: []
  }
];
