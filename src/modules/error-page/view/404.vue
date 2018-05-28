<style lang="less">
  @import "404.less";
</style>

<template>
  <div class="error404">
    <div class="error404-body-con">
      <i-card>
        <div class="error404-body-con-title">4<span><Icon type="ios-navigate-outline"/></span>4</div>
        <p class="error404-body-con-message">您所查找的页面已丢失！</p>
        <div class="error404-btn-con">
          <i-button 
            size="large" 
            style="width: 200px;" 
            type="text" 
            @click="goHome">返回首页</i-button>
          <i-button 
            size="large"
            style="width: 200px;margin-left: 40px;"
            type="primary"
            @click="goBack">
            返回上一页
          </i-button>
        </div>
      </i-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  methods: {
    goBack () {
      this.$router.go(-1);
    },
    goHome () {
      this.$router.push('/');
    }
  }
};
</script>
