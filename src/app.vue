<style scoped>
  @import 'styles/common.css';
  .app-main{
      width: 100%;
      height: 100%;
  }
</style>
<template>
  <div id="main" class="app-main">
    <div>
      <Button type="primary" size="small" @click="logout">注销</Button>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Cookie from 'js-cookie';

  export default {
    data () {
      return {}
    },
    mounted () {

    },
    beforeDestroy () {

    },
    methods: {
      logout () {
        Cookie.remove('session');
        this.$router.push('login');
      }
    }
  }
</script>
