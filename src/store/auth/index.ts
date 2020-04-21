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
    login: (state, userId: string) => (state.userId = userId),

    logout: state => (state.userId = null),

    updateLoginStatus: (state, status: ApiStatus) =>
      (state.loginStatus = status),
  },

  actions: {
    /**
     * Triggers login process. See `registerLoginHook` where processing after login happens.
     * @param commit
     */
    attemptLogin: ({ commit }) => {
      commit('updateLoginStatus', 'working')

      return Auth.signIn().catch(() => commit('updateLoginStatus', 'error'))
    },

    /**
     * Triggers logout process. See `registerLoginHook` where processing after login happens.
     * @param commit
     */
    attemptLogout: ({ commit }) => {
      commit('updateLoginStatus', 'working')

      return Auth.signOut().catch(() => commit('updateLoginStatus', 'error'))
    },

    /**
     * Registers hooks that run after login, logout and error.
     * When signed in by Google Account this also handles automatic login (after page refresh, etc.).
     * @param commit
     * @param dispatch
     */
    registerLoginHook: ({ commit, dispatch }) =>
      Auth.onStatusChange({
        onLogin: user => {
          commit('login', user.uid)

          Firebase.getUser()
            .then(() => {
              commit('updateLoginStatus', 'idle')

              // TODO: Load only active thread and emotions connected to it.
              dispatch('fetchAll').then(() => {
                // TODO: Update 'sync' status.
                console.log('All loaded ;)')
              })
            })
            .catch(error => {
              if (error.message === NO_USER_DOC_ERROR) {
                Firebase.postUser().then(() =>
                  // TODO: Load only active thread and emotions connected to it.
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
          commit('logout')
          commit('updateLoginStatus', 'idle')
        },

        onError: error => {
          commit('logout')
          commit('updateLoginStatus', 'error')

          console.error('Error while checking login status:', error)
        },
      }),
  },
}

export default authModule
