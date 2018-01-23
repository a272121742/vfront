"use strict"
import axios from 'axios';
// import 'axios-response-logger';

/**
 * Spin 全局加载动画
 * Message 全局消息
 * Notice 全局通知
 * LoadingBar 全局加载进度条
 * 
 */
import { Spin, Message, Notice, LoadingBar} from 'iview';


const req = require.context('./mock', true, /\.js$/);

const reqAll = (requireContext) => requireContext.keys().map(requireContext);

reqAll(req);

/**
 * 拦截request请求
 * 发起请求时，判断是否已经登陆，或者是否有权限
 */
axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

/**
 * 拦截response响应
 * 根据响应体，判断接受到数据之后的处理逻辑
 * 1. 如果是组件交互行为，则进行消息提醒
 * 2. 如果是视图交互行为，则进行进度条加载
 */ 
axios.interceptors.response.use(response => {
  // 如果不是get请求，则属于交互行为，成功后弹出消息
  // @TODO 可增加配置
  // @TODO 可增加取消cancelToken
  if(response.config.method !== 'get'){
    Message.info({content: '操作成功'});
  }
  // 如果返回的错误不是200，都视为错误
  if(response.status !== 200){
    return Promise.reject(response);
  }
  return response;
}, error => {
  return Promise.reject(error);
});