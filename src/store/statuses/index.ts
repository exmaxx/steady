import Vue from 'vue'
import { Module } from 'vuex'

import { ApiStatus } from '@/lib/api/types'
import { StatusesState } from '@/store/statuses/types'
import { Resource, RootState } from '@/store/types'

const statusesModule: Module<StatusesState, RootState> = {
  mutations: {
    /**
     * Set status of resource data sync.
     * @param state
     * @param payload
     */
    SET_STATUS: (state, payload: { resource: Resource; status: ApiStatus }) => {
      Vue.set(state, payload.resource, payload.status)
    },

    /**
     * Mutation shorthand for status 'working'.
     * @param state
     * @param resource
     */
    SET_STATUS_WORKING: (state, resource: Resource) => {
      Vue.set(state, resource, 'working')
    },

    /**
     * Mutation shorthand for status 'working'.
     * @param state
     * @param resource
     */
    SET_STATUS_FINISHED: (state, resource: Resource) => {
      Vue.set(state, resource, 'finished')
    },
  },

  getters: {
    getStatusOf: (state) => (resource: Resource) => state[resource],
  },
}

export default statusesModule
