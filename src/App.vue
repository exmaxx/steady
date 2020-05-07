<template>
  <div id="app">
    <auth>
      <fetcher>
        <router-view />
      </fetcher>
    </auth>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

import Auth from '@/components/Auth.vue'
import Fetcher from '@/components/Fetcher.vue'

export default Vue.extend({
  components: {
    Auth,
    Fetcher,
  },

  methods: {
    ...mapActions(['attemptLogout']),
  },
})
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
}
</style>
