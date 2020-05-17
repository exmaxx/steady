import { ActionContext, ActionHandler, Store } from 'vuex'

import Auth from '@/lib/api/auth'
import Firebase from '@/lib/api/firebase'
import { NO_USER_DOC_ERROR } from '@/lib/constants'
import { disableConsoleErrors, enableConsoleErrors } from '@/lib/test-helpers'
import actions from '@/store/auth/actions'
import { LOGIN, LOGOUT, UPDATE_LOGIN_STATUS } from '@/store/auth/mutations'
import { AuthState, User } from '@/store/auth/types'
import { RootState } from '@/store/types'

jest.mock('@/lib/api/auth', () => {
  return {
    __esModule: true,
    default: {
      signIn: jest.fn(() => Promise.resolve()),
      signOut: jest.fn(() => Promise.resolve()),
      onStatusChange: jest.fn(),
    },
  }
})

jest.mock('@/lib/api/firebase', () => {
  return {
    __esModule: true,
    default: {
      getUserData: jest.fn(() => Promise.resolve({} as User)),
      setUserData: jest.fn(() => Promise.resolve()),
    },
  }
})

describe('Auth Module - actions', () => {
  // NOTE: Kind of hacky but the test works with Typescript.
  const emptyStoreMock = {} as Store<RootState>
  const contextMock = {} as ActionContext<AuthState, RootState>

  contextMock.commit = jest.fn()
  contextMock.dispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('attemptLogin', () => {
    const attemptLogin = (actions.attemptLogin as ActionHandler<
      AuthState,
      RootState
    >).bind(emptyStoreMock)

    it('sets status to working', () => {
      attemptLogin(contextMock)

      expect(contextMock.commit).toHaveBeenCalledTimes(1)
      expect(contextMock.commit).toHaveBeenCalledWith(
        UPDATE_LOGIN_STATUS,
        'working'
      )
    })

    it('calls firebase auth sign in', () => {
      attemptLogin(contextMock)

      expect(Auth.signIn).toHaveBeenCalledTimes(1)
    })
  })

  describe('attemptLogout', () => {
    const attemptLogout = (actions.attemptLogout as ActionHandler<
      AuthState,
      RootState
    >).bind(emptyStoreMock)

    it('sets status to working', () => {
      attemptLogout(contextMock)

      expect(contextMock.commit).toHaveBeenCalledTimes(1)
      expect(contextMock.commit).toHaveBeenCalledWith(
        UPDATE_LOGIN_STATUS,
        'working'
      )
    })

    it('calls firebase auth sign out', () => {
      attemptLogout(contextMock)

      expect(Auth.signOut).toHaveBeenCalledTimes(1)
    })
  })

  describe('finalizeLogin', () => {
    const finalizeLogin = (actions.finalizeLogin as ActionHandler<
      AuthState,
      RootState
    >).bind(emptyStoreMock)

    it('saves user id', () => {
      const sampleUserId = 'sAmPle'

      finalizeLogin(contextMock, sampleUserId)

      expect(contextMock.commit).toHaveBeenCalledTimes(1)
      expect(contextMock.commit).toHaveBeenCalledWith(LOGIN, sampleUserId)
    })

    it('check whether user exists in DB', async () => {
      await finalizeLogin(contextMock)

      expect(Firebase.getUserData).toHaveBeenCalledTimes(1)
    })

    it('sets status to finished', async () => {
      await finalizeLogin(contextMock)

      expect(contextMock.commit).toHaveBeenCalledTimes(2)
      expect(contextMock.commit).toHaveBeenNthCalledWith(
        2,
        UPDATE_LOGIN_STATUS,
        'finished'
      )
    })

    describe('when no user in DB', () => {
      beforeEach(() => {
        Firebase.getUserData = jest.fn(() =>
          Promise.reject(new Error(NO_USER_DOC_ERROR))
        )
      })

      afterEach(() => {
        Firebase.getUserData = jest.fn(() => Promise.resolve({} as User))
      })

      it('creates user in DB', async () => {
        await finalizeLogin(contextMock)

        expect(Firebase.getUserData).toHaveBeenCalledTimes(1)
        expect(Firebase.setUserData).toHaveBeenCalledTimes(1)
      })

      it('sets status to finished', async () => {
        await finalizeLogin(contextMock)

        expect(contextMock.commit).toHaveBeenCalledTimes(2)
        expect(contextMock.commit).toHaveBeenNthCalledWith(
          2,
          UPDATE_LOGIN_STATUS,
          'finished'
        )
      })
    })
  })

  describe('finalizeLogout', () => {
    const finalizeLogout = (actions.finalizeLogout as ActionHandler<
      AuthState,
      RootState
    >).bind(emptyStoreMock)

    it('saves resets user id', () => {
      finalizeLogout(contextMock)

      expect(contextMock.commit).toHaveBeenCalledTimes(2)
      expect(contextMock.commit).toHaveBeenNthCalledWith(1, LOGOUT)
    })

    it('sets status to idle', () => {
      finalizeLogout(contextMock)

      expect(contextMock.commit).toHaveBeenCalledTimes(2)
      expect(contextMock.commit).toHaveBeenNthCalledWith(
        2,
        UPDATE_LOGIN_STATUS,
        'idle'
      )
    })
  })

  describe('finalizeError', () => {
    const finalizeError = (actions.finalizeError as ActionHandler<
      AuthState,
      RootState
    >).bind(emptyStoreMock)

    it('saves resets user id', () => {
      disableConsoleErrors()
      finalizeError(contextMock)
      enableConsoleErrors()

      expect(contextMock.commit).toHaveBeenCalledTimes(2)
      expect(contextMock.commit).toHaveBeenNthCalledWith(1, LOGOUT)
    })

    it('sets status to error', () => {
      disableConsoleErrors()
      finalizeError(contextMock)
      enableConsoleErrors()

      expect(contextMock.commit).toHaveBeenCalledTimes(2)
      expect(contextMock.commit).toHaveBeenNthCalledWith(
        2,
        UPDATE_LOGIN_STATUS,
        'error'
      )
    })

    it('logs error to console', () => {
      const spyConsoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => null)

      finalizeError(contextMock)

      expect(spyConsoleError).toHaveBeenCalledTimes(1)

      spyConsoleError.mockRestore()
    })
  })

  describe('registerLoginHook', () => {
    const registerLoginHook = (actions.registerLoginHook as ActionHandler<
      AuthState,
      RootState
    >).bind(emptyStoreMock)

    it("calls firebase auth's onStatusChange", () => {
      registerLoginHook(contextMock)

      expect(Auth.onStatusChange).toHaveBeenCalledTimes(1)
    })

    it('sets login, logout and error handlers', () => {
      registerLoginHook(contextMock)

      const executedCall = (Auth.onStatusChange as jest.Mock).mock.calls[0]
      const calledArgs = executedCall[0]

      expect(Object.keys(calledArgs)).toEqual([
        'onLogin',
        'onLogout',
        'onError',
      ])
    })
  })
})
