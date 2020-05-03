import Vue from 'vue'
import Vuex from 'vuex'

import Firebase from '@/lib/api/firebase'
import authModule from '@/store/auth'
import experiencesModule from '@/store/experiences'
import habitsModule from '@/store/habits'
import WithTracker from '@/store/helpers/with-tracker'
import statusesModule from '@/store/statuses'
import { RootState } from '@/store/types'

Vue.use(Vuex)

const store = new Vuex.Store<RootState>({
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
        dispatch('fetchHabits'),
        dispatch('fetchEmotions'),
        dispatch('fetchActivities'),
        dispatch('fetchExperiences'),
      ]),

    fetchEmotions: ({ commit }) => {
      const withTracker = new WithTracker('emotions', commit)

      const promise = Firebase.getEmotions().then((emotions) =>
        emotions.forEach((emotion) => commit('ADD_EMOTION', emotion))
      )

      return withTracker.runPromise(promise)
    },

    fetchActivities: ({ commit }) => {
      const withTracker = new WithTracker('activities', commit)

      const promise = Firebase.getActivities().then((activities) =>
        activities.forEach((activity) => commit('ADD_ACTIVITY', activity))
      )

      return withTracker.runPromise(promise)
    },

    createEmotion: ({ commit }, emotion) =>
      Firebase.setEmotion(emotion)
        .then(() => commit('ADD_EMOTION', emotion))
        .catch((error) =>
          console.error('Error in createEmotion action.', error)
        ),

    createActivity: ({ commit }, activity) =>
      Firebase.setActivity(activity)
        .then(() => commit('ADD_ACTIVITY', activity))
        .catch((error) =>
          console.error('Error in createActivity action.', error)
        ),
  },

  modules: {
    habits: habitsModule,
    experiences: experiencesModule,
    auth: authModule,
    statuses: statusesModule,
  },
})

export default store
