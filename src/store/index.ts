import Vue from 'vue'
import Vuex from 'vuex'

import Firebase from '@/lib/api/firebase'
import experiencesModule from '@/store/experiences'
import { RootState } from '@/store/types'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
    experiences: [],
    emotions: [],
  },

  mutations: {
    addEmotion: (state, emotion) => state.emotions.push(emotion),
  },

  actions: {
    fetchEmotions: ({ commit }) =>
      Firebase.getEmotions().then(emotions =>
        emotions.forEach(emotion => commit('addEmotion', emotion))
      ),
  },

  modules: { experiences: experiencesModule },
})
