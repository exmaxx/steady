import { Module } from 'vuex'

import actions from '@/store/auth/actions'
import mutations from '@/store/auth/mutations'
import state from '@/store/auth/state'
import { AuthState } from '@/store/auth/types'
import { RootState } from '@/store/types'

const authModule: Module<AuthState, RootState> = {
  state,
  mutations,
  actions,
}

export default authModule
