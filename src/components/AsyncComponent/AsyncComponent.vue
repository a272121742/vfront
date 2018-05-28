<template>
  <component
    :is="AsyncComponent"
    :keep-alive="keepAlive"
    v-bind="$attrs"
    v-on="$listeners"/>
</template>

<script>
import factory from './factory.js';

/**
 * 动态文件加载器
 */
export default {
  inheritAttrs: false,
  // 外部传入属性
  props: {
    // 文件的路径
    path: {
      type: String,
      default: null
    },
    // 是否保持缓存
    keepAlive: {
      type: Boolean,
      required: false,
      default: true
    },
    // 延迟加载时间
    delay: {
      type: Number,
      default: 20
    },
    // 超时警告时间
    timeout: {
      type: Number,
      default: 2000
    }
  },
  data () {
    return {
      // 构建异步组件 - 懒加载实现
      AsyncComponent: factory(this.path, this.delay, this.timeout)
    }
  },
  watch: {
    path () {
      this.AsyncComponent = factory(this.path, this.delay, this.timeout);
    }
  },
  methods: {
    load (path = this.path) {
      this.AsyncComponent = factory(path, this.delay, this.timeout);
    }
  }
}
</script>

