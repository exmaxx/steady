import { Module } from 'vuex'

import { ExperiencesState, Experience } from '@/store/experiences/types'
import { RootState } from '@/store/types'
import Firebase from "@/lib/api/firebase";

const experiencesModule: Module<ExperiencesState, RootState> = {
  state: [],

  mutations: {
    addExperience: (state, experience: Experience) => {
      state.push(experience)
    },
  },

  actions: {
    fetchExperiences: ({ commit }) => {
      Firebase.getExperiences().then(experiences =>
        experiences.map(experience => commit('addExperience', experience))
      )
    },

    createExperience: ({ commit }, experience: Experience) => {
      Firebase.postExperience(experience).catch(error =>
        console.error('Error in action createExperience.', error)
      )

      commit('addExperience', experience)
    },
  },
}

export default experiencesModule
