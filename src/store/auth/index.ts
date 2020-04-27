import { Module } from 'vuex'

import Auth from '@/lib/api/auth'
import Firebase from '@/lib/api/firebase'
import { ApiStatus } from '@/lib/api/types'
import { NO_USER_DOC_ERROR } from '@/lib/constants'
import { AuthState } from '@/store/auth/types'
import { RootState } from '@/store/types'

const authModule: Module<AuthState, RootState> = {
  state: {
    userId: null,
    loginStatus: 'working',
  },

  mutations: {
    LOGIN: (state, userId: string) => (state.userId = userId),

    LOGOUT: (state) => (state.userId = null),

    UPDATE_LOGIN_STATUS: (state, status: ApiStatus) =>
      (state.loginStatus = status),
  },

  actions: {
    /**
     * Triggers login process. See `registerLoginHook` where processing after login happens.
     * @param commit
     */
    attemptLogin: ({ commit }) => {
      commit('UPDATE_LOGIN_STATUS', 'working')

      return Auth.signIn().catch(() => commit('UPDATE_LOGIN_STATUS', 'error'))
    },

    /**
     * Triggers logout process. See `registerLoginHook` where processing after login happens.
     * @param commit
     */
    attemptLogout: ({ commit }) => {
      commit('UPDATE_LOGIN_STATUS', 'working')

      return Auth.signOut().catch(() => commit('UPDATE_LOGIN_STATUS', 'error'))
    },

    /**
     * Registers hooks that run after login, logout and error.
     * When signed in by Google Account this also handles automatic login (after page refresh, etc.).
     * @param commit
     * @param dispatch
     */
    registerLoginHook: ({ commit, dispatch }) =>
      Auth.onStatusChange({
        onLogin: (user) => {
          commit('LOGIN', user.uid)

          Firebase.getUser()
            .then(() => {
              commit('UPDATE_LOGIN_STATUS', 'idle')

              dispatch('fetchAll').then(() => {
                // TODO: Update 'sync' status.
                console.log('All loaded ;)')
              })
            })
            .catch((error) => {
              if (error.message === NO_USER_DOC_ERROR) {
                Firebase.postUser().then(() =>
                  dispatch('fetchAll').then(() => {
                    // TODO: Update 'sync' status.
                    console.log('All loaded ;)')
                  })
                )
              } else {
                console.error(error)
              }
            })
        },

        onLogout: () => {
          commit('LOGOUT')
          commit('UPDATE_LOGIN_STATUS', 'idle')
        },

        onError: (error) => {
          commit('LOGOUT')
          commit('UPDATE_LOGIN_STATUS', 'error')

          console.error('Error while checking login status:', error)
        },
      }),
  },
}

export default authModule
