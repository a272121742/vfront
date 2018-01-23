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
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge');
// 加载webpack基础配置
const webpackBaseConfig = require('./webpack.base.config');
// 加载nodejs模块
const fs = require('fs');
const path = require('path');
const portfinder = require('portfinder');
// 加载项目包文件
const package = require('../package.json');

// 缓存系统环境变量
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);


const devWebpackConfig = merge(webpackBaseConfig, {
  /**
   * @TODO 这个地方有问题，待考察研究
   */
  // module: {
  //   rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  // },
  devtool: config.dev.devtool,
  entry: {
    mock: '@/mock'
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    // 抽离CSS样式的插件
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    // 公共块整合
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js'
    }),
    // 生成HTML模版
    new HtmlWebpackPlugin({
      title: 'iView admin v' + package.version,
      filename: '../index.html',
      inject: false
    }),
    // 配置全局常量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
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
    // 复制文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ],
  /**
   * 服务器配置
   * webpack-dev-server的相关啊配置
   */
  devServer: {
    // 日志级别
    clientLogLevel: 'warning',
    // 
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
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
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    // @TODO 这里有问题
    // publicPath: config.dev.assetsPublicPath,
    // publicPath: undefined,
    // 网络代理
    proxy: config.dev.proxyTable,
    // 当它被设置为true的时候，控制台只输出第一次编译的信息。此配置需要FriendlyErrorsPlugin插件
    quiet: true,
    watchOptions: {
      poll: config.dev.poll,
    }
  },
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
});