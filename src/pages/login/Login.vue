<template>
  <div id="login">
    <div class="loginContainer">
      <img src="../../assets/img/loginBackgroud.png" class="loginBgImg"/>
      <div class="loginContent">
        <el-form :model="loginForm" ref="loginForm" :rules="loginRules">
          <div class="loginHead">
            <p class="loginFont">课程评估系统</p>
            <img src="../../assets/img/login.png" class="loginLogo"/>
          </div>
          <el-form-item prop="identity">
            <el-select v-model="loginForm.identity" placeholder="请选择" class="loginSelect" @change="clear()">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" name="username" placeholder="请输入学号/工号/邮箱/手机号" auto-complete="on"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" show-password name="password" placeholder="请输入密码" auto-complete="new-password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin" class="loginButton">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      identityEN: ['collegeLeader', 'dean', 'inspector', 'secretary', 'teacher', 'student', 'admin'],
      identityCH: ['院领导', '系主任', '督学', '教学秘书', '教师', '学生', '管理员'],
      options: [{
        value: '院领导',
        label: '院领导'
      }, {
        value: '系主任',
        label: '系主任'
      }, {
        value: '督学',
        label: '督学'
      }, {
        value: '教学秘书',
        label: '教学秘书'
      }, {
        value: '教师',
        label: '教师'
      }, {
        value: '学生',
        label: '学生'
      }, {
        value: '管理员',
        label: '管理员'
      }],
      loginForm: {
        username: '',
        password: '',
        identity: ''
      },
      loginRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    '$route': 'handleLoginInfo'
  },
  // 按下回车登录
  created () {
    var _this = this
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13 || key === 100) {
        _this.handleLogin()
      }
    }
  },
  methods: {
    ...mapMutations(['setToken']),
    // 获取用户信息
    handleLoginInfo () {
      this.$axios({
        methods: 'get',
        url: '/login',
        params: {
          identity: this.loginForm.identity
        }
      }).then(res => {
        const data = res.data.users
        let errorFlag = true
        data.forEach(item => {
          console.log(item)
          if ((this.loginForm.username === item.userName) && (this.loginForm.password === item.password)) {
            console.log('登录成功')
            errorFlag = false
            var token = 'Bearer' + item.userName + item.password
            // 将用户token保存到vuex中
            this.setToken({Authorization: token})
            localStorage.setItem('userId', item.userId)
            localStorage.setItem('identity', item.identity)
            var identity = item.identity
            console.log(identity)
            for (let i = 0; i < this.identityCH.length; i++) {
              if (identity === this.identityCH[i]) {
                this.$router.push('/' + this.identityEN[i])
              }
            }
            return 0
          }
        })
        if (errorFlag === true) {
          this.$message.error('用户名或密码错误')
        }
      })
    },
    handleLogin (res) {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.handleLoginInfo()
        } else {
          this.$message.error('用户名或密码错误')
        }
      })
    },
    // 清空输入框
    clear () {
      this.loginForm.username = ''
      this.loginForm.password = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loginContainer
    width : 800px
    height : 500px
    margin : 60px 260px
    .loginBgImg
      width : 450px
      height : 200px
      margin-top : 170px
      margin-right : 20px
    .loginContent
      width : 300px
      height : 400px
      float : right
      margin : 50px 0px
      .el-form-item
        margin-top: 30px
        .loginSelect
          width : 300px
        .el-input
          width:300px
        .loginButton
          width : 300px
      .loginHead
        width : 300px
        .loginFont
          display : inline
          width : 180px
          font-family : '宋体'
          font-size : 28px
          margin : 0px
        .loginLogo
          width : 32px
          height : 32px
          float : right
</style>
