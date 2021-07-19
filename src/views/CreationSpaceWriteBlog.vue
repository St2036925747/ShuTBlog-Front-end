<template>
  <div id="page">
    <header-box defaultNavMenuActiveIndex="/creationSpace" :nickName="nickname"></header-box>
    <div id="contentBox">
      <div id="mainContent">
        <el-menu id="navMenu" :router="true" :uniqueOpened="true" default-active="/creationSpaceNew" background-color="#24292E" text-color="#fff" active-text-color="#ffd04b"
          style="width: 200px">
          <el-menu-item index="/creationSpace">
            <i class="el-icon-house"></i>
            <template #title>首页</template>
          </el-menu-item>
          <el-menu-item index="/creationSpaceNew">
            <i class="el-icon-document-add"></i>
            <template #title>写博客</template>
          </el-menu-item>
        </el-menu>
        <new-blog-box></new-blog-box>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBox from '../components/HeaderBox.vue'
import NewBlogBox from '../components/NewBlogBox.vue'
export default {
  name: 'CreationSpaceWriteBlog',
  data () {
    return {
      nickname: ''
    }
  },
  components: { HeaderBox, NewBlogBox },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#F7F7F7')
  },
  mounted () {
    this.nickname = this.$store.state.nickname
    // console.log(this.$store.state.nickname)
  }
}
</script>

<style scoped>
#contentBox {
  display: flex;
  justify-content: center;
}
#mainContent {
  display: flex;
  flex-direction: row;
  height: 807px;
  margin-bottom: 32px;
}
#navMenu {
  margin-right: 24px;
}
/* a.menuActive {
  text-decoration: none;
  color: #ffd04b;
}
a.menuUnactive {
  text-decoration: none;
  color: #FFFFFF;
} */
</style>
