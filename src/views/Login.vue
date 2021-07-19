<template>
    <div id="loginDiv">
        <div id="loginInputBlock" class="block">
            <span id="loginTitle">欢迎使用ShuTBlog</span>
            <div id="emailInputSection" class="firstInputSection">
              <el-input id="emailInput" placeholder="输入邮箱" size="medium" style="width:320px;" v-model="userName"></el-input>
            </div>
            <div id="passwordInputSection" class="lastInputSection normalInputSection">
              <el-input id="passwordInput" placeholder="输入密码" size="medium" style="width:320px;" v-model="password" show-password></el-input>
            </div>
            <div id="buttonSection">
                <el-button type="primary" @click="login" style="width: 320px; background-color:#24292E; border-color:#24292E; color:#ffd04b;">登录</el-button>
                <el-button type="text" size="small" id="registButton" @click="toRegist">没有账号，去注册</el-button>
            </div>
        </div>
        <div id="infomationBlock" class="block">
          <span class="infoSpan">登录注册即代表同意ShuT <a href="">用户协议</a> 和 <a href="">隐私协议</a> </span>
          <span class="infoSpan"><a href="">关于我们</a> <a href="">问题反馈</a> <a href="">帮助中心</a></span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#F7F7F7')
  },
  methods: {
    login () {
      this.$axios.get('/shutblog/user/login/?email=' + this.userName + '&pwd=' + this.password)
        .then((Response) => {
          console.log(Response)
          if (Response.data.success === true) {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            this.$store.commit('setEmail', this.userName)
            this.$axios.get('/shutblog/user/getUserId?email=' + this.userName)
              .then((Response) => {
                // console.log(Response)
                if (Response.status === 200) {
                  this.$store.commit('setUserId', Response.data)
                }
                this.$router.push('/home')
              })
          } else {
            this.$message({
              type: 'error',
              message: Response.data.message
            })
          }
        })
    },
    toRegist () {
      this.$router.push('/regist')
    }
  }
}
</script>

<style scoped>
#loginDiv {
    display: flex;
    flex-direction: column;
    width: 384px;
    height: 289px;
    box-shadow: 2px 2px 5px #888888;
    background-color: #FFFFFF;
    margin-left: 560px;
    margin-top: 200px;
    padding-top: 32px;
    padding-bottom: 32px;
    border-radius: 5px;
}
.block {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
    margin: 0 32px 0 32px;
}
#loginTitle {
    align-self: flex-start;
    font-size: 24px;
}
.firstInputSection {
  margin-top: 32px;
}
.normalInputSection {
  margin-top: 10px;
}
.lastInputSection {
  margin-bottom: 28px;
}
#buttonSection {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}
#registButton {
  align-self: flex-end;
}
.infoSpan {
  font-size: 12px;
  color: #C1C1C1;
}
a:link {
  color: #C1C1C1;
  text-decoration: none;
}
a:visited {
  color: #C1C1C1;
  text-decoration: none;
}
a:hover {
  color: #C1C1C1;
  text-decoration: none;
}
a:active {
  color: #C1C1C1;
  text-decoration: none;
}
</style>
