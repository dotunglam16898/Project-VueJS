import Vue from 'vue'
import Vuex from 'vuex'
import dashboard from './modules/dashboard'
import login from './modules/login'
import user from './modules/user'
import auth from './modules/auth'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  modules: {
    dashboard,
    login,
    user,
    auth
  },
  plugins: [createPersistedState()]
})

export default store