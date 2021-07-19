<template>
  <div id="boxContent">
    <div id="contentHeader">
      <span style="align-self: center; margin-left: 20px; font-weight: bold">写博客</span>
    </div>
    <div id="editSection">
      <el-form label-position="left" :model="newBlogForm" label-width="80px">
        <el-form-item label="标题">
          <el-input style="width: 290px;" placeholder="请输入标题" v-model="newBlogForm.title"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" placeholder="请输入简介" v-model="newBlogForm.briefIntroduction" maxlength="50" show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="正文">
          <el-input type="textarea" placeholder="请输入正文" :autosize="{ minRows: 19}" v-model="newBlogForm.content" maxlength="5000" show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="公开">
          <el-switch v-model="newBlogForm.publicity"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submit"
          style="width: 80px; background-color:#24292E; border-color:#24292E; color:#ffd04b;"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newBlogBox',
  data () {
    return {
      newBlogForm: {
        title: '',
        briefIntroduction: '',
        content: '',
        publicity: false
      }
    }
  },
  methods: {
    submit () {
      this.$axios.post('/shutblog/blog/newBlog', {
        title: this.newBlogForm.title,
        briefIntroduction: this.newBlogForm.briefIntroduction,
        content: this.newBlogForm.content,
        publicity: this.newBlogForm.publicity ? '0' : '1',
        userId: this.$store.state.userId
      })
        .then((Response) => {
          // console.log(Response)
          if (Response.data.success === true) {
            this.$message({
              type: 'success',
              message: Response.data.message
            })
            this.$router.push('/creationSpace')
          } else {
            this.$message({
              type: 'error',
              message: Response.data.message
            })
          }
        })
    }
  }
}
</script>

<style scoped>
#boxContent {
  display: flex;
  flex-direction: column;
  width: 824px;
  background-color: #FFFFFF;
}
#contentHeader {
  width: 824px;
  height: 47px;
  border-bottom: 1px solid #F0F0F0;
  display: flex;
  flex-direction: row;
}
#editSection {
  margin: 32px 32px 32px 32px;
}
</style>
