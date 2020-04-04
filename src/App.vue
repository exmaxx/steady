<template>
  <div id="app">
    <AddExperience />
    <Experiences />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import AddExperience from '@/components/AddExperience.vue'
import Experiences from '@/components/Experiences.vue'

export default Vue.extend({
  components: {
    Experiences,
    AddExperience,
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

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
