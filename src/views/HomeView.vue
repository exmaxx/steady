<template>
  <with-menu-layout>
    <h1>Active Thread</h1>

    <div class="home">
      <template v-if="!isAnyThreadActive">
        <button class="pure-button pure-button-primary" @click="startThread">
          Start thread
        </button>

        <div class="info">
          Every <strong>thread</strong> helps you track your progress and your
          <strong>experiences</strong>. You track what helps you overcome
          <strong>troubles</strong> and
          <strong>positive situations</strong> what makes you relapse to and old
          habit.
        </div>
      </template>

      <template>
        <router-link
          :to="{ name: 'add-experience' }"
          class="pure-button pure-button-primary"
        >
          <i class="fas fa-plus"></i>
          Add experience
        </router-link>

        <experiences
          v-if="isAnyThreadActive"
          :experiences="activeThreadExperiences"
          with-add-button
        />

        <div v-if="isAnyThreadActive">
          <h2>Started: {{ startDate | formatDateAndTime }}</h2>
        </div>
      </template>
    </div>
  </with-menu-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

import Experiences from '@/components/Experiences.vue'

export default Vue.extend({
  name: 'HomeView',

  components: {
    Experiences,
  },

  computed: {
    ...mapGetters(['activeThread', 'activeThreadExperiences']),

    isAnyThreadActive(): boolean {
      return this.activeThread
    },

    startDate(): string {
      return this.activeThread?.startDatetime || ''
    },
  },

  methods: {
    ...mapActions(['startThread']),
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
