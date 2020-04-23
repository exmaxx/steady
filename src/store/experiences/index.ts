import { Module } from 'vuex'

import Firebase from '@/lib/api/firebase'
import { ExperiencesState, Experience } from '@/store/experiences/types'
import { RootState } from '@/store/types'

const experiencesModule: Module<ExperiencesState, RootState> = {
  state: [],

  mutations: {
    ADD_EXPERIENCE: (state, experience: Experience) => {
      state.push(experience)
      state.sort((exA, exB) => exB.datetime.localeCompare(exA.datetime))
    },
  },

  actions: {
    fetchExperiences: ({ commit }) => {
      Firebase.getExperiences().then(experiences =>
        experiences.map(experience => commit('ADD_EXPERIENCE', experience))
      )
    },

    createExperience: ({ commit }, experience: Experience) => {
      Firebase.postExperience(experience)
        .catch(error =>
          console.error('Error in action createExperience.', error)
        )
        .then(id => commit('ADD_EXPERIENCE', { ...experience, id }))
    },
  },
}

export default experiencesModule
