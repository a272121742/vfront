'use strict'
const path = require('path');
const config = require('../config');
// 抽离css样式 https://www.npmjs.com/package/extract-text-webpack-plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

//导出文件的位置，根据环境判断开发环境和生产环境，为config文件中index.js文件中定义的build.assetsSubDirectory或dev.assetsSubDirectory
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  // 跨系统平台的目录拼接
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}
  // 使用了css-loader和postcssLoader，通过options.usePostCSS属性来判断是否使用postcssLoader中压缩等方法
  const cssLoader = {
    loader: 'css-loader',
    options: {
      // 调试模式
      sourceMap: options.sourceMap,
      // 启用压缩
      minimize: true
    }
  };
  // 相关配置请参看项目文件中的`.postcssrc.js文件`
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // ExtractTextPlugin可提取出文本，代表首先使用上面处理的loaders，当未能正确引入时使用vue-style-loader
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      // 返回vue-style-loader连接loaders的最终值
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    // 需要`css-loader`和`vue-style-loader`
    css: generateLoaders(),
    // 需要`css-loader`、`postcssLoader`、`vue-style-loader`
    postcss: generateLoaders(),
    // 需要`less-loader`和`vue-style-loader`
    less: generateLoaders('less'),
    // 需要`sass-loader`和`vue-style-loader`
    sass: generateLoaders('sass', { indentedSyntax: true }),
    // 需要`sass-loader`和`vue-style-loader`
    scss: generateLoaders('sass'),
    // 需要`stylus-loader`和`vue-style-loader`
    stylus: generateLoaders('stylus'),
    // 需要`stylus-loader`和`vue-style-loader`
    styl: generateLoaders('stylus')
  }
}

// 为独立样式文件生成加载器 (脱离.vue文件的样式)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.createNotifierCallback = () => {
  // 发送跨平台通知系统 https://github.com/mikaelbr/node-notifier
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return
    // 当报错时输出错误信息的标题，错误信息详情，副标题以及图标
    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
