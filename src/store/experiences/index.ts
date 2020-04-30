import { Module } from 'vuex'

import Firebase from '@/lib/api/firebase'
import { ExperiencesState, Experience } from '@/store/experiences/types'
import WithTracker from '@/store/helpers/with-tracker'
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
      const withTracker = new WithTracker('experiences', commit)

      const promise = Firebase.getExperiences().then((experiences) =>
        experiences.forEach((experience) =>
          commit('ADD_EXPERIENCE', experience)
        )
      )

      withTracker.runPromise(promise)
    },

    createExperience: ({ commit }, experience: Experience) => {
      Firebase.setExperience(experience)
        .catch((error) =>
          console.error('Error in action createExperience.', error)
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
