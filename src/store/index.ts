import Vue from 'vue'
import Vuex from 'vuex'

import * as Firebase from '@/lib/api/firebase'
import experiencesModule from '@/store/experiences'
import { RootState } from '@/store/types'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
    experiences: [],
    emotions: [],
    activities: [],
  },

  mutations: {
    addEmotion: (state, emotion) => state.emotions.push(emotion),
    addActivity: (state, activity) => state.activities.push(activity),
  },

  actions: {
    fetchEmotions: ({ commit }) =>
      Firebase.getEmotions().then(emotions =>
        emotions.forEach(emotion => commit('addEmotion', emotion))
      ),

    fetchActivities: ({ commit }) =>
      Firebase.getActivities().then(activities =>
        activities.forEach(activity => commit('addActivity', activity))
      ),

    createEmotion: ({ commit }, emotion) => {
      Firebase.postEmotion(emotion).catch(error =>
        console.error('Error in createEmotion action.', error)
      )

      commit('addEmotion', emotion)
    },
  },

  modules: { experiences: experiencesModule },
})
