<template>
  <with-menu-layout>
    <div class="home">
      <template>
        <router-link
          :to="{ name: 'add-experience' }"
          class="pure-button pure-button-primary"
        >
          <i class="fas fa-plus"></i>
          Add experience
        </router-link>

        <experiences :experiences="experiences" with-add-button />
      </template>
    </div>
  </with-menu-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import Experiences from '@/components/Experiences.vue'

export default Vue.extend({
  name: 'HomeView',

  components: {
    Experiences,
  },

  computed: {
    ...mapState(['experiences']),
  },
})
</script>

<style lang="scss">
@import 'src/mixins';

.home {
  @include flex-centered-column;
}

.info {
  margin: 2rem;
  width: 30rem;

  & + .info {
    margin-top: 0;
  }
}
</style>
