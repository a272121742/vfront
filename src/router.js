'use strict';

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
  },
];
export default routers;
