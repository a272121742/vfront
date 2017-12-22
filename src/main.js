'use strict'
/**
  main.js 是整个项目脚本执行的入口
*/
// 导入包
import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './lib/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import store from './store';
import './lib/mock';
import Cookie from 'js-cookie';

// 注册插件
Vue.use(VueRouter);
Vue.use(iView);

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title);
  next();
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

// 构建应用
const app = new Vue({
  el: '#app',
  router: router,
  store: store,
  render: init => init(App),
  created () {
    this.checkLogin();
  },
  methods: {
    checkLogin () {
      if(!Cookie.get('session')){
        console.log('没有登陆的用户');
        this.$router.push('/login');
      }else{
        console.log('存在登陆用');
      }
    }
  },
  watch: {
    '$route': 'checkLogin'
  }
});
