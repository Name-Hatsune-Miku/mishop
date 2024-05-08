<template>
  <div class="login">
    <div class="bak">
      <div class="wechat"><img src="../assets/img/Z.jpeg"></div>
      <div class="login-box">
        <div class="top-box">
          <img src="../assets/img/logo.jpg">
        </div>
        <div class="bottom-box">
          <div class="left-box">
            <img src="../assets/img/pic.png" alt="">
          </div>
          <div class="right-box">
            <div class="imgtitle"><img src="../assets/img/title.png" alt=""></div>
            <div class="logincontent">
              <form class="layui-form" ref="loginForm">
                <div class="demo-login-container">
                  <div class="layui-form-item">
                    <div class="layui-input-wrap">
                      <div class="layui-input-prefix">
                        <i class="layui-icon layui-icon-username"></i>
                      </div>
                      <input type="text" name="username" value="" lay-verify="required" placeholder="用户名"
                             lay-reqtext="请填写用户名" autocomplete="off" class="layui-input" lay-affix="clear">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-input-wrap">
                      <div class="layui-input-prefix">
                        <i class="layui-icon layui-icon-password"></i>
                      </div>
                      <input type="password" name="password" value="" lay-verify="required" placeholder="密   码"
                             lay-reqtext="请填写密码" autocomplete="off" class="layui-input" lay-affix="eye">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-row">
                      <div class="layui-col-xs7">
                        <div class="layui-input-wrap">
                          <div class="layui-input-prefix">
                            <i class="layui-icon layui-icon-vercode"></i>
                          </div>
                          <input type="text" name="captcha" value="" lay-verify="required" placeholder="验证码"
                                 lay-reqtext="请填写验证码" autocomplete="off" class="layui-input" lay-affix="clear">
                        </div>
                      </div>
                      <div class="layui-col-xs5">
                        <div style="margin-left: 11px;">
                          <button type="button" class="layui-btn layui-btn-fluid layui-btn-primary"
                                  lay-on="reg-get-vercode" @click="getdata()">{{ vecode }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn layui-btn-fluid" lay-submit lay-filter="demo-login"
                            @click.prevent="logindata()">登录
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/login.css'
import {getstrCodedata, apiloginPostdata} from "../api/https";

export default {
  name: "LoginView",
  data() {
    return {
      vecode: '',
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      getstrCodedata().then(res => {
        console.log(res)
        this.vecode = res.msg
      })
    },
    logindata() {
      const username = this.$refs.loginForm.querySelector('[name="username"]').value;
      const password = this.$refs.loginForm.querySelector('[name="password"]').value;
      const code = this.$refs.loginForm.querySelector('[name="captcha"]').value;
      const loginData = {
        name: username,
        pwd: password,
        vercode: code,
      };
      apiloginPostdata(loginData).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>