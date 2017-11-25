const routers = [
{
  path: '*',
  meta: {
    title: ''
  },
  component: (resolve) => require(['./app.vue'], resolve)
}
];
export default routers;
