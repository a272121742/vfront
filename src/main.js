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
import Vuex from 'vuex';
import store from './store';


// 注册插件
Vue.use(VueRouter);
Vue.use(Vuex);
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
  render: init => init(App)
});

