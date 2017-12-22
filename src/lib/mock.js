import pathTo from 'path-to-regexp';
import Mock from 'mockjs';
import url from 'url';
import qs from 'qs';

let mock = {};
const methods = ['get', 'post', 'patch', 'put', 'delete'];
methods.forEach(type => {
  mock[type] = (urlReqExpString, callback) => {
    // 将url匹配表达式进行转换， 例如： /path/:id
    let rurl = pathTo(urlReqExpString, [], {
      // 不忽略大小写
      sensitive: true
    });
    // 对get请求进行甄别，因为get请求有`?`参数
    if (type === 'get') {
      // 将url正则两边的`/`去掉，并追加`?`参数的正则校验
      let urlString = rurl.toString().slice(1, -1).replace('$', '(\\?{0,1}((\\S+\\={1})(\\S+)\\&{0,1})*)$');
      // 重新编译正则规则
      rurl.compile(urlString);
    }

    Mock.mock(rurl, type, (options) => {
      // 获取Url模型
      const urlSchema = url.parse(options.url);
      // 拦截的占位符参数，去除`?`校验所带的四组括号，以及第一项url
      let args = rurl.exec(urlSchema.pathname).slice(1, -4);
      // get 提交参数
      let params = qs.parse(urlSchema.query);
      // post 提交参数
      let datas;
      try {
        // 对报文进行JSON转换，如果转换失败，说明不是JSON格式，直接返回
        datas = JSON.parse(options.body);
      } catch (e) {
        datas = options.body
      }
      args.push(type === 'get' ? params : datas);
      const result = Mock.mock(callback.call(options, ...args));
      return result === undefined ? {} : result;
    });
  };
});
mock.setup = Mock.setup;
mock.mock = Mock.mock;

export default mock;
