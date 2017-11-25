import Vue from 'vue';
import Vuex from 'vuex';
// 加载根级别store
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

// 加载模块级store
import user from './user';


import axios from 'axios';

//在非生产环境下，使用严格模式
const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

// 实力化状态树
const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {},
  getters,
  // mutations,
  actions,
  // 转变器，用于改变状态数的数据
  mutations: {
    setAvator (state, path) {
      localStorage.avatorImgPath = path;
    }
  },
  modules: {
    user
  }
});

export default store;
