const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const env =
  process.env.NODE_ENV === 'testing' ?
  require('../config/test.env') :
  require('../config/prod.env');
env.baseUrl = process.env.NODE_ENV === 'testing' ? JSON.stringify(config.dev.assetsPublicPath) : JSON.stringify(config.build.assetsPublicPath);

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    //调用utils.styleLoaders的方法
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap, //开启调试的模式。默认为true
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  // entry: {
  //   mock: '@/mock-loader'
  // },
  output: {
    path: config.build.assetsRoot, //path.resolve(__dirname, '../dist'),
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // 清除dist文件下所有文件，重新打包编译
    new CleanWebpackPlugin(['dist/*'], {
      root: path.resolve(__dirname, '../')
    }),
    // 定义环境变量插件
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 高压缩插件
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          //警告：true保留警告，false不保留
          warnings: false,
          //打印语句：true去掉，false保留
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true,
      exclude: [/\.min\.js$/gi]
    }),
    // 提取样式插件，比如打包之后的index页面有style插入，就是这个插件抽取出来的，减少请求
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      allChunks: true
    }),
    // 压缩样式插件
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap ?
        {
          safe: true,
          map: {
            inline: false
          }
        } :
        {
          safe: true
        }
    }),
    // 生成静态文件插件
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
      template: './src/template/index.pro.ejs',
      inject: true,
      hash: true,
      minify: {
        // 删除注释
        removeComments: true,
        // 删除空格
        collapseWhitespace: true,
        // 删除属性的引号 
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // 模块排序，按照我们需要的顺序排序
      chunksSortMode: 'dependency'
    }),
    new webpack.HashedModuleIdsPlugin(),
    // 启用范围提升
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 提取公共文件到自己的文件块中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // @TODO 原来这里时vendor，需要调查这个是什么意思？
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        );
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'app',
    //   async: 'vendor-async',
    //   children: true,
    //   minChunks: 3
    // }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }]),
    // @TODO 这个插件要学习一下再配置
    // new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    // 
  ]
});
// 如果开启了生产环境的Gzip压缩
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0
    })
  );
}
// 如果启用了打包可视化
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
  const HOST = process.env.HOST;
  const PORT = process.env.PORT && Number(process.env.PORT);
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerHost: HOST || config.dev.host,
    analyzerPort: (PORT || config.dev.port) + 1,
    openAnalyzer: config.dev.autoOpenBrowser,
  }));
}
// 打包发布时，以下文件以cdn的方式发布
// @TODO 考虑配合DLL打包，避免cdn挂掉
const externals = {};
if (process.env.NODE_ENV === 'production') {
  externals['vue'] = 'Vue';
  externals['iview'] = 'iview';
  externals['vuex'] = 'Vuex';
  externals['axios'] = 'axios';
  webpackConfig.externals = externals;
  webpackConfig.plugins.push(new HtmlWebpackIncludeAssetsPlugin({
    assets: [
      {path: 'http://unpkg.com/iview/dist/styles/iview.css', type: 'css'},
      {path: 'https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.auto.min.js', type: 'js'},
      {path: 'https://cdn.bootcss.com/vue/2.5.16/vue.min.js', type: 'js'},
      {path: 'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js', type: 'js'},
      {path: 'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js', type: 'js'},
      {path: 'https://cdn.bootcss.com/axios/0.18.0/axios.min.js', type: 'js'},
    ],
    append: false,
    publicPath: ''
  }));
}

module.exports = webpackConfig;