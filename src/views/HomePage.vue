<template>
  <div>
    <header-box defaultNavMenuActiveIndex="/home" :nickName="nickname"></header-box>
    <div id="contentBox">
      <blog-content-box :editable="false" :owner="publish"></blog-content-box>
    </div>
  </div>
</template>

<script>
import HeaderBox from '../components/HeaderBox.vue'
import BlogContentBox from '../components/BlogContentBox.vue'
export default {
  name: 'HomePage',
  components: { HeaderBox, BlogContentBox },
  data () {
    return {
      nickname: ''
    }
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#F7F7F7')
  },
  created () {
    // console.log(this.$store.state.email, this.$store.state.userId)
    this.$axios.get('/shutblog/user/userInfo?userId=' + this.$store.state.userId)
      .then((Response) => {
        // console.log(Response)
        this.$store.commit('setNickname', Response.data.nickname)
        this.nickname = Response.data.nickname
      })
  }
}
</script>

<style scoped>
#contentBox {
  display: flex;
  justify-content: center;
}
</style>
