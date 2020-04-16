import { Module } from 'vuex'

import actions from '@/store/threads/actions'
import mutations from '@/store/threads/mutations'
import { ThreadsState } from '@/store/threads/types'
import { RootState } from '@/store/types'
import getters from '@/store/threads/getters'

const threadsModule: Module<ThreadsState, RootState> = {
  state: [],
  mutations,
  actions,
  getters,
}

export default threadsModule
