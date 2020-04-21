<template>
  <div id="app">
    <auth>
      <router-view />
    </auth>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

import Auth from '@/components/Auth.vue'

export default Vue.extend({
  components: {
    Auth,
  },

  methods: {
    ...mapActions(['attemptLogout']),
  },
})
</script>

<style lang="scss" scoped></style>
