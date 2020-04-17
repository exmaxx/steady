import dayjs from 'dayjs'
import { Action, ActionHandler, Store } from 'vuex'

import { Thread, ThreadsState } from '@/store/threads/types'
import { RootState } from '@/store/types'

/**
 * Sample id of thread.
 */
export const TEST_ID = 'testId'

/**
 * Create sample thread which may have `endDatetime` (non active thread) or not (active thread).
 *
 * @param id
 * @param active Is it active (i.e. does it have empty `endDatetime`)?
 */
export const createSampleThread = (id: string, active = false): Thread => ({
  id,
  startDatetime: dayjs().toISOString(),
  endDatetime: active
    ? ''
    : dayjs()
        .add(1, 'day')
        .toISOString(),
})

/**
 * Binds action to store. First, it needs to cast `action` to `ActionHandler` so that it can use `bind`.
 *
 * @param action
 * @param store
 */
export const bindToStore = (
  action: Action<ThreadsState, RootState>,
  store: Store<RootState>
) => (action as ActionHandler<ThreadsState, RootState>).bind(store)
