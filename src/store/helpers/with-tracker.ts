import { Commit } from 'vuex'

import { Resource } from '@/store/types'

export default class WithTracker {
  resource: Resource
  commit: Commit

  /**
   * @param resource Name that must be a root state "sub state" (property of root state).
   * @param commit Commit interface from Vuex.
   */
  constructor(resource: Resource, commit: Commit) {
    this.resource = resource
    this.commit = commit
  }

  /**
   * Logs process start.
   */
  protected start() {
    this.commit('SET_STATUS_WORKING', this.resource)
  }

  /**
   * Logs process end.
   */
  protected end() {
    this.commit('SET_STATUS_FINISHED', this.resource)
  }

  /**
   * Run function and track its start and end. If you want to use promise, use `runPromise`.
   * @param fn
   */
  async runAsync<T>(fn: () => Promise<T>): Promise<T> {
    this.start()
    const result = await fn()
    this.end()

    return result
  }

  /**
   * Wrap a promise and trigger tracker before and after the promise is resolved.
   * @param promise
   */
  runPromise<T>(promise: Promise<T>): Promise<T> {
    this.start()

    return promise.then((data) => {
      this.end()
      return data
    })
  }
}
