import { createStore } from 'vuex'

export default createStore({
  state: {
      username: localStorage.getItem('userName') || '' as String,
  },
  getters: {
    username: state => state.username,
  },
  mutations: {
      setUsername: (state, username: String) => state.username = username,
  },
  actions: {
    updateUsername:({commit}, username) => {
      commit('setUsername', username);
      localStorage.setItem('userName', username);
    },
  },
})
