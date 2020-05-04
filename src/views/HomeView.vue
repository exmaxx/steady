<template>
  <plain-layout>
    <div v-if="habitsSortedByName.length > 0" class="home">
      <h2>Habits</h2>
      <div class="habits">
        <router-link
          v-for="habit in habitsSortedByName"
          :key="habit.id"
          :to="{ name: 'habit', params: { habitId: habit.id } }"
          class="habit pure-button"
        >
          {{ habit.name }}
        </router-link>
      </div>
    </div>
  </plain-layout>
</template>

<script lang="ts">
import { isEmpty } from 'lodash'
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'HomeView',

  computed: {
    ...mapGetters(['habitsSortedByName']),
  },

  beforeCreate() {
    const { $store, $router } = this

    if (isEmpty($store.state.habits)) {
      $router.replace({ name: 'add-habit' })
    }
  },
})
</script>

<style lang="scss">
@import 'src/mixins';
@import 'src/constants';

.home {
  @include flex-centered-column;

  .habits {
    @include flex-centered-column;

    .habit {
      width: 100%;
      margin: 0.5rem;
      font-size: 150%;
    }
  }
}
</style>
