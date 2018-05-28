import Mock from "@/lib/mock";

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
