process.env.NODE_ENV = 'testing';

const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')


const webpackConfig = merge(baseWebpackConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  entry: ['babel-polyfill'],
  module: {
    // preLoaders: [{
    //   test: /\.js$/,
    //   exclude: [/node_modules/, /\.Spec.js$/],
    //   loader: 'isparta-instrumenter'
    // }],
    loaders: [{
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'ng-annotate!babel'
      },
      {
        test: /\.html/,
        loader: 'raw'
      },
      {
        test: /\.styl$/,
        loader: 'style!css!stylus'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ],
    rules: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      // 'scss-loader': 'sass-loader'
    }
  },
  // webpackServer: {
  //   noInfo: true // prevent console spamming when running in Karma!
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/test.env')
    }),
    
  ]
})

// no need for app entry during tests
// delete webpackConfig.entry
delete webpackConfig.entry;

module.exports = webpackConfig