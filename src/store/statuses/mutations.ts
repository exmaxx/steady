import Vue from 'vue'
import { MutationTree } from 'vuex'

import { ApiStatus } from '@/lib/api/types'
import { StatusesState } from '@/store/statuses/types'
import { Resource } from '@/store/types'

export const SET_STATUS = '🚦 Set Status'
export const SET_STATUS_WORKING = '🚦 🛠 Set Status Working'
export const SET_STATUS_FINISHED = '🚦 🏁 Set Status Finished'

const mutations: MutationTree<StatusesState> = {
  /**
   * Set status of resource data sync.
   * @param state
   * @param payload
   */
  [SET_STATUS]: (state, payload: { resource: Resource; status: ApiStatus }) => {
    Vue.set(state, payload.resource, payload.status)
  },

  /**
   * Mutation shorthand for status 'working'.
   * @param state
   * @param resource
   */
  [SET_STATUS_WORKING]: (state, resource: Resource) => {
    Vue.set(state, resource, 'working')
  },

  /**
   * Mutation shorthand for status 'working'.
   * @param state
   * @param resource
   */
  [SET_STATUS_FINISHED]: (state, resource: Resource) => {
    Vue.set(state, resource, 'finished')
  },
}

export default mutations
