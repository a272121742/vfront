// https://github.com/ctimmerm/axios-mock-adapter
import pathTo from 'path-to-regexp';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';
import {instance} from '@/lib/ajax';
import url from 'url';
import qs from 'qs';

const AdapterMock = new MockAdapter(instance);
const mock = {};
const httpMethods = ['get', 'post', 'patch', 'put', 'delete', 'head', 'options'];
const mockMethods = httpMethods.map(method => {
  return 'on' + method.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
});
httpMethods.forEach((type) => {
  const mockMethod = 'on' + type.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  mock[type] = function (urlReqExpString, callback, {code = 200, timeout = 0} = {}) {
    // 将url匹配表达式进行转换， 例如： /path/:id
    const rurl = pathTo(urlReqExpString, [], {
      // 不忽略大小写
      sensitive: true,
      strict: true
    });
    // 对get请求进行甄别，因为get请求有`?`参数
    if (type === 'get') {
      // 将url正则两边的`/`去掉，并追加`?`参数的正则校验
      const urlString = rurl
        .toString()
        .slice(1, -1)
        .replace('$', '\\/{0,1}(\\?{0}|\\?{1}((\\S+\\={1})(\\S+)\\&{0,1})*)$');
      // 重新编译正则规则
      rurl.compile(urlString);
    }
    AdapterMock[mockMethod](rurl).reply(config => {
      const urlSchema = url.parse(config.url);
      // 拦截的占位符参数，去除`?`校验所带的四组括号，以及第一项url
      const argsArr = rurl.exec(urlSchema.pathname);
      const args = argsArr.slice(1, type === 'get' ? argsArr.length - 4 : argsArr.length);
      // get 提交参数
      const params = config.params || qs.parse(urlSchema.query);
      // post 提交参数
      let datas;
      try {
        // 对报文进行JSON转换，如果转换失败，说明不是JSON格式，直接返回
        datas = JSON.parse(config.data);
      } catch (e) {
        datas = config.data;
      }
      args.push(type === 'get' ? params : datas);
      const result = Mock.mock(callback.call(config, ...args));
      // return result === undefined ? {} : result;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([code, result]);
        }, timeout);
      });
    });
  };
});
mock.mock = template => Mock.mock(template);
export default mock;
