/**
 *  模拟数据
 *  相关参考： http://mockjs.com/
 *  可视化工具： RAP
 *  接口文档生成器： swagger
 */

import Mock from 'mockjs';
import url from 'url';
import qs from 'qs';

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';
const PATCH = 'patch';
const parse = JSON.parse;

// 设置延迟时间，用于模拟服务器延迟
// Mock.setup({
//   timeout: '500-1000'
// });



// 创建本地化数据, 可用于CRUD
let users = Mock.mock({
  "users|93": [{
    "id": '@guid',
    "name": 'name@increment',
    // "passwd": '123456',
    "age|18-65": 100,
    "email": '@email'
  }]
}).users;

// 查询单个数据
Mock.mock(/\/api\/user\/[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}/, GET, options => {
  let id = options.url.split('/')[3];
  return {
    user: users.find(user => user.id === id)
  };
});

// 查询分页数据
// get请求的数据都在url中
Mock.mock(/\/api\/user+(\?{0,1}(([A-Za-z0-9-~]+\={0,1})([A-Za-z0-9-~]*)\&{0,1})*)$/, GET, options => {
  let urlQuery = url.parse(options.url).query;
  let params = qs.parse(urlQuery);
  let beginIndex = params.offset;
  let endIndex = params.offset + params.limit;
  return {
    users: users.filter((item, index) => {
      return index >= beginIndex && index < endIndex;
    })
  };
});

// 新建数据
Mock.mock('/api/user', POST, options => {
  let user = parse(options.body).data;
  user.id = Mock.mock('@guid');
  users.unshift(user);
  return {user: user};
});

// 删除数据
Mock.mock(/api\/user\/[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}/, DELETE, options => {
  let id = options.url.split('/')[3];
  let index = users.findIndex(user => user.id === id);
  users.splice(index, 1);
  return {success: true};
});

// 更新数据（部分更新）
Mock.mock(/api\/user\/[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}/, PATCH, options => {
  let id = options.url.split('/')[3];
  let newUser = parse(options.body).data;
  let index = users.findIndex(user => user.id === id);
  users.map((user, index) => {
    if(user.id === id){
      for(let i in newUser){
        user[i] = newUser[i];
      }
    }
  });
  return {user: users[index]}
});

// 查询数据总量
Mock.mock('/api/user/count', GET, {
  "count": users.length
});
// 批量业务
Mock.mock('/api/user/batch-delete', POST, options => {
  let data = parse(options.body);
  let ids = data.data;
  ids.forEach(id => {
    let index = users.findIndex(user => user.id === id);
    users.splice(index, 1);
  });
  return {success: true};
});
Mock.mock('/api/test', POST, {
  success: true,
  data: {},
  status: 200,
  msg:''
});
