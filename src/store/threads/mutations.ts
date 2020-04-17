import Vue from 'vue'

import { Thread, ThreadsState } from '@/store/threads/types'

export default {
  addThread: (state: ThreadsState, thread: Thread) => state.push(thread),

  modifyThread: (
    state: ThreadsState,
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
