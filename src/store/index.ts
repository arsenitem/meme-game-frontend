import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {},
  },
  getters: {
    user: state => state.user,
  },
  mutations: {
      setUser: (state, user) => state.user = user,
  },
  actions: {
  },
})
