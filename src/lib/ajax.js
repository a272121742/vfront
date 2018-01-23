'use strict'
// 相关参考 https://www.kancloud.cn/yunye/axios/234845
import Axios from 'axios';
// 代理
const axiosProxy = Axios.create({
  baseURL: process.env.proxyServerPix
});
// 原始
const axios = Axios.create({});
// 是否为开发模式（开发模式会连接测试服务器）
const isDevelopment = process.env.NODE_ENV && !!process.env.proxyServerPix;

// 构建基础组件
const ajax = isDevelopment ? axiosProxy : axios;
const resolve = res => Promise.resolve(res.data);
const reject = err => Promise.reject(err);

export default {
  'request': (config) => {
    const $reject = isDevelopment ? err => axios.request(config).then(resolve).catch(reject) : reject;
    return ajax.request(config).then(resolve).catch($reject);
  },
  'get': (url, config) => {
    const $reject = isDevelopment ? err => axios.get(url, config).then(resolve).catch(reject) : reject;
    return ajax.get(url, config).then(resolve).catch($reject);
  },
  'delete': (url, config) => {
    const $reject = isDevelopment ? err => axios.delete(url, config).then(resolve).catch(reject) : reject;
    return ajax.delete(url, config).then(resolve).catch($reject);
  },
  'head': (url, config) => {
    const $reject = isDevelopment ? err => axios.head(url, config).then(resolve).catch(reject) : reject;
    return ajax.head(url, config).then(resolve).catch($reject);
  },
  'post': (url, data, config) => {
    const $reject = isDevelopment ? err => axios.post(url, data, config).then(resolve).catch(reject) : reject;
    return ajax.post(url, data, config).then(resolve).catch($reject);
  },
  'put': (url, data, config) => {
    const $reject = isDevelopment ? err => axios.put(url, data, config).then(resolve).catch(reject) : reject;
    return ajax.put(url, data, config).then(resolve).catch($reject);
  },
  'patch': (url, data, config) => {
    const $reject = isDevelopment ? err => axios.patch(url, data, config).then(resolve).catch(reject) : reject;
    return ajax.patch(url, data, config).then(resolve).catch($reject);
  },
};







