import { Commit } from 'vuex'

import { Resource } from '@/store/types'

export default class Tracker {
  resource: Resource
  commit: Commit

  constructor(resource: Resource, commit: Commit) {
    this.resource = resource
    this.commit = commit
  }

  protected start() {
    this.commit('SET_STATUS_WORKING', this.resource)
  }

  protected end() {
    this.commit('SET_STATUS_FINISHED', this.resource)
  }

  async run<T>(fn: () => Promise<T>): Promise<T> {
    this.start()
    const result = await fn()
    this.end()

    return result
  }
}
