// 以下为standard的配置
module.exports = {
  // 设置当前文件夹为根目录，无法向上进行检查
  root: true,
  // 指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  parser: 'vue-eslint-parser',
  // 解析器参数
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    ecmaFeatures: {
      // 全局严格模式
      impliedStrict: true,
      // 启用jsx
      jsx: true,
      // 试验性的，拓展运算符
      experimentalObjectRestSpread: true
    },
    sourceType: 'module'
  },
  // 此项是用来配置标准的js风格
  extends: [
    // http://www.css88.com/archives/8345
    'standard',
    'airbnb-base/legacy', 
    'eslint:recommended', 
    'plugin:vue/recommended',
  ],
  // 此项是用来提供插件的，插件名称省略了eslint-plugin-
  plugins: [
    'standard',
    'babel',
    'vue', 
    'promise',
    'import',
  ],
  // 其他规则
  rules: {
    // 关闭语句必须使用分号结尾
    // semi: 0,
    // 开启语法严格模式
    strict: 2,
    // 单引号
    "quotes": ["error", "single"],
    // 函数定义后必须空格
    "space-before-function-paren": ["error", "always"],
    // 打印语句和调试语句在生产环境报错，其他环境关闭检查
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 0,
    // vue文件的template约束
    "vue/html-indent": ["error", 2],
    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
  },
  // 此项指定环境的全局变量
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    mocha: true
  },
  globals: {
    // 指定全局变量将无法被重写
    window: false,
    Vue: false,
    iview: false,
    Vuex: false,
    Axios: false,
    // 指定全局变量可以被重写
    expect: true,
    sinon: true
  },
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  }
};
