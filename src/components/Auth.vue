<template>
  <div class="auth">
    <welcome v-if="!isLoggedIn">
      <spinner v-if="isAttemptingLogin" />

      <button
        v-else
        class="pure-button pure-button-primary"
        @click="attemptLogin"
      >
        Login
      </button>
    </welcome>

    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

import Welcome from '@/components/Welcome.vue'
import { RootState } from '@/store/types'

export default Vue.extend({
  name: 'Auth',

  components: {
    Welcome,
  },

  computed: {
    ...mapState({
      isLoggedIn(state: RootState): boolean {
        if (!state.auth) return false

        const { userId, loginStatus } = state.auth

        return userId !== null && loginStatus === 'finished'
      },

      isAttemptingLogin(state: RootState): boolean {
        if (!state.auth) return true

        return state.auth.loginStatus === 'working'
      },
    }),
  },

  mounted(): void {
    this.registerLoginHook()
  },

  methods: {
    ...mapActions(['attemptLogin', 'registerLoginHook']),
  },
})
</script>

<style lang="scss" scoped></style>
