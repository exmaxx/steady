<template>
  <with-menu-layout v-if="habit">
    <div class="habit">
      <!-- TODO: Two headers? Come on... -->
      <h1 class="mobile-only">Habit: {{ habit.name }}</h1>
      <h2>{{ habit.name }}</h2>

      <router-link
        :to="{
          name: 'add-experience',
          params: { habitId: $route.params.habitId },
        }"
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
import { mapGetters } from 'vuex'

import Experiences from '@/components/Experiences.vue'
import { Experience } from '@/store/experiences/types'
import { Habit } from '@/store/habits/types'

export default Vue.extend({
  name: 'ExperiencesView',

  components: {
    Experiences,
  },

  computed: {
    ...mapGetters(['findHabitById', 'findExperienceById']),

    habit(): Habit {
      console.log('this.$route.params:', this.$route.params)
      console.log(
        'this.findHabitById(this.$route.params.habitId):',
        this.findHabitById(this.$route.params.habitId)
      )

      return this.findHabitById(this.$route.params.habitId)
    },

    experiences(): Experience[] {
      return this.habit.experienceIds
        .map(
          (id): Experience => {
            console.log(id)
            console.log(
              'this.findExperienceById(id):',
              this.findExperienceById(id)
            )
            return this.findExperienceById(id)
          }
        )
        .sort((expA, expB) => (expA.datetime > expB.datetime ? -1 : 1))
    },
  },

  beforeCreate() {
    const { $store, $route, $router } = this

    if (!$store.getters.findHabitById($route.params.habitId)) {
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
