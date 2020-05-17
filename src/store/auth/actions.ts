import { ActionTree } from 'vuex'

import Auth, { AuthError } from '@/lib/api/auth'
import Firebase from '@/lib/api/firebase'
import { NO_USER_DOC_ERROR } from '@/lib/constants'
import { LOGIN, LOGOUT, UPDATE_LOGIN_STATUS } from '@/store/auth/mutations'
import { AuthState } from '@/store/auth/types'
import { RootState } from '@/store/types'

const actions: ActionTree<AuthState, RootState> = {
  /**
   * Triggers login process. See `registerLoginHook` where processing after login happens.
   * @param commit
   */
  attemptLogin: ({ commit }) => {
    commit(UPDATE_LOGIN_STATUS, 'working')

    return Auth.signIn().catch(() => commit(UPDATE_LOGIN_STATUS, 'error'))
  },

  /**
   * Triggers logout process. See `registerLoginHook` where processing after login happens.
   * @param commit
   */
  attemptLogout: ({ commit }) => {
    commit(UPDATE_LOGIN_STATUS, 'working')

    return Auth.signOut().catch(() => commit(UPDATE_LOGIN_STATUS, 'error'))
  },

  /**
   * Runs after successful firebase login.
   *
   * @param commit
   * @param userId
   */
  finalizeLogin: ({ commit }, userId: string) => {
    commit(LOGIN, userId)

    return Firebase.getUserData()
      .then(() => {
        // TODO: Sync status to statuses module.
        commit(UPDATE_LOGIN_STATUS, 'finished')
      })
      .catch((error) => {
        if (error.message === NO_USER_DOC_ERROR) {
          Firebase.setUserData().then(() =>
            // TODO: Sync status to statuses module.
            commit(UPDATE_LOGIN_STATUS, 'finished')
          )
        } else {
          console.error(error)
        }
      })
  },

  /**
   * Runs after successful firebase logout.
   *
   * @param commit
   * @param userId
   */
  finalizeLogout: ({ commit }) => {
    commit(LOGOUT)
    commit(UPDATE_LOGIN_STATUS, 'idle')
  },

  /**
   * Cleans up after an error during firebase login / logout.
   *
   * @param commit
   * @param error
   */
  finalizeError: ({ commit }, error: AuthError) => {
    commit(LOGOUT)
    commit(UPDATE_LOGIN_STATUS, 'error')

    console.error('Error while checking login status:', error)
  },

  /**
   * Registers hooks that run after login, logout and error.
   * When signed in by Google Account this also handles automatic login (after page refresh, etc.).
   * @param commit
   * @param dispatch
   */
  registerLoginHook: ({ dispatch }) =>
    Auth.onStatusChange({
      onLogin: (user) => dispatch('finalizeLogin', user.uid),
      onLogout: () => dispatch('finalizeLogout'),
      onError: (error) => dispatch('finalizeError', error),
    }),
}

export default actions
