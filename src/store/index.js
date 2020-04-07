import Vue from 'vue'
import Vuex from 'vuex'
import base from './base'
import sys from './sys'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: { ...base.actions, ...sys.actions },
  getters: { ...base.getters, ...sys.getters },
  state: { ...base.state, ...sys.state },
  mutations: { ...base.mutations, ...sys.mutations }
})
