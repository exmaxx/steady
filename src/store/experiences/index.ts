import { Module } from 'vuex'

import Firebase from '@/lib/api/firebase'
import { ExperiencesState, Experience } from '@/store/experiences/types'
import Tracker from '@/store/helpers/tracker'
import { RootState } from '@/store/types'

const experiencesModule: Module<ExperiencesState, RootState> = {
  state: [],

  mutations: {
    ADD_EXPERIENCE: (state, experience: Experience) => {
      state.push(experience)
      state.sort((exA, exB) => exB.datetime.localeCompare(exA.datetime))
    },

    REMOVE_EXPERIENCE: (state, id: string) => {
      const index = state.findIndex((exp) => exp.id === id)
      state.splice(index, 1)
    },

    UPDATE_EXPERIENCE: (state, experienceWithId: Experience) => {
      const index = state.findIndex((exp) => exp.id === experienceWithId.id)
      state.splice(index, 1, experienceWithId)
    },
  },

  actions: {
    fetchExperiences: ({ commit }) => {
      const tracker = new Tracker('experiences', commit)

      tracker
        .run(Firebase.getExperiences)
        .then((experiences) =>
          experiences.map((experience) => commit('ADD_EXPERIENCE', experience))
        )
    },

    createExperience: ({ commit }, experience: Experience) => {
      Firebase.setExperience(experience)
        .catch((error) =>
          console.error('Error in action createOrOverwriteExperience.', error)
        )
        .then((id) => commit('ADD_EXPERIENCE', { ...experience, id }))
    },

    overwriteExperience: ({ commit }, experienceWithId: Experience) => {
      Firebase.setExperience(experienceWithId)
        .catch((error) =>
          console.error('Error in action createOrOverwriteExperience.', error)
        )
        .then((_id) => commit('UPDATE_EXPERIENCE', { ...experienceWithId }))
    },
  },

  getters: {
    findExperienceById: (state) => (id: string): Experience | null =>
      state.find((experience) => experience.id === id) || null,
  },
}

export default experiencesModule
