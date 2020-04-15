import dayjs from 'dayjs'
import { ActionTree } from 'vuex'

import { ThreadsState } from '@/store/threads/types'
import { RootState } from '@/store/types'

export default {
  endThread: ({ commit }, id: string) => {
    commit('modifyThread', { id, endDatetime: dayjs().toISOString() })
  },
} as ActionTree<ThreadsState, RootState>
