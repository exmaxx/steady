<template>
  <div class="auth">
    <slot v-if="isLoggedIn"></slot>

    <div v-else class="not-logged-in">
      <div class="welcome">Welcome to <strong>Steady</strong>.</div>

      <div>
        <i
          v-if="isCheckingStatus"
          class="fas fa-circle-notch fa-spin fa-2x"
        ></i>

        <button
          v-else
          class="pure-button pure-button-primary"
          @click="attemptLogin"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

import { RootState } from '@/store/types'

export default Vue.extend({
  name: 'Auth',

  computed: {
    ...mapState({ auth: state => (state as RootState).auth }),

    isLoggedIn(): boolean {
      return (this.auth && this.auth.userId !== null) || false
    },

    isCheckingStatus(): boolean {
      return (this.auth && this.auth.loginStatus === 'working') || false
    },
  },

  mounted(): void {
    this.registerLoginHook()
  },

  methods: {
    ...mapActions(['attemptLogin', 'registerLoginHook']),
  },
})
</script>

<style lang="scss" scoped>
.not-logged-in {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 35vh;

  .welcome {
    margin: 0.7em;
  }
}
</style>
