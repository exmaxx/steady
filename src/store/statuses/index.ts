import { Module } from 'vuex'

import mutations from '@/store/statuses/mutations'
import { StatusesState } from '@/store/statuses/types'
import { Resource, RootState } from '@/store/types'

const statusesModule: Module<StatusesState, RootState> = {
  mutations,

  getters: {
    getStatusOf: (state) => (resource: Resource) => state[resource],
  },
}

export default statusesModule
