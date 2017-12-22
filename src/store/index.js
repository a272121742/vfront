'use strict'

import Vue from 'vue';
import Vuex from 'vuex';
// 加载根级别store
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

/**
 * 引用所有模块
 * TODO: 改用Proxy进行自动填充， 参考 http://www.infoq.com/cn/articles/es6-in-depth-proxies-and-reflect/ 小试牛刀（一）：“不可能实现的”自动填充对象
 */
const reqAll = () => {
  // 目录进行排序
  const sortFn = (n, m) => n.split('/').length > m.split('/').length;
  // 设置模块引用
  const setModules = (obj, value, keys) => {
    let prop = obj;
    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        prop[k] = value;
      } else {
        prop = prop[k].modules;
      }
    });
  };
  const req = require.context('./', true, /^\.(\/\w+)+\/index.js$/);
  let modules = {};
  req.keys().sort(sortFn).forEach(mod => {
    let moduleNames = mod.split('/').slice(1, -1);
    let moduleExport = req(mod).default;
    moduleExport.namespaced = true;
    moduleExport.modules = {};
    setModules(modules, moduleExport, moduleNames);
  });
  return modules;
};
var modules = reqAll();

// 在非生产环境下，使用严格模式
const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

// 实力化状态树
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  getters,
  // mutations,
  actions,
  // 转变器，用于改变状态数的数据
  mutations,
  modules
});

export default store;
