import Vue from 'vue'
import Vuex from 'vuex'
import direction from './modules/direction'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
   direction
  },
  getters,
  plugins: [createPersistedState()]
})

export default store