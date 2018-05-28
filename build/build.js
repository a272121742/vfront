'use strict'
//check-versions：调用检查版本的文件。加（）代表直接调用该函数
require('./check-versions')()

//设置当前是生产环境
process.env.NODE_ENV = 'production'

// 命令行加载动画 https://www.npmjs.com/package/ora
const ora = require('ora');
// 删除文件 https://www.npmjs.com/package/rimraf
const rm = require('rimraf');
const path = require('path');
// 命令行彩色输出 https://www.npmjs.com/package/chalk
const chalk = require('chalk');
const webpack = require('webpack');
// 默认读取config文件下的index.js文件
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('正在打包构建...')
spinner.start()
//先删除dist文件再生成新文件，因为有时候会使用hash来命名，删除整个文件可避免冗余
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      // 如果你使用了TypeScript（ts-loader），请一定要设置true，否则打包编译出错
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.error(chalk.red('\t >_<||| 打包时发生了不可避免的错误！！！！\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('\t \^o^/ 打包编译完成!!!\n'))
    console.log(chalk.yellow(
      '  提示: 打包文件只能存放在服务器环境中运行\n' +
      '  直接打开`index.html`是无法正常运行的！\n'
    ))
  })
})
