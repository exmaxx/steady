import Vue from 'vue'
import Vuex from 'vuex'

import Firebase from '@/lib/api/firebase'
import authModule from '@/store/auth'
import experiencesModule from '@/store/experiences'
import threadsModule from '@/store/threads'
import { RootState } from '@/store/types'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
    emotions: [],
    activities: [],
  },

  mutations: {
    addEmotion: (state, emotion) => {
      state.emotions.push(emotion)
      state.emotions.sort((emA, emB) => emA.localeCompare(emB))
    },

    addActivity: (state, activity) => {
      state.activities.push(activity)
      state.activities.sort((actA, actB) => actA.localeCompare(actB))
    },
  },

  actions: {
    fetchAll: ({ dispatch }) =>
      Promise.all([
        dispatch('fetchThreads').then(() => dispatch('fetchExperiences')),
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
    threads: threadsModule,
    auth: authModule,
  },
})
