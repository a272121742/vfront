<style lang="less">
  @import './403.less';
</style>

<template>
  <div class="error403">
    <div class="error403-body-con">
      <i-card>
        <div class="error403-body-con-title">
          4
          <span class="error403-0-span">
            <Icon type="android-lock"/>
          </span>
          <span class="error403-key-span">
            <Icon 
              size="220" 
              type="ios-bolt"/>
          </span>
        </div>
        <p class="error403-body-con-message">您似乎没有权限访问该页面！</p>
        <div class="error403-btn-con">
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
  name: 'Error403',
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
