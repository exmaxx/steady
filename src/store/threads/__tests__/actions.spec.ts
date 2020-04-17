import { ActionContext } from 'vuex'

import { bindToStore, createSampleThread, TEST_ID } from './helpers'

import store from '@/store'
import actions from '@/store/threads/actions'
import { ThreadsState } from '@/store/threads/types'
import { RootState } from '@/store/types'

jest.mock('../../../lib/api/firebase')

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
      const endThread = bindToStore(actions.endThread, store)

      expect.assertions(4)

      endThread(actionContext, TEST_ID).then(() => {
        const mockCommitArgs = mockCommit.mock.calls[0]

        expect(mockCommit).toBeCalledTimes(1)
        expect(mockCommitArgs[0]).toEqual('modifyThread')
        expect(mockCommitArgs[1]).toHaveProperty('id', TEST_ID)
        expect(mockCommitArgs[1]).toHaveProperty('partialThread')
      })
    })
  })

  describe('endActiveThread', () => {
    it('triggers endThread action', () => {
      const endActiveThread = bindToStore(actions.endActiveThread, store)

      endActiveThread(actionContext)

      const mockDispatchArgs = mockDispatch.mock.calls[0]

      expect(mockDispatch).toBeCalledTimes(1)
      expect(mockDispatchArgs[0]).toEqual('endThread')
      expect(mockDispatchArgs[1]).toEqual(TEST_ID)
    })
  })
})
