import { createStore } from 'vuex'

export default createStore({
  state: {
    userId: {},
    email: {},
    nickname: {}
  },
  mutations: {
    setUserId (state, userId) {
      state.userId = userId
    },
    setEmail (state, email) {
      state.email = email
    },
    setNickname (state, nickname) {
      state.nickname = nickname
    }
  },
  actions: {
  },
  modules: {
  }
})
