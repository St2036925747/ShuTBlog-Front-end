<template>
  <div>
    <header-box defaultNavMenuActiveIndex="/personalInfo" :nickName="nickname"></header-box>
    <div id="contentBox">
      <personal-information-box></personal-information-box>
    </div>
  </div>
</template>

<script>
import HeaderBox from '../components/HeaderBox.vue'
import PersonalInformationBox from '../components/PersonalInfomationBox.vue'
export default {
  data () {
    return {
      nickname: ''
    }
  },
  components: { HeaderBox, PersonalInformationBox },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#F7F7F7')
  },
  mounted () {
    // console.log(this.$store.state.nickname)
    this.nickname = this.$store.state.nickname
  }
}
</script>

<style scoped>
#contentBox {
  display: flex;
  justify-content: center;
}
</style>
