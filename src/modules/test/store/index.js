export default {
  state: {
    apis: []
  },
  getters: {},
  mutations: {},
  actions: {}
};

/**
 * // store文件夹下的`index.js`不可更改名字；
 * // 除了上面的方式或者使用更粒度化的管理方式；
 * // *推荐使用下面的方式，这将更容易测试；
   import actions from './actions';
   import mutations from './mutations';
   import getters from './getters';
   export default {
     state: {
     },
     getters,
     actions,
     mutations
   };
 */
