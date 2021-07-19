<template>
  <div id="boxContent">
    <div id="contentHeader">
      <span style="align-self: center; margin-left: 20px; font-weight: bold; font-size: 28px">文章</span>
    </div>
    <el-row style="margin-bottom: 1px" v-for="(o, index) in list" :key="index">
      <el-col>
        <el-card class="box-card" shadow="hover">
          <div id="cardHeader">
            <span id="title">{{o.title}}</span>
            <div id="operateButtons">
              <el-button size="small" class="button" type="text" @click="o.blogCheckDialogVisible = true">查看</el-button>
              <el-button v-if="editable === true" size="small" class="button" type="text" @click="o.blogEditDialogVisible = true">编辑</el-button>
              <el-button v-if="editable === true" size="small" class="button" type="text" style="color: red" @click="o.blogDeleteDialogVisible = true">删除</el-button>
            </div>
          </div>
          <div id="briefIntroductionSection">
            <div id="userName">{{o.nickname}}</div>
            <div id="briefIntroduction">{{o.briefIntroduction}}</div>
          </div>
          <el-dialog :title='o.title' v-model='o.blogCheckDialogVisible' width="30%">
            <span style="color: #8A8A8A">简介：{{o.briefIntroduction}}</span>
            <span style="display: block; margin-top: 24px; font-size: 18px">正文：{{o.content}}</span>
          </el-dialog>
          <el-dialog title="删除" v-model='o.blogDeleteDialogVisible' width="30%">
            <span>确定要删除吗</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="o.blogDeleteDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteBlog(index, $event)">确 定</el-button>
              </span>
            </template>
          </el-dialog>
          <el-dialog title="编辑" v-model='o.blogEditDialogVisible' width="60%" @open="editDialogOpen(index, $event)">
            <el-form label-position="left"  :model="blogForm" label-width="80px">
              <el-form-item label="标题">
                <el-input style="width: 290px;" placeholder="请输入标题" v-model="blogForm.title"></el-input>
              </el-form-item>
              <el-form-item label="简介">
                <el-input type="textarea" placeholder="请输入简介" v-model="blogForm.briefIntroduction" maxlength="50" show-word-limit>
                </el-input>
              </el-form-item>
              <el-form-item label="正文">
                <el-input type="textarea" placeholder="请输入正文" :autosize="{ minRows: 19}" v-model="blogForm.content" maxlength="5000" show-word-limit>
                </el-input>
              </el-form-item>
              <el-form-item label="公开">
                <el-switch v-model="blogForm.publicity"></el-switch>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="o.blogEditDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateBlog(index, $event)">确 定</el-button>
              </span>
            </template>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'blogContentBox',
  data: function () {
    return {
      list: [{
        title: '查询不到内容'
      }],
      blogForm: {
        title: '',
        briefIntroduction: '',
        content: '',
        publicity: false
      }
    }
  },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    owner: {
      type: String,
      default: 'publish'
    }
  },
  mounted () {
    if (this.owner === 'publish') {
      this.$axios.get('/shutblog/blog/getAllBlogs')
        .then((Response) => {
          this.list = Response.data
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].publicity === '0') {
              this.list[i].publicity = true
            } else {
              this.list[i].publicity = false
            }
            this.list[i].blogDeleteDialogVisible = false
            this.list[i].blogEditDialogVisible = false
            this.list[i].blogCheckDialogVisible = false
          }
        })
    } else if (this.owner === 'self') {
      this.updateBlogList()
    }
  },
  methods: {
    editDialogOpen: function (index, event) {
      // console.log(index)
      this.blogForm.blogId = this.list[index].blogId
      this.blogForm.title = this.list[index].title
      this.blogForm.briefIntroduction = this.list[index].briefIntroduction
      this.blogForm.content = this.list[index].content
      this.blogForm.publicity = this.list[index].publicity
    },
    updateBlog (index, event) {
      console.log(this.blogForm)
      this.$axios.put('/shutblog/blog/updateBlog', {
        blogId: this.blogForm.blogId,
        title: this.blogForm.title,
        briefIntroduction: this.blogForm.briefIntroduction,
        content: this.blogForm.content,
        publicity: this.blogForm.publicity ? '0' : '1'
      })
        .then((Response) => {
          if (Response.data.success === true) {
            this.$message({
              type: 'success',
              message: Response.data.message
            })
            this.updateBlogList()
            this.list[index].blogEditDialogVisible = false
          } else {
            this.$message({
              type: 'error',
              message: Response.data.message
            })
          }
        })
    },
    deleteBlog (index, event) {
      this.$axios.delete('/shutblog/blog/deleteBlog?blogId=' + this.list[index].blogId)
        .then((Response) => {
          if (Response.data.success === true) {
            this.$message({
              type: 'success',
              message: Response.data.message
            })
            this.updateBlogList()
            this.list[index].blogDeleteDialogVisible = false
          } else {
            this.$message({
              type: 'error',
              message: Response.data.message
            })
          }
        })
    },
    updateBlogList () {
      this.$axios.get('/shutblog/blog/getOnesAllBlogs?userId=' + this.$store.state.userId)
        .then((Response) => {
          this.list = Response.data
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].publicity === '0') {
              this.list[i].publicity = true
            } else {
              this.list[i].publicity = false
            }
            this.list[i].blogDeleteDialogVisible = false
            this.list[i].blogEditDialogVisible = false
            this.list[i].blogCheckDialogVisible = false
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
  height: 50px;
  display: flex;
  flex-direction: row;
}
#title {
  font-size: 28px;
}
#briefIntroductionSection {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}
#userName {
  width: 150px;
  margin-right: 10px;
}
#briefIntroduction {
  width: 550px;
  color: #8A8A8A;
}
#cardHeader {
  display: flex;
  flex-direction: row;
}
#operateButtons {
  margin: 0 0 0 auto;
}
</style>
