/* eslint no-unused-vars:0 */
import Mock from '@/lib/mock';
import cdb from '@/lib/cdb';
import { resolve } from 'path';

const data = Mock.mock({
  'users|10': [{
    name: 'localmock',
    'age|18-50': 0,
    email: '@email'
  }]
});

const user = cdb.link('user', data.users);

Mock.get('/api/users', () => {
  return {data: user.find({})};
}, {code: 200, timeout: 0});

Mock.get('/api/user/:id', (id) => {
  return {data: user.findById(id)};
});
Mock.post('/api/user', (data) => {
  return {data: user.insert(data)}; 
});
Mock.delete('/api/user/:id', (id) => {
  return {data: user.remove(id)};
});
Mock.patch('/api/user/:id', (id, data) => {
  return {data: user.update(id, data)};
});
Mock.put('/api/user/:id', (id, data) => {
  return {data: user.update(id, data)};
});

// console.log('插入测试:');
// const testData = user.insert({name: 'testing', age: 9});
// console.log(testData);
// console.log(user.insert());
// const testDatas = user.insert([{name: 'testing1', age: 0}, {name: 'testing2', age:1}]);
// console.log(testDatas);
// console.log('修改测试：');
// console.log(user.update(parseInt(testData.id), {name: 'zhangsan'}));
// console.log(user.findById(parseInt(testData.id)));
// console.log(user.find());
// console.log('删除测试');
// console.log(user.remove(testData.id));
// console.log(user.find());




// Mock.patch('/api/user/:id', (id, data) => {
//   user.update(id, data).then(data => {});
//   return id;
// });
// Mock.post('/api/user', (data) => {
//   user.insert(data).then(data => {});
//   return data;
// });
// Mock.get('/api/user/:id', (id) => {
//   user.findById(id).then(data => {});
//   return id;
// });
// Mock.delete('/api/user/:id', (id) => {
//   user.delete(id).then(data => {});
//   return id;
// });


/**
 * @example
   // 拦截get请求
   Mock.get('/api/url', () => {});
   // 拦截占位符get请求
   Mock.get('/api/url/:id', (id) => {});
   // 拦截带参get请求
   Mock.get('/api/url', (params) => {});
   // 拦截带参post请求
   Mock.post('/api/url', (data) => {});
   // 模拟数据
   Mock.mock({
     "datas|10": {
       "name": "@name",
       "email": "@email",
       "age|18-65": 0
     }
   });
   // 拦截请求并返回数据 Mock.mock参看 
   Mock.get('/api/url', (params) => {
     return Mock.mock({
       "datas|10": {
        "name": "@name",
        "email": "@email",
        "age|18-65": 0
      }
     }).datas;
   })
 */
