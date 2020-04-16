import { Module } from 'vuex'

import actions from '@/store/threads/actions'
import getters from '@/store/threads/getters'
import mutations from '@/store/threads/mutations'
import { ThreadsState } from '@/store/threads/types'
import { RootState } from '@/store/types'

const threadsModule: Module<ThreadsState, RootState> = {
  state: [],
  mutations,
  actions,
  getters,
}

export default threadsModule
