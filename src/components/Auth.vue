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

import Spinner from '@/components/Spinner.vue'
import Welcome from '@/components/Welcome.vue'
import { RootState } from '@/store/types'

export default Vue.extend({
  name: 'Auth',

  components: {
    Welcome,
    Spinner,
  },

  computed: {
    ...mapState({
      isLoggedIn(state: RootState): boolean {
        if (!state.auth) return false

        return state.auth.userId !== null
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
