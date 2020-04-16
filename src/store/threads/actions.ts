import dayjs from 'dayjs'
import { ActionHandler } from 'vuex'

import { Thread, ThreadsState } from '@/store/threads/types'
import { RootState } from '@/store/types'
import Firebase from '@/lib/api/firebase'

export default {
  fetchThreads: (({ commit }) => {
    Firebase.getThreads().then(threads => {
      if (threads) threads.map(thread => commit('addThread', thread))
    })
  }) as ActionHandler<ThreadsState, RootState>,

  endThread: (({ commit }, id: string) => {
    commit('modifyThread', { id, endDatetime: dayjs().toISOString() })
  }) as ActionHandler<ThreadsState, RootState>,

  startThread: (async ({ commit }) => {
    const thread: Thread = {
      startDatetime: dayjs().toISOString(),
      endDatetime: '',
    }

    const id = await Firebase.postThread(thread)

    if (id) {
      thread.id = id

      commit('addThread', thread)
    }
  }) as ActionHandler<ThreadsState, RootState>,
}

// NOTE: I do not use `ActionTree` because then Intelisense is not offering actions. Instead I must use `ActionHandler` at each function.
// } // as ActionTree<ThreadsState, RootState>
