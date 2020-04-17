import Vue from 'vue'

import { Thread, ThreadsState } from '@/store/threads/types'
import { MutationTree } from 'vuex'

const mutations: MutationTree<ThreadsState> = {
  addThread: (state, thread: Thread) => state.push(thread),

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
