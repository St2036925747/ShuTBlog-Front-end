<template>
  <div id="contentBox">
    <div id="contentHeader">
      <span style="align-self: center; margin-left: 20px; font-weight: bold">个人资料</span>
    </div>
    <div id="baseInfoSection" class="infoSection" style="margin-top: 10px">
      <div id="baseInfoHeader" class="infoHeader">
        <span style="align-self: center;">基本信息</span>
      </div>
      <el-form label-position="left" :model="userInfo" label-width="80px">
        <el-form-item label="昵称">
          <el-input style="width: 290px;" v-model="userInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input style="width: 290px;" v-model="userInfo.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userInfo.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="保密"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input style="width: 120px;" v-model="userInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input style="width: 640px;" v-model="userInfo.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="saveUserInfo"
          style="width: 80px; background-color:#24292E; border-color:#24292E; color:#ffd04b;"
          >保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="accountInfoSection" class="infoSection">
      <div id="accountInfoHeader" class="infoHeader">
        <span style="align-self: center;">密码修改</span>
      </div>
      <el-form label-position="left" :model="pwdFrom" label-width="80px">
        <el-form-item label="密码">
          <el-input style="width: 290px;" v-model="pwdFrom.oldPwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input style="width: 290px;" v-model="pwdFrom.newPwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="重复密码">
          <el-input style="width: 290px;" v-model="pwdFrom.repeatPwd" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="changePwd"
          style="width: 80px; background-color:#24292E; border-color:#24292E; color:#ffd04b;"
          >修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        nickname: '',
        realName: '',
        sex: '',
        phone: '',
        address: ''
      },
      pwdFrom: {
        oldPwd: '',
        newPwd: '',
        repeatPwd: ''
      }
    }
  },
  methods: {
    clearPwdForm () {
      this.pwdFrom.oldPwd = ''
      this.pwdFrom.newPwd = ''
      this.pwdFrom.repeatPwd = ''
      console.log('?')
    },
    saveUserInfo () {
      let sex
      if (this.userInfo.sex === '保密') {
        sex = '0'
      } else if (this.userInfo.sex === '男') {
        sex = '1'
      } else if (this.userInfo.sex === '女') {
        sex = '2'
      }

      this.$axios.put('/shutblog/user/updateUserInfo', {
        userId: this.$store.state.userId,
        nickname: this.userInfo.nickname,
        realName: this.userInfo.realName,
        sex: sex,
        phone: this.userInfo.phone,
        address: this.userInfo.address
      })
        .then((Response) => {
          // console.log(Response)
          if (Response.data.success === true) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          }
        })
    },
    changePwd () {
      if (this.pwdFrom.oldPwd === this.pwdFrom.newPwd) {
        this.$message({
          type: 'error',
          message: '新密码必须与旧密码不同'
        })
      } else if (this.pwdFrom.newPwd !== this.pwdFrom.repeatPwd) {
        this.$message({
          type: 'error',
          message: '两次密码不一致'
        })
      } else {
        this.$axios.put('/shutblog/user/changePwd?userId=' + this.$store.state.userId + '&oldPwd=' + this.pwdFrom.oldPwd + '&newPwd=' + this.pwdFrom.newPwd)
          .then((Response) => {
            console.log(Response)
            if (Response.data.success === true) {
              this.$message({
                type: 'success',
                message: '密码修改成功'
              })
              this.clearPwdForm()
            } else {
              this.$message({
                type: 'error',
                message: Response.data.message
              })
            }
          })
      }
    }
  },
  mounted () {
    this.$axios.get('/shutblog/user/userInfo?userId=' + this.$store.state.userId)
      .then((Response) => {
        this.userInfo.nickname = Response.data.nickname
        this.userInfo.realName = Response.data.realName
        if (Response.data.sex === '0') {
          this.userInfo.sex = '保密'
        } else if (Response.data.sex === '1') {
          this.userInfo.sex = '男'
        } else if (Response.data.sex === '2') {
          this.userInfo.sex = '女'
        }
        this.userInfo.phone = Response.data.phone
        this.userInfo.address = Response.data.address
      })
  }
}
</script>

<style scoped>
#contentBox {
  display: flex;
  flex-direction: column;
  width: 824px;
  background-color: #FFFFFF;
  margin-bottom: 32px;
}
#contentHeader {
  width: 824px;
  height: 47px;
  border-bottom: 1px solid #F0F0F0;
  display: flex;
  flex-direction: row;
}
.infoSection {
  margin-left: 24px;
  margin-right: 24px;
}
.infoHeader {
  height: 36px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #F0F0F0;
  margin-bottom: 24px;
}
</style>
