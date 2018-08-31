/**
 * WebPack开发环境配置
 */
// 加载webpack
const webpack = require('webpack');
// 加载环境配置
const config = require('../config');
// 加载构建工具
const utils = require('./utils');
// 加载webpack插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 美化webpack的错误信息和日志的插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// 打包可视化分析视图
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 自动DLL打包插件
const AutoDllPlugin = require('autodll-webpack-plugin');
// 通过webpack-merge实现webpack.dev.conf.js对wepack.base.config.js的继承
const merge = require('webpack-merge');
// 加载webpack基础配置
const webpackBaseConfig = require('./webpack.base.conf');
// 加载nodejs模块
const fs = require('fs');
const path = require('path');
// 查看空闲端口位置，默认情况下搜索8000这个端口 https://github.com/indexzero/node-portfinder
const portfinder = require('portfinder');
// 加载项目包文件
const package = require('../package.json');

// 缓存系统环境变量
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
// ------- 注入系统环境 begin --------////////////////////////////////////////////////////////////////////////
const env = require('../config/dev.env');
// 如果是开发联调模式
if(process.env.npm_config_test){
  env.testing = JSON.stringify(true);
  const proxyTable = config.dev.proxyTable;
  const keys = Object.keys(proxyTable);
  env.proxyServerPix = JSON.stringify(keys[0]);
}else {
  env.testing = JSON.stringify(false);
}
env.baseUrl = JSON.stringify(config.dev.assetsPublicPath);
// ------- 注入系统环境 end -----------////////////////////////////////////////////////////////////////////////

const devWebpackConfig = merge(webpackBaseConfig, {
  module: {
    //规则是工具utils中处理出来的styleLoaders，生成了css，less,postcss等规则
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  devtool: config.dev.devtool,
  entry: {
    mock: '@/mock-loader'
  },
  output: {
    publicPath: config.dev.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    // 抽离CSS样式的插件
    new ExtractTextPlugin({
      filename: 'common.[chunkhash].css',
      allChunks: true
    }),
    // 公共块整合
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js'
    }),
    // 生成HTML模版
    new HtmlWebpackPlugin({
      title: 'vfront' + package.version,
      template: './index.html',
      // true或者body表示生成代码注入到body中，head表示注入到head中，false表示不注入
      inject: true,
      chunksSortMode: function(chunk1, chunk2) {
        var order = ['mock', 'main'];
        var order1 = order.indexOf(chunk1.names[0]);
        var order2 = order.indexOf(chunk2.names[0]);
        return order1 - order2; 
      }
    }),
    // 配置全局常量
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 热更新模块
    new webpack.HotModuleReplacementPlugin(),
    /**
     * 这个模块可以将依赖模块的正整数 ID 替换为相对路径（如：将 4 替换为 ./node_modules/es6-promise/dist/es6-promise.js）。
     *  - 开发模式，它可以让 webpack-dev-server 和 HMR 进行热更新时在控制台输出模块名字而不是纯数字；
     *  - 生产构建环境，它可以避免因修改内容导致的 ID 变化，从而实现持久化缓存。
     */
    new webpack.NamedModulesPlugin(),
    // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
    new webpack.NoEmitOnErrorsPlugin(),
    // 复制插件
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*']
    }]),
    // 自动DLL策略
    new AutoDllPlugin({
      inject: true,
      context: resolve('src'),
      filename: '[name].dll.js',
      entry: {
        vendor: ['vue', 'vue-router', 'vuex', 'iview', 'echarts', 'axios']
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          mangle: true,
          exclude: /\.min\.js$/,
          compress: false,
          sourceMap: false,
          parallel: true,
        })
      ]
    }),
  ],
  /**
   * 服务器配置
   * webpack-dev-server的相关啊配置
   */
  devServer: {
    // 日志级别，控制台显示的选项有none, error, warning 或者 info
    clientLogLevel: 'warning',
    //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: true,
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
    //   ],
    // },
    // 是否热加载
    hot: true,
    // 
    contentBase: './', // since we use CopyWebpackPlugin.
    // 是否启用`gzip`压缩
    compress: true,
    // 服务器地址
    host: HOST || config.dev.host,
    // 端口
    port: PORT || config.dev.port,
    // 默认是否打开浏览器
    open: config.dev.autoOpenBrowser,
    // 在编译出错的时候，在浏览器页面上是否显示错误
    overlay: config.dev.errorOverlay ?
      {
        warnings: false,
        errors: true
      } :
      false,
    // 项目目录
    publicPath: config.dev.assetsPublicPath,
    // 网络代理
    proxy: config.dev.proxyTable,
    // 当它被设置为true的时候，控制台只输出第一次编译的信息。此配置需要FriendlyErrorsPlugin插件
    quiet: true,
    watchOptions: {
      // 文件系统检测改动
      poll: config.dev.poll,
    }
  },
});


module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  // 查找端口号
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // 端口被占用时就重新设置evn和devServer的端口
      process.env.PORT = port
      devWebpackConfig.devServer.port = port

      // 友好地输出信息
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ?
          utils.createNotifierCallback() :
          undefined
      }))

      resolve(devWebpackConfig)
    }
  })
});
