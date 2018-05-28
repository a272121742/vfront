import Vue from 'vue';
import Vuex from 'vuex';
import util from '@/lib/util.js';
import { fullPath, router } from '@/router';
import ajax from '@/lib/ajax';

Vue.use(Vuex)

function storeExport () {
  // 匹配模块下的`./module-name/router/router-name.js`文件
  const req = require.context('@/modules', true, /^\.\/[a-z-]+\/store\/index\.js$/)

  // 导出所有路由的default部分
  const storeModules = {}
  req.keys().forEach(mod => {
    const moduleNames = mod.split(/\//)[1]
    const moduleExport = req(mod).default || {}
    moduleExport.namespaced = true
    storeModules[moduleNames] = moduleExport
  })
  return storeModules
}

const modules = storeExport()
const storeConfig = {
  strict: process.env.NODE_ENV !== 'production',
  state: {
    userInfo: {}
  },
  getters: {
    resourcePermission (state) {
      const userInfo = state.userInfo
      const resourcePermission = {}
      // 如果用户信息的资源列表是一个存在的数组
      if (Array.isArray(userInfo.resources)) {
        userInfo.resources.forEach((r, i) => {
          const key = `${r.method.toLowerCase()},${r.url}`
          resourcePermission[key] = true
        })
      }
      return resourcePermission
    },
    allowedRouter (state) {
      const userInfo = state.userInfo
      // 如果没有获取到菜单，或者菜单为空，则发出警告
      // 后期加入其他的处理方式，例如页面跳转等
      if (!userInfo.menus) {
        throw new Error('缺少菜单信息');
      }
      let allowedRouter = []
      // 将菜单数据转成多维数组格式，list 转 tree
      const arrayMenus = util.buildMenu(userInfo.menus)
      // 将多维数组转成对象格式
      const hashMenus = {}
      const setMenu2Hash = function (array, base) {
        array.map(key => {
          if (key.name) {
            const hashKey = `${base || ''}/${key.name}`
            hashMenus[hashKey] = true
            if (Array.isArray(key.children)) {
              setMenu2Hash(key.children, hashKey)
            }
          }
        })
      };
      setMenu2Hash(arrayMenus)
      state.hashMenus = hashMenus
      // 全局挂载hashMenus，用于实现路由守卫
      // 筛选本地路由方法
      const findLocalRoute = function (array, base) {
        const replyResult = []
        array.forEach(route => {
          const pathKey = `${base || ''}/${route.path.replace(/^\//, '')}`
          if (hashMenus[pathKey]) {
            if (Array.isArray(route.children)) {
              route.children = findLocalRoute(route.children, pathKey)
            }
            replyResult.push(route)
          }
        })
        if (base) {
          return replyResult
        }
        allowedRouter = allowedRouter.concat(replyResult)
      };
      const originPath =
        util.deepcopy(fullPath.find(route => route.path === '/').children) ||
        []
      findLocalRoute(originPath)
      return allowedRouter
    }
  },
  mutations: {
    saveUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setMenuData (state, menuData) {
      state.menuData = menuData
    },
    extendRoutes (state, allowedRouter) {
      const actualRouter = util.deepcopy(allowedRouter)
      actualRouter.map(r => {
        // 复制子菜单信息到meta用于实现导航相关效果，非必需
        if (r.children) {
          if (!r.meta) r.meta = {}
          r.meta.children = r.children
        }
        // 为动态路由添加独享守卫
        return (r.beforeRouteEnter = function (to, from, next) {
          if (state.hashMenus[to.path]) {
            next()
          } else {
            next('/500')
          }
        })
      })
      const originPath = util.deepcopy(fullPath)
      originPath[0].children = actualRouter
      // 注入路由
      router.addRoutes(
        originPath.concat([
          {
            path: '*',
            redirect: '/404'
          }
        ])
      )
    },
    setInterceptor (state, resourcePermission) {
      // const vm = this;
      // ajax.instance.interceptors.request.use(config => {
      //   // 得到请求路径
      //   let perName = config.url
      //     .replace(config.baseURL, '')
      //     .replace('/GET', '')
      //     .replace('/POST', '')
      //     .split('?')[0]
      //   // 权限格式1 /path/${param}
      //   const reg1 = perName.match(/^(\/[^/]+\/)[^/]+$/)
      //   if (reg1) {
      //     perName = `${reg1[1]}**`
      //   }
      //   // 权限格式2 /path/${param}/path
      //   const reg2 = perName.match(/^\/[^/]+\/([^/]+)\/[^/]+$/)
      //   if (reg2) {
      //     perName = perName.replace(reg2[1], '*')
      //   }
      //   // 校验权限
      //   if (!resourcePermission[`${config.method},${perName}`]) {
      //     // 调试信息
      //     // vm.$Message.info('无访问权限，请联系企业管理员');
      //     // 拦截请求
      //     return new Promise((resolve, reject) => {
      //       resolve(new Error('no permission'))
      //     })
      //   }
      //   return config
      // })
    }
  },
  actions: {},
  modules
}

const store = new Vuex.Store(storeConfig)

export default store
