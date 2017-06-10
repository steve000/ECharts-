import Vue from 'vue'
import Vuex from 'vuex'
import data from './data'

Vue.use(Vuex)

const DEBUG = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    data
  },
  strict: DEBUG
})
