import Vue from 'vue'
import Vuex from 'vuex'

import experiencesModule from '@/store/experiences'
import { RootState } from '@/store/types'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: { experiences: experiencesModule },
})
