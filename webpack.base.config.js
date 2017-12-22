/**
 *  基本配置文件
 */
const path = require('path');
const resolve = path.resolve;
// extract-text-webpack-plugin插件，将组件中的CSS样式单独打包
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // 入口文件
  entry: {
    main: './src/main',
    vendors: './src/vendors'
  },
  output: {
    // 输出目录
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader',
        options: {
          loaders: {
            less: ExtractTextPlugin.extract({
              use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
              fallback: 'vue-style-loader'
            }),
            css: ExtractTextPlugin.extract({
              use: ['css-loader', 'autoprefixer-loader', 'less-loader', 'postcss-loader'],
              fallback: 'vue-style-loader!postcss-loader'
            })
          }
        }
      },
      {
        loader: 'iview-loader',
        options: {
          prefix: false
        }
      }]
    },
    {
      test: /iview\/.*?js$/,
      loader: 'babel-loader'
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader?minimize', 'autoprefixer-loader', 'postcss-loader'],
        fallback: 'style-loader!css-loader!postcss-loader'
      })
    },
    {
      test: /\.less/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
        fallback: 'style-loader'
      })
    },
    {
      test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
      loader: 'url-loader?limit=1024'
    },
    {
      test: /\.(html|tpl)$/,
      loader: 'html-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // 默认路径代理
    alias: {
      '@': resolve('src'),
      'vue': 'vue/dist/vue.esm.js'
    }
  }
};
