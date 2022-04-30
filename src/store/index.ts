import { createStore } from 'vuex'
import socket from '../socket';

export default createStore({
  state: {
    username: '',
    user: {},
  },
  getters: {
    user: state => state.user,
  },
  mutations: {
      setUser: (state, user) => state.user = user,
  },
  actions: {
    // updateUsername:({commit}, payload) => {
    // },
  },
})
