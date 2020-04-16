<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted(): void {
    this.$store.dispatch('fetchEmotions')
    this.$store.dispatch('fetchActivities')
    this.$store.dispatch('fetchExperiences')
    this.$store.dispatch('fetchThreads')
  },
})
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
