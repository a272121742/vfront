import Vue from 'vue';

Vue.config.productionTip = false;

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
// 这里可以加入其他文件的测试
// const srcContext = require.context('../../src/lib', true, /\.js$/);
// srcContext.keys().forEach(srcContext);
