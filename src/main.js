/**
  main.js 是整个项目脚本执行的入口
*/
// 导入包
import 'iview/dist/styles/iview.css';
import Snapshot from '@/plugin/snapshot';
import Vue from 'vue';
import iView from 'iview';
import Util from './lib/util';
import store from './store';
import { router } from './router';

// Vue.component('component', () => {
//   return null;
// })

///// 测试 begin
// import Axios from 'axios';
// const netList = ['/proxy'];

// function createRequest(method) {

//   return function request() {
//     let flag = parseInt(arguments[arguments.length - 1]) >= -1 ? arguments[arguments.length - 1] : void(0);
//     // 初始化递归函数
//     if (flag === void(0)) {
//       return request.call(undefined, ...arguments, -1);
//     }
//     const url = arguments[0];
//     let data, config;
//     const args = [];
//     // 判断提交类型
//     if (~['get', 'delete', 'head', 'options'].indexOf(method)) {
//       if (arguments.length === 2) {npm
//         config = {};
//       } else {
//         config = arguments[1];
//       }
//       args.push(config);
//     } else {
//       if (arguments.length === 2) {
//         config = {};
//         data = {};
//       } else if (arguments.length === 3) {
//         data = arguments[1];
//         config = {};
//       } else {
//         data = arguments[1];
//         config = arguments[2];
//       }
//       args.push(data);
//       args.push(config);
//     }
//     if (flag >= -1) {
//       if (++flag === netList.length) {
//         return Promise.reject(flag + '次重连都无法获取信息，请检查各路服务器是否能启用！');
//       }
//       const proxyURL = netList[flag];
//       const baseURL = proxyURL === '/' ? '' : proxyURL;
//       if (method == 'get') {
//         console.log(baseURL + url, ...args, flag);
//       }
//       return Axios[method].apply(undefined, [baseURL + url, ...args]).then(res => {
//         return Promise.resolve(res.data);
//       }).catch(err => {
//         return request.apply(undefined, [url, ...args, flag]);
//       })
//     }
//   }
// }

// var get = createRequest('get');
// window.get = get;
// get('/api/users').then(data => {
//   console.log('获得了', data);
// }).catch(err => {
//   console.log('失败了', err);
// });
///// 测试 end


// 注册插件
Vue.use(iView);
Vue.use(Snapshot);

// const debug = true;

function loadData () {
  if (!loadData.isLoading) {
    store
      .dispatch('login/toLoginByToken', store.state.login.token)
      .then((userInfo) => {
        store.commit('saveUserInfo', userInfo);
        const allowedRouter = store.getters.allowedRouter;
        store.commit('setMenuData', allowedRouter);
        store.commit('extendRoutes', allowedRouter);
        const resourcePermission = store.getters.resourcePermission;
        store.commit('setInterceptor', resourcePermission);
      });
    loadData.isLoading = true;
  }
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title);

  const toLogin = to.matched.some(r => r.path === '/login');
  const isLogin = store.state.login.isLogin;
  // 如果已经登陆，则获取token信息，重新发起请求获取用户信息
  if (isLogin) {
    loadData();
  }
  // 如果进入的是登陆界面，且已经登陆过
  if (toLogin && isLogin) {
    next({
      path: from.fullPath
    });
  }
  // 如果进入的不是登陆界面，且未登陆过
  if (!toLogin && !isLogin) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    });
  }
  next();
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

// 构建应用
/* eslint no-unused-vars: 0 */
new Vue({
  el: '#app',
  router,
  store,
  template: `
    <div id="app">
      <transition >
        <router-view></router-view>
      </transition>
    </div>
  `
});
/* eslint no-console:0 */
console.log('process.env', process.env);
