import { Commit } from 'vuex'

import {
  SET_STATUS_FINISHED,
  SET_STATUS_WORKING,
} from '@/store/statuses/mutations'
import { Resource } from '@/store/types'

export default class WithTracker {
  resource: Resource
  commit: Commit

  /**
   * WithTracker wrapper changes status in Vuex store before and after running the wrapped function.
   *
   * @param resource Name that must be a RootState's "sub state" (property of RootState).
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
    this.commit(SET_STATUS_WORKING, this.resource)
  }

  /**
   * Logs process end.
   */
  protected end() {
    this.commit(SET_STATUS_FINISHED, this.resource)
  }

  /**
   * Runs a function and tracks its start and end. If you want to use promise, use `runPromise`.
   * @param fn
   */
  async runAsync<T>(fn: () => T): Promise<T> {
    this.start()
    const result = await fn()
    this.end()

    return result
  }

  /**
   * Wraps a promise and trigger tracker before and after the promise is resolved.
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
