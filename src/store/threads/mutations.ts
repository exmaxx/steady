import Vue from 'vue'
import { MutationTree } from 'vuex'

import { Thread, ThreadsState } from '@/store/threads/types'

const mutations: MutationTree<ThreadsState> = {
  addThread: (state, thread: Thread) => {
    state.push(thread)
    state.sort((thrA, thrB) =>
      thrB.startDatetime.localeCompare(thrA.startDatetime)
    )
  },

  modifyThread: (
    state,
    payload: { id: string; partialThread: Partial<Thread> }
  ) => {
    const index = state.findIndex(thread => thread.id === payload.id)

    if (index < 0) return

    Vue.set(state, index, {
      ...state[index],
      ...payload.partialThread,
    })
  },
}

export default mutations
