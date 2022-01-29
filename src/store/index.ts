import { createStore } from 'vuex'

export default createStore({
  state: {
      username: '' as String,
  },
  getters: {
    username: state => state.username,
  },
  mutations: {
      setUsername: (state, username: String) => state.username = username,
  },
  actions: {
    updateUsername:({commit}, username) => commit('setUsername', username),
  },
})
