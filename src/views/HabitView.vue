<template>
  <with-menu-layout v-if="habit">
    <div class="habit">
      <!-- TODO: Two headers? Come on... -->
      <h1 class="mobile-only">Habit: {{ habit.name }}</h1>
      <h2>Habit: {{ habit.name }}</h2>

      <router-link
        :to="{ name: 'add-experience' }"
        class="pure-button pure-button-primary"
      >
        <i class="fas fa-plus"></i>
        Add experience
      </router-link>

      <!-- TODO: Select by habit. -->
      <experiences :experiences="experiences" />
    </div>
  </with-menu-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'

import Experiences from '@/components/Experiences.vue'

export default Vue.extend({
  name: 'ExperiencesView',

  components: {
    Experiences,
  },

  computed: {
    ...mapGetters(['findHabitById']),
    ...mapState(['experiences']),

    habit() {
      return this.findHabitById(this.$route.params.id)
    },
  },

  beforeCreate() {
    const { $store, $route, $router } = this

    if (!$store.getters.findHabitById($route.params.id)) {
      $router.replace({ name: 'not-found' })
    }
  },
})
</script>

<style lang="scss" scoped>
@import 'src/mixins';

.habit {
  @include flex-centered-column;
}
</style>
