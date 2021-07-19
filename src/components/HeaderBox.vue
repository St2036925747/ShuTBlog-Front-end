<template>
    <div id="header">
        <span id="productionName">ShuTBlog</span>
        <el-menu :router="true"
          :default-active='defaultNavMenuActiveIndex'
          class="el-menu-demo"
          mode="horizontal"
          background-color="#24292E"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/personalInfo">个人中心</el-menu-item>
          <el-menu-item index="/creationSpace">创作中心</el-menu-item>
        </el-menu>
        <!-- <div id="loginRegistBtnSection">
          <el-button type="text" @click="loginDialogVisible = true">登录</el-button>
          <span style="margin: auto 4px; font-size: 14px"> 或 </span>
          <el-button type="text" @click="registDialogVisible = true">注册</el-button>
        </div> -->
        <div id="accountBox">
          <el-avatar style="background-color: #FFD04B; font-size: 18px"> {{nickName[0]}} </el-avatar>
          <span id="userNameSpan" style="color: #FFFFFF">{{nickName}}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HeaderBox',
  data () {
    return {
      userName: '',
      loginDialogVisible: false,
      registDialogVisible: false
    }
  },
  props: {
    nickName: {
      type: String,
      default: 'Username'
    },
    defaultNavMenuActiveIndex: {
      type: String,
      default: '1'
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped>
#header {
  display: flex;
  height: 60px;
  border-bottom: 1px solid #DCDFE6;
  color: #545c64;
  background-color: #24292E;
  margin-bottom: 32px;
}
#productionName {
    margin: auto 24px auto 24px;
    color: #FFFFFF;
    font-size: 25px;
}
/* #loginRegistBtnSection {
  display: flex;
  justify-content: center;
  height: 100%;
  margin: 0 24px 0 auto;
} */
#accountBox {
  display: flex;
  width: 150px;
  margin: 0 24px 0 auto;
  align-items: center;
}
#userNameSpan {
  width: 100px;
  margin-left: 10px;
}
</style>
