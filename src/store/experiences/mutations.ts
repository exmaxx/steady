import { MutationTree } from 'vuex'

import { Experience, ExperiencesState } from '@/store/experiences/types'

export const ADD_EXPERIENCE = 'Add Experience'
export const REMOVE_EXPERIENCE = 'Remove Experience'
export const UPDATE_EXPERIENCE = 'Update Experience'

const mutations: MutationTree<ExperiencesState> = {
  [ADD_EXPERIENCE]: (state, experience: Experience) => {
    state.push(experience)
    state.sort((exA, exB) => exB.datetime.localeCompare(exA.datetime))
  },

  [REMOVE_EXPERIENCE]: (state, id: string) => {
    const index = state.findIndex((exp) => exp.id === id)
    state.splice(index, 1)
  },

  [UPDATE_EXPERIENCE]: (state, experienceWithId: Experience) => {
    if (experienceWithId.id.length === 0)
      throw new Error(
        'Id is empty. You must provide valid id to update the experience.'
      )

    const index = state.findIndex((exp) => exp.id === experienceWithId.id)
    state.splice(index, 1, experienceWithId)

    // TODO: Maybe getter should do this. Check whether it is recalculated
    //  only when experiences change or when anything in store changes.
    state.sort((exA, exB) => exB.datetime.localeCompare(exA.datetime))
  },
}

export default mutations
