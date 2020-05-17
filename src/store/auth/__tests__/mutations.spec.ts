import { ApiStatus } from '@/lib/api/types'
import mutations, {
  LOGIN,
  LOGOUT,
  UPDATE_LOGIN_STATUS,
} from '@/store/auth/mutations'
import authState from '@/store/auth/state'
import { AuthState } from '@/store/auth/types'

describe('Auth Module - mutations', () => {
  let state: AuthState

  beforeEach(() => {
    state = { ...authState }
  })

  describe('LOGIN', () => {
    it('sets user id', () => {
      const userId = 'USeRiD'

      mutations[LOGIN](state, userId)

      expect(state.userId).toEqual(userId)
    })
  })

  describe('LOGOUT', () => {
    it('sets user id to null', () => {
      mutations[LOGOUT](state)

      expect(state.userId).toBeNull()
    })
  })

  describe('UPDATE_LOGIN_STATUS', () => {
    it('changes login status', () => {
      const apiStatus: ApiStatus = 'finished'

      mutations[UPDATE_LOGIN_STATUS](state, apiStatus)

      expect(state.loginStatus).toEqual(apiStatus)
    })
  })
})
