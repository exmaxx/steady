import { Module } from 'vuex'

import actions from '@/store/experiences/actions'
import mutations from '@/store/experiences/mutations'
import state from '@/store/experiences/state'
import { ExperiencesState, Experience } from '@/store/experiences/types'
import { RootState } from '@/store/types'

const experiencesModule: Module<ExperiencesState, RootState> = {
  state,
  mutations,
  actions,

  getters: {
    findExperienceById: (state) => (id: string): Experience | null =>
      state.find((experience) => experience.id === id) || null,
  },
}

export default experiencesModule
