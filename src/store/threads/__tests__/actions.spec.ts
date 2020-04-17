import { ActionContext, ActionHandler } from 'vuex'

import { createSampleThread, TEST_ID } from './helpers'

import store from '@/store'
import actions from '@/store/threads/actions'
import { ThreadsState } from '@/store/threads/types'
import { RootState } from '@/store/types'

describe('THREADS ACTIONS', () => {
  const mockCommit = jest.fn()
  const mockDispatch = jest.fn()

  const actionContext: ActionContext<ThreadsState, RootState> = {
    dispatch: mockDispatch,
    commit: mockCommit,
    state: [],
    getters: store.getters,
    rootState: store.state,
    rootGetters: store.getters,
  }

  beforeEach(() => {
    store.state.threads = [createSampleThread(TEST_ID, true)]
    store.state.experiences = []
  })

  afterEach(() => {
    mockDispatch.mockClear()
    mockCommit.mockClear()
  })

  describe('endThread', () => {
    it('triggers modifyThread mutation', () => {
      const endThread = actions.endThread as ActionHandler<
        ThreadsState,
        RootState
      >

      const endThreadBound = endThread.bind(store)

      endThreadBound(actionContext, TEST_ID)

      const mockCommitArgs = mockCommit.mock.calls[0]

      expect(mockCommit).toBeCalledTimes(1)
      expect(mockCommitArgs[0]).toEqual('modifyThread')
      expect(mockCommitArgs[1]).toHaveProperty('id', TEST_ID)
      expect(mockCommitArgs[1]).toHaveProperty('partialThread')
    })
  })

  describe('endActiveThread', () => {
    it('triggers endThread action', () => {
      const endActiveThread = actions.endActiveThread as ActionHandler<
        ThreadsState,
        RootState
      >

      const endActiveThreadBound = endActiveThread.bind(store)

      endActiveThreadBound(actionContext)

      const mockDispatchArgs = mockDispatch.mock.calls[0]

      expect(mockDispatch).toBeCalledTimes(1)
      expect(mockDispatchArgs[0]).toEqual('endThread')
      expect(mockDispatchArgs[1]).toEqual(TEST_ID)
    })
  })
})
