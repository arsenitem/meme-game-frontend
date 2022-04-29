import { createStore } from 'vuex'
import socket from '../socket';

export default createStore({
  state: {
    username: localStorage.getItem('userName') || '' as String,
    user: {},
  },
  getters: {
    username: state => state.username,
    user: state => state.user,
  },
  mutations: {
      setUsername: (state, username: String) => state.username = username,
      setUser: (state, user) => state.user = user,
  },
  actions: {
    updateUsername:({commit}, username) => {
      socket.emit('player:create', {name: username});
      commit('setUsername', username);
      localStorage.setItem('userName', username);
    },
  },
})
