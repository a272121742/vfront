<style lang="less">
  @import './500.less';
</style>

<template>
  <div class="error500">
    <div class="error500-body-con">
      <i-card>
        <div class="error500-body-con-title">
          5<span class="error500-0-span"><Icon type="social-freebsd-devil"/></span><span class="error500-0-span"><Icon type="social-freebsd-devil"/></span>
        </div>
        <p class="error500-body-con-message">服务器似乎忙的不可开交！</p>
        <div class="error500-btn-con">
          <i-button
            size="large"
            style="width: 200px;"
            type="text"
            @click="goHome">
            返回首页
          </i-button>
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
  name: 'Error500',
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
