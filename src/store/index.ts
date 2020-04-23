import Vue from 'vue'
import Vuex from 'vuex'

import Firebase from '@/lib/api/firebase'
import authModule from '@/store/auth'
import experiencesModule from '@/store/experiences'
import { RootState } from '@/store/types'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
    emotions: new Set(),
    activities: new Set(),
  },

  mutations: {
    addEmotion: (state, emotion) => state.emotions.add(emotion),

    addActivity: (state, activity) => state.activities.add(activity),
  },

  actions: {
    fetchAll: ({ dispatch }) =>
      Promise.all([
        dispatch('fetchExperiences'),
        dispatch('fetchEmotions'),
        dispatch('fetchActivities'),
      ]),

    fetchEmotions: ({ commit }) =>
      Firebase.getEmotions().then(emotions =>
        emotions.forEach(emotion => commit('addEmotion', emotion))
      ),

    fetchActivities: ({ commit }) =>
      Firebase.getActivities().then(activities =>
        activities.forEach(activity => commit('addActivity', activity))
      ),

    createEmotion: ({ commit }, emotion) =>
      Firebase.postEmotion(emotion)
        .then(() => commit('addEmotion', emotion))
        .catch(error => console.error('Error in createEmotion action.', error)),

    createActivity: ({ commit }, activity) =>
      Firebase.postActivity(activity)
        .then(() => commit('addActivity', activity))
        .catch(error =>
          console.error('Error in createActivity action.', error)
        ),
  },

  modules: {
    experiences: experiencesModule,
    auth: authModule,
  },
})
