import { Module } from 'vuex'

import { ExperiencesState, Experience } from '@/store/experiences/types'
import { RootState } from '@/store/types'

const experiencesModule: Module<ExperiencesState, RootState> = {
  state: [],

  mutations: {
    addExperience: (state, experience: Experience) => {
      state.push(experience)
    },
  },
}

export default experiencesModule
