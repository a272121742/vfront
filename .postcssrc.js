// @TODO 查清楚这个文件在哪里被引用
// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  "plugins": {
    // 允许样式表中使用`@import`导入外部样式
    "postcss-import": {},
    // 允许你按照项目目录直接引用url，而不需要require或import语法
    "postcss-url": {},
    // 根据目标浏览器追加css前缀，你可以在`package.json`文件中的`borwsersList`属性中编辑适配的目标浏览器版本
    "autoprefixer": {}
  }
};
