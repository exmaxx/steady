<template>
  <div id="app">
    <nav class="pure-menu custom-restricted-width">
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <router-link :to="{ name: 'home' }" class="pure-menu-link">
            Home
          </router-link>
        </li>

        <li class="pure-menu-item">
          <router-link :to="{ name: 'threads' }" class="pure-menu-link">
            Threads
          </router-link>
        </li>

        <li class="pure-menu-item">
          <router-link :to="{ name: 'experiences' }" class="pure-menu-link">
            Experiences
          </router-link>
        </li>

        <li class="pure-menu-item">
          <router-link :to="{ name: 'activities' }" class="pure-menu-link">
            Activities
          </router-link>
        </li>

        <li class="pure-menu-item">
          <router-link :to="{ name: 'emotions' }" class="pure-menu-link">
            Emotions
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted(): void {
    // TODO: Load only active thread and emotions connected to it.
    this.$store.dispatch('fetchEmotions')
    this.$store.dispatch('fetchActivities')
    this.$store.dispatch('fetchExperiences')
    this.$store.dispatch('fetchThreads')
  },
})
</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  padding: 2rem;

  &.custom-restricted-width {
    /* To limit the menu width to the content of the menu: */
    display: inline-block;
    /* Or set the width explicitly: */
    /* width: 10em;*/
  }

  a {
    font-weight: bold;
    color: #acacac;

    &.router-link-exact-active {
      color: #0078e7;
    }
  }

  ul {
    list-style: none;
  }
}

.content {
  margin-left: 12em;
}
</style>
