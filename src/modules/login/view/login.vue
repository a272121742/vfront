<style lang="less">
  @import './login.less';
</style>
<template>
  <div class="login">
    <div class="login-con">
      <i-card :borderd="false">
        <p slot="title">
          <i-icon type="log-in"/>
          欢迎登陆
        </p>
        <div class="form-con">
          <i-form
            ref="loginForm"
            :rules="loginFormRules"
            :model="loginForm"
            @keyup.enter.native="handlerLogin('loginForm')">
            <i-form-item prop="name">
              <i-input
                v-model="loginForm.name"
                placeholder="请输入用户名">
                <span slot="prepend">
                  <i-icon 
                    :size="16"
                    type="person"/>
                </span>
              </i-input>
            </i-form-item>
            <i-form-item prop="password">
              <i-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码">
                <span slot="prepend">
                  <i-icon 
                    :size="14" 
                    type="locked"/>
                </span>
              </i-input>
            </i-form-item>
            <i-form-item>
              <i-button
                type="primary"
                long 
                @click="handlerLogin('loginForm')"
              >
                登陆
              </i-button>
            </i-form-item>
          </i-form>
        </div>
      </i-card>
    </div>
  </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';

const parse = vm => JSON.parse(JSON.stringify(vm));

export default {
  data () {
    const state = this.$store.state.login;
    return {
      loginForm: parse(state.loginForm),
      loginFormRules: parse(state.loginFormRules)
    };
  },
  computed: {
    ...mapGetters('login', [

    ])
  },
  methods: {
    ...mapActions('login', [
      'toLogin'
    ]),
    // ...mapMutations('login', [
    //   // 'onSuccess',
    //   // 'saveUserInfo'
    // ]),
    // 登陆事件
    handlerLogin (name) {
      // 拦截重定向URL
      const redirect = decodeURIComponent(this.$route.query.redirect || '/');
      // 验证登陆表单
      this.$refs[name].validate().then((valid) => {
        if (valid) {
          this.toLogin(this.loginForm).then((userInfo) => {
            this.$router.push({ path: redirect });
          }).catch((fail) => {
            this.$Message.error(fail.message);
            throw new Error(fail);
          });
        }
      });
    }
  }
};
</script>