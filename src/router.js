import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function routerExport () {
  // 匹配模块下的`./module-name/router/router-name.js`文件
  const req = require.context('@/modules', true, /^\.\/[a-z-]+\/router\/\w+\.js$/);
  // 导出所有路由的default部分
  const routerExports = {
    // 根路由
    rootRouter: [],
    // 一级路由
    level1Router: []
  };
  req.keys().forEach((mod) => {
    const moduleExport = req(mod);
    const moduleRouters = moduleExport.default || [];
    moduleRouters.forEach(rout => {
      if(!rout.component) {
        rout.component = () => import('@/modules/layout/view/abstract.vue')
      }
    });
    if (moduleExport.routerLevel === 0) {
      routerExports.rootRouter.splice(0, 0, ...moduleRouters);
    } else if (moduleExport.routerLevel === 1) {
      routerExports.level1Router.splice(0, 0, ...moduleRouters);
    }
  });
  return routerExports;
}

/**
 * 获取所有的路由表，路由表分为两种：
 * 1. rootRouter，根路由
 * 2. level1Router，一级路由
 */
const allRouters = routerExport();

// 判断是否存在登录模块，如果有登录模块，则一级路由通过动态注入的方式加载，反之直接加载
const hasLoginModule = !!~allRouters.rootRouter.findIndex(route => route.path === '/login');

const basePath = [
  {
    path: '/',
    meta: {
      title: '主页',
      requireAuth: true
    },
    name: 'home',
    component: () => import('./modules/layout/view/default.vue'),
    children: allRouters.level1Router
  }
];

const routerInstance = new VueRouter({
  // base: '/webppt/vfront/',
  mode: 'history',
  routes: hasLoginModule
    ? allRouters.rootRouter
    : allRouters.rootRouter.concat(basePath)
});

export const fullPath = basePath;
export const router = routerInstance;
