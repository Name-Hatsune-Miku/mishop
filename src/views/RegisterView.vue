<template>
  <div class="register">
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
              <form class="layui-form" ref="registerForm">
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
                    <div class="layui-input-wrap">
                      <div class="layui-input-prefix">
                        <i class="layui-icon layui-icon-email"></i>
                      </div>
                      <input type="email" name="emails" value="" lay-verify="required" placeholder="邮箱"
                             lay-reqtext="请填写邮箱" autocomplete="off" class="layui-input" lay-affix="eye">
                    </div>
                  </div>
                  <div class="layui-form-item demo-reg-other">
                    <label>社交账号注册</label>
                    <span style="padding: 0 21px 0 6px;">
                        <a href="javascript:;"><i class="layui-icon layui-icon-login-qq"
                                                  style="color: #3492ed;"></i></a>
                        <a href="javascript:;"><i class="layui-icon layui-icon-login-wechat"
                                                  style="color: #4daf29;"></i></a>
                        <a href="javascript:;"><i class="layui-icon layui-icon-login-weibo" style="color: #cf1900;"></i></a>
                    </span>
                    <a class="gotologin" @click="gotoLogin" href="javascript:;">登录已有帐号</a>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn layui-btn-fluid" lay-submit lay-filter="demo-login"
                            @click.prevent="registerdata()">注册
                    </button>
                  </div>
                </div>
              </form>
              <div v-if="showSuccess" class="success-popup">
                <p>注册成功！</p>
                <p class="countdown">{{ countdown }} 秒后自动跳转至登录页...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/login.css'
import {apiregisterPostdata} from "../api/https";

export default {
  name: "RegisterView",
  data() {
    return {
      vecode: '',
      showSuccess: false, // 控制成功弹窗的显示
      countdown: 3, // 倒计时秒数
    }
  },
  methods: {
    async registerdata() {
      const username = this.$refs.registerForm.querySelector('[name="username"]').value;
      const password = this.$refs.registerForm.querySelector('[name="password"]').value;
      const emails = this.$refs.registerForm.querySelector('[name="emails"]').value;
      if (username && password && emails) {
        const registerData = {
          name: username,
          pwd: password,
          emails: emails,
        };
        console.log(registerData)
        try {
          const res = await apiregisterPostdata(registerData);
          console.log(res);
          // 显示成功弹窗并开始倒计时
          this.showSuccess = true;
          this.countdownTimer();
        } catch (error) {
          console.error('注册失败:', error);
        }
      }
    },
    countdownTimer() {
      this.countdownInterval = setInterval(() => {
        this.countdown -= 1;
        if (this.countdown <= 0) {
          clearInterval(this.countdownInterval);
          this.$router.push('/login'); // 跳转至登录页面
          this.showSuccess = false; // 隐藏弹窗
        }
      }, 1000);
    },
    // 在组件销毁前清除定时器，防止内存泄漏
    beforeDestroy() {
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
    },
    gotoLogin() {
      this.$router.push('/login');
    },
  }
}
</script>

<style scoped>
.success-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 1000;
}

.countdown {
  margin-top: 10px;
}
</style>