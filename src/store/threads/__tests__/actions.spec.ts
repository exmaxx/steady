import { ActionContext, ActionHandler } from 'vuex'

import store from '@/store'
import actions from '@/store/threads/actions'
import { ThreadsState } from '@/store/threads/types'
import { RootState } from '@/store/types'

describe('THREADS ACTIONS', () => {
  describe('endThread', () => {
    it('triggers modifyThread', () => {
      const endThread = actions.endThread as ActionHandler<
        ThreadsState,
        RootState
      >

      const endThreadBound = endThread.bind(store)

      const actionContext: ActionContext<ThreadsState, RootState> = {
        dispatch: jest.fn(),
        commit: jest.fn(),
        state: [],
        getters: {},
        rootState: store.state,
        rootGetters: {},
      }

      endThreadBound(actionContext, 'testId')

      expect(actionContext.commit).toBeCalledTimes(1)

      const mockCallArgs = (actionContext.commit as jest.Mock).mock.calls[0]

      expect(mockCallArgs[0]).toEqual('modifyThread')
      expect(mockCallArgs[1]).toHaveProperty('id', 'testId')
    })
  })
})
