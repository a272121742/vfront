'use strict'
const os = require('os');
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');

// 加载webpack插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|jsx|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  exclude: /node_modules/,
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

console.log('当前运行环境：', process.env.NODE_ENV);
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    main: '@/main',
    vendors: '@/vendors'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  resolve: {
    // 自动的扩展后缀，比如一个js文件，则引用时书写可不要写.js
    extensions: ['.js', '.vue', '.json', '.md'],
    // 创建路径的别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    // 配置搜索模块，以减少搜索范围
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.join(__dirname, '../src')
    ]
  },
  module: {
    rules: [
      // 是否启用eslint代码检查
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: vueLoaderConfig
        }, {
          loader: 'iview-loader',
          options: {
            prefix: true
          }
        }]
      },
      {
        test: /iview\/.*?js$/,
        loader: 'happypack/loader?id=happybabel',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happybabel',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
        exclude: /node_modules/
      },
      {
        test: /\.js[x]?$/,
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
        exclude: /node_modules/,
        loader: 'happypack/loader?id=happybabel'
      },
      {
        // 图片处理，小于1kb会编译成Base64
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        // 字体处理，小于1kb会编译成Base64
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        // 字体处理，小于10kb会编译成Base64
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  // 性能提示，参考 http://www.css88.com/doc/webpack2/configuration/performance/
  performance: {
    // 入口起点的最大资源体积
    maxEntrypointSize: 204800,
    // 最大生成资源体积
    maxAssetSize: 204800,
    hints: isProd ? 'warning' : false
  },
  plugins: [
    // 合并公共css
    // new ExtractTextPlugin({
    //   filename: 'common.[chunkhash].css'
    // }),
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
      verbose: true
    })
  ],
  //以下选项是Node.js全局变量或模块，这里主要是防止webpack注入一些Node.js的东西到vue中 
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
