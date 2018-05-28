import Mock from '@/lib/mock';

const userMap = {
  admin: {
    name: '管理端',
    token: 'admin',
    resources: [
      {
        id: '2c9180895e172348015e1740805d000d',
        name: '账号-获取',
        summary: null,
        url: '/accounts',
        method: 'GET'
      },
      {
        id: '2c9180895e172348015e1740c30f000e',
        name: '账号-删除',
        summary: null,
        url: '/account/**',
        method: 'DELETE'
      },
      {
        id: '2c9180895e172348015e1741148a000f',
        name: '账号-修改',
        summary: null,
        url: '/account/**',
        method: 'PUT'
      },
      {
        id: '2c9180895e172348015e1840b98f0013',
        name: '账号-分配角色',
        summary: null,
        url: '/account/*/roles',
        method: 'POST'
      },
      {
        id: '2c9180895e172348015e173cd55f0009',
        name: '角色-获取',
        summary: null,
        url: '/roles',
        method: 'GET'
      },
      {
        id: '2c9180895e172348015e173e83ac000a',
        name: '角色-删除',
        summary: null,
        url: '/role/**',
        method: 'DELETE'
      },
      {
        id: '2c9180895e172348015e173eb9a4000b',
        name: '角色-修改',
        summary: null,
        url: '/role/**',
        method: 'PUT'
      },
      {
        id: '2c9180895e172348015e173f2fcc000c',
        name: '角色-添加',
        summary: null,
        url: '/role',
        method: 'POST'
      },
      {
        id: '4028811a5e1820d9015e1824acf20000',
        name: '登录',
        summary: null,
        url: '/signin',
        method: 'GET'
      }
    ],
    id: '2c9180895e172348015e1740805d000d',
    menus: [
      {
        id: '1',
        title: '内容管理',
        name: 'nrgl',
        parent_id: null,
        order: 1
      },
      {
        id: '2',
        title: '文章管理',
        name: 'wzgl',
        parent_id: '1',
        order: 2
      },
      {
        id: '3',
        title: '评论管理',
        name: 'nrgl',
        parent_id: '1',
        order: 3
      },
      {
        id: '4',
        title: '举报管理',
        name: 'jbgl',
        parent_id: '1',
        order: 4
      },
      {
        id: '5',
        title: '用户管理',
        name: 'yhgl',
        parent_id: null,
        order: 5
      },
      {
        id: '6',
        title: '新增用户',
        name: 'xzyh',
        parent_id: '5',
        order: 6
      },
      {
        id: '7',
        title: '活跃用户',
        name: 'hyyh',
        parent_id: '5',
        order: 7
      },
      {
        id: '8',
        title: '黑名单',
        name: 'hmd',
        parent_id: '5',
        order: 8
      },
      {
        id: '9',
        title: '统计分析',
        name: 'tjfx',
        parent_id: null,
        order: 9
      },
      {
        id: '10',
        title: '新增和启用',
        name: 'xzhqy',
        parent_id: '9',
        order: 10
      },
      {
        id: '11',
        title: '活跃分析',
        name: 'hyfx',
        parent_id: '9',
        order: 11
      },
      {
        id: '12',
        title: '时段分析',
        name: 'sdfx',
        parent_id: '9',
        order: 12
      },
      {
        id: '13',
        title: '用户留存',
        name: 'yhlc',
        parent_id: '9',
        order: 13
      },
      {
        id: '14',
        title: '流失用户',
        name: 'lsyh',
        parent_id: '9',
        order: 14
      },
      {
        id: '15',
        title: '角色管理',
        name: 'roles',
        parent_id: null,
        order: 15
      },
      {
        id: '16',
        title: '权限管理1',
        name: 'qxgl1',
        parent_id: '15',
        order: 16
      },
      {
        id: '17',
        title: '权限管理2',
        name: 'qxgl2',
        parent_id: '15',
        order: 17
      },
      {
        id: '18',
        title: '测试管理',
        name: 'test',
        parent_id: null,
        order: 18
      },
      {
        id: '19',
        title: '请求接口',
        name: 'apis',
        parent_id: '18',
        order: 19
      },
      {
        id: '20',
        title: '模块示例',
        name: 'demo',
        parent_id: null,
        order: 20
      },
      {
        id: '21',
        title: '数据列表',
        name: 'datatable',
        parent_id: '20',
        order: 21
      },
      {
        id: '22',
        title: '拖拽门户',
        name: 'dragable',
        parent_id: '20',
        order: 22
      }
    ]
  },
  editor: {
    role: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    name: 'Normal Editor',
    uid: '002'
  },
  developer: {
    role: ['develop'],
    token: 'develop',
    introduction: '我是开发',
    name: '工程师小王',
    uid: '003'
  }
};

Mock.post('/api/login', data => {
  return {data: userMap[data.email.split('@')[0]]}
});
Mock.post('/api/loginbytoken', data => {
  return {data: userMap.admin}
});
