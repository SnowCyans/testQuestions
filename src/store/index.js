import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import subjects from './modules/subjects'

Vue.use(Vuex)

const store = new Vuex.Store({

  modules: {
    subjects
  },

  getters
})

export default store
