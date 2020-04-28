import Vue from 'vue'
import Vuex from 'vuex'

import Firebase from '@/lib/api/firebase'
import authModule from '@/store/auth'
import experiencesModule from '@/store/experiences'
import Tracker from '@/store/helpers/tracker'
import statusesModule from '@/store/statuses'
import { RootState } from '@/store/types'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
    emotions: new Set(),
    activities: new Set(),
  },

  mutations: {
    ADD_EMOTION: (state, emotion) =>
      (state.emotions = new Set([...state.emotions, emotion])),

    ADD_ACTIVITY: (state, activity) =>
      (state.activities = new Set([...state.activities, activity])),
  },

  actions: {
    fetchAll: ({ dispatch }) =>
      Promise.all([
        dispatch('fetchEmotions'),
        dispatch('fetchActivities'),
        dispatch('fetchExperiences'),
      ]),

    fetchEmotions: ({ commit }) => {
      const tracker = new Tracker('emotions', commit)

      tracker
        .run(Firebase.getEmotions)
        .then((emotions) =>
          emotions.forEach((emotion) => commit('ADD_EMOTION', emotion))
        )
    },

    fetchActivities: ({ commit }) => {
      const tracker = new Tracker('activities', commit)

      tracker
        .run(Firebase.getActivities)
        .then((activities) =>
          activities.forEach((activity) => commit('ADD_ACTIVITY', activity))
        )
    },

    createEmotion: ({ commit }, emotion) =>
      Firebase.postEmotion(emotion)
        .then(() => commit('ADD_EMOTION', emotion))
        .catch((error) =>
          console.error('Error in createEmotion action.', error)
        ),

    createActivity: ({ commit }, activity) =>
      Firebase.postActivity(activity)
        .then(() => commit('ADD_ACTIVITY', activity))
        .catch((error) =>
          console.error('Error in createActivity action.', error)
        ),
  },

  modules: {
    experiences: experiencesModule,
    auth: authModule,
    statuses: statusesModule,
  },
})
