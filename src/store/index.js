import Vue from 'vue'
import Vuex from 'vuex'
import dashboard from './modules/dashboard'
import login from './modules/login'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  modules: {
    dashboard,
    login,
    user
  }
})

export default store