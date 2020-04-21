<template>
  <div id="app">
    <auth>
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

          <li class="pure-menu-separator"></li>

          <li class="pure-menu-item">
            <a href="#" class="pure-menu-link" @click.prevent="attemptLogout"
              >Logout</a
            >
          </li>
        </ul>
      </nav>

      <div class="content">
        <router-view />
      </div>
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

::v-deep .content {
  padding: 3em;
}
</style>
