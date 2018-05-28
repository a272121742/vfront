// 相关参考 https://www.kancloud.cn/yunye/axios/234845
// 引入的Axios为整个程序主要的ajax实例，开发环境下拦截这个实例
import Axios from 'axios';

if(process.env.NODE_ENV !== 'production'){
  import('axios-response-logger');
} else {
  // @TODO 这里预留，在生产模式中，增加httpRetry(Axios)的功能和配置
}
// 是否为开发代理测试模式（开发模式会连接测试服务器）
const isDevProxyTesting = process.env.testing;
// 基础路径，如果时走代理，要加上代理的前缀路径
const baseURL = (isDevProxyTesting ? process.env.proxyServerPix : '/') || '/';
// 构建一个代理专用Axios实例，该实例不会被mock模块拦截
const proxyAxios = Axios.create({baseURL});
// 构建基础组件
const resolve = res => res.data.data;
const reject = err => Promise.reject(err);

console.info('当前模式', isDevProxyTesting ? '本地联调模式：' + process.env.proxyServerPix : '本地开发模式：/');
export default {
  get: (url, config = {}) => {
    if(isDevProxyTesting) {
      return proxyAxios.get(url, config).then(resolve).catch(reject);
    }else {
      return Axios.get(url, config).then(resolve).catch(reject);
    }
  },
  delete: (url, config = {}) => {
    if(isDevProxyTesting) {
      return proxyAxios.delete(url, config).then(resolve).catch(reject);
    }else {
      return Axios.delete(url, config).then(resolve).catch(reject);
    }
  },
  head: (url, config = {}) => {
    if(isDevProxyTesting) {
      return proxyAxios.head(url, config).then(resolve).catch(reject);
    }else {
      return Axios.head(url, config).then(resolve).catch(reject);
    }
  },
  post: (url, data, config) => {
    if(isDevProxyTesting) {
      return proxyAxios.post(url, data, config).then(resolve).catch(reject);
    }else {
      return Axios.post(url, data, config).then(resolve).catch(reject);
    }
  },
  put: (url, data, config) => {
    if(isDevProxyTesting) {
      return proxyAxios.put(url, data, config).then(resolve).catch(reject);
    }else {
      return Axios.put(url, data, config).then(resolve).catch(reject);
    }
  },
  patch: (url, data, config) => {
    if(isDevProxyTesting) {
      return proxyAxios.patch(url, data, config).then(resolve).catch(reject);
    }else {
      return Axios.patch(url, data, config).then(resolve).catch(reject);
    }
  },
};

function httpRetry (axios) {
  // 设置备用地址（若加上此备用地址列表，最坏情况下，会连接三次：默认连接、备用1、备用2）
  // 以下备用地址从配置文件中获取
  const netlist = ['https://easy-mock.com/mock/5b03c10305e00e7fd3cb3d68/example', 'http://rap2api.taobao.org/app/mock/116'];
  // 设置重连次数
  axios.defaults.retry = netlist.length;
  // 设置重连间隔事件
  axios.defaults.retryDelay = 400;
  // 注入重连钩子
  axios.interceptors.response.use(undefined, function axiosRetryInterceptor (err) {
    // 获取连接配置
    var config = err.config;
    // 如果不存在重连，reject
    if (!config || !config.retry) {
      return Promise.reject(err)
    }
    // 设置重连次数，初始化为0
    config.__retryCount = config.__retryCount || 0;
    // 若没有填写baseURL，则备份api路径
    if (!config.baseURL) {
      config.__url = config.url;
    }
    // 如果超过重复次数，reject
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err);
    }
    // 计数器
    config.__retryCount += 1;
    config.baseURL = netlist[config.__retryCount - 1];
    config.url = config.__url;
    // 创造新的Promise来重连
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 1);
    });
    // 返回重连信息
    return backoff.then(function () {
      return axios(config);
    });
  });
}
export const instance = Axios;
