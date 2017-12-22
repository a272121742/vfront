'use strict'
// import userlist from './views/user-list.vue';
// const req = require.context('./views', true, /\.vue$/);

const use = (...files) => resolve => require.ensure([], () => {
  files.forEach(file => {
    resolve(require('./views/' + file + '.vue'));
  });
});

const routers = [
  {
    path: '*',
    meta: {
      title: ''
    },
    component: resolve => require(['./app.vue'], resolve)
  }
];
export default routers;
