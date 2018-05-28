// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack
const webpackConfig = require('../../build/webpack.test.conf');

module.exports = function karmaConfig(config) {
  config.set({
    // 测试浏览器
    browsers: [
      'PhantomJS',
      'Chrome'
    ],
    // 测试使用的框架
    frameworks: [
      // 断言库 should.js-http://shouldjs.github.io/
      // 断言库 expect.js-https://github.com/Automattic/expect.js
      // https://segmentfault.com/a/1190000011362879
      'mocha', 
      // 断言库 chai-https://www.jianshu.com/p/f200a75a15d2
      /// sinon http://www.jkeabc.com/368609.html
      // sinon-chai https://github.com/domenic/sinon-chai
      'sinon-chai', 
      'phantomjs-shim'
    ],
    // 结果导出到哪里
    reporters: [
      // 'spec', 
      // 'progress',
      // 'mocha', 
      'coverage'
    ],
    // 测试入口
    files: ['../../node_modules/babel-polyfill/dist/polyfill.js', './index.js'],
    // 对指定文件进行预处理
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
    },
    // webpack打包规则
    webpack: webpackConfig,
    // webpack中间件
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
    },
    // 代码覆盖率配置，配置测试覆盖率的输出目录及格式
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
      ],
      instrumenterOptions: {
        // 禁用压缩
        istanbul: { noCompact: true }
      }
    },
    // 这里配置代理
    proxies: {

    },
    colors: true,
    autoWatch: true,
    // true-单次执行 false-持续执行
    singleRun: true,
    concurrency:Infinity
  });
};
