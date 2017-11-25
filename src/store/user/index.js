import Vue from 'vue';
import axios from 'axios';
import api from '@/api/user';

const USER_TEMPLATE = {
  name: '',
  age: 18,
  email: ''
};


const store = {
  // 启用命名空间，调用使用‘user/XXXX’
  namespaced: true,
  // 状态树，用于存储某个组件或者某个页面的数据
  state: {
    current: 1,
    total: 0,
    pageSize: 10,
    users: [],
    user: USER_TEMPLATE
  },
  // 获取器，用于获取状态树的数据
  getters: {
    getCurrent: state => state.current,
    getTotal: state => state.total,
    getPageSize: state => state.pageSize,
    // 根据分解组件筛选出数据；
    getUsers: state => state.users.filter((item, index) => {
      let beginIndex = (state.current - 1) * state.pageSize;
      let endIndex = beginIndex + state.pageSize;
      return index >= beginIndex && index < endIndex;
    }),
    current: state => state.current,
    getUser: state => state.user,
    hasUsers: (state, getters) => state.users[(state.current - 1) * state.pageSize] !== undefined,
    hasRemovedUsers: (state, getters) => getters.getUsers.length < state.pageSize,
    isEmpty: (state, getters) => getters.getUsers.length === 0
  },
  // 转变器，用于改变状态数的数据
  mutations: {
    clearUsers (state) {
      Vue.set(state, 'users', []);
    },
    // 数据添加到缓存，按照相应位置
    setUsers (state, users) {
      let index = (state.current - 1) * state.pageSize;
      let length = users.length;
      state.users.splice(index, length, ...users);
    },
    setUser (state, user) {
      Vue.set(state, 'user', user || {});
    },
    resetUser (state) {
      Vue.set(state, 'user', USER_TEMPLATE);
    },
    delUser (state, id) {
      let index = state.users.findIndex(user => user && user.id === id);
      state.users.splice(index, 1);
      state.total--;
      if(!this.getters['user/getUsers'].length){
        this.commit('user/prevPage');
      }
    },
    upgradeUser (state, user) {
      let index = state.users.findIndex(u => u && u.id === user.id);
      if(!~index){
        state.users.unshift(user);
      }else{
        state.users.splice(index, 1, user);
      }
    },
    delUsers (state, ids) {
      let commit = this.commit;
      ids.forEach(id => {
        commit('user/delUser', id);
      });
    },
    initUsers (state) {
      Vue.set(state, 'users', new Array(state.total));
    },
    resetUsers (state, users) {
      this.commit('user/clearUsers');
      this.commit('user/setUsers', users);
    },
    setTotal (state, total) {
      state.total = total;
    },
    setPageSize (state, pageSize) {
      state.pageSize = pageSize;
    },
    nextPage (state) {
      state.current++;
    },
    prevPage (state) {
      state.current--;
    },
    jumpPage (state, pageNumber) {
      state.current = pageNumber;
    },
    aaa () {
      // window.alert('aaa');
    }
  },
  // 活动，用于（异步）提交转变器以改变状态树的数据
  actions: {
    pageChange ({state, getters, commit, dispatch}, pageNumber) {
      commit('jumpPage', pageNumber);
      dispatch('getUsers');
    },
    pageSizeChange ({state, getters, commit, dispatch}, pageSize) {
      commit('setPageSize', pageSize);
      dispatch('getUsers');
    },
    del ({commit, state, dispatch}, ids) {
      return api.delUsers(ids)
         .then(data => {
           if(data.success) commit('delUsers', ids);
           dispatch('getUsers');
           return data.success;
         });
    },
    init ({commit, state, dispatch}) {
      return api.getUsersCount()
         .then(data => {
           commit('setTotal', data.count);
           commit('initUsers');
         })
    },
    upgrade ({state, getters, commit, dispatch}) {
      // 如果用户ID存在，则更新
      let user = getters.getUser;
      let promise;
      if(user.id){
        promise = api.updateUser(user.id, user);
      }else{
        promise = api.addUser(user);
      }
      promise.then(data => {
        console.log(data);
        commit('upgradeUser', data.user);
      });
    },
    // 异步活动可以调用ajax
    getUsers ({state, getters, commit, dispatch}) {
      // 分页参数
      let params = {
        limit: state.pageSize,
        offset: (state.current - 1) * state.pageSize,
      };
      if(!getters.hasUsers || getters.hasRemovedUsers){
        api.getUsers(params)
           .then(data => {
             commit('setUsers', data.users);
           });
      }
    },
    getUser ({state, getters, commit, dispatch}, id) {
      if(!state.user.id || id !== state.user.id){
        api.getUser(id)
           .then(data => {
             commit('setUser', data.user)
           });
      }
    }
  }
};

export default store;
