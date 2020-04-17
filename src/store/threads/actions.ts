import dayjs from 'dayjs'
import { ActionTree } from 'vuex'

import Firebase from '@/lib/api/firebase'
import { Thread, ThreadsState } from '@/store/threads/types'
import { RootState } from '@/store/types'

const actions: ActionTree<ThreadsState, RootState> = {
  fetchThreads: ({ commit }) => {
    Firebase.getThreads().then(threads => {
      if (threads) threads.map(thread => commit('addThread', thread))
    })
  },

  endThread: async ({ commit }, id: string) => {
    const endDatetime = dayjs().toISOString()

    await Firebase.putThread(id, {
      endDatetime,
    })

    commit('modifyThread', {
      id,
      partialThread: { endDatetime },
    })
  },

  endActiveThread: ({ dispatch, getters }) => {
    if (!getters.activeThread) return

    return dispatch('endThread', getters.activeThread.id)
  },

  startThread: async ({ commit }) => {
    const thread: Thread = {
      startDatetime: dayjs().toISOString(),
      endDatetime: '',
    }

    const id = await Firebase.postThread(thread)

    if (id) {
      thread.id = id

      commit('addThread', thread)
    }
  },
}

export default actions
