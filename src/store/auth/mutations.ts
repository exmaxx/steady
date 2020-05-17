import { MutationTree } from 'vuex'

import { ApiStatus } from '@/lib/api/types'
import { AuthState } from '@/store/auth/types'

export const LOGIN = '👍 Login'
export const LOGOUT = '🚪 Logout'
export const UPDATE_LOGIN_STATUS = '🚦 Update Login Status'

const mutations: MutationTree<AuthState> = {
  [LOGIN]: (state, userId: string) => (state.userId = userId),

  [LOGOUT]: (state) => (state.userId = null),

  [UPDATE_LOGIN_STATUS]: (state, status: ApiStatus) =>
    (state.loginStatus = status),
}

export default mutations
