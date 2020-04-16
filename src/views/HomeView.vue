<template>
  <div class="flex-centered-column">
    <button
      v-if="!isAnyThreadActive"
      class="pure-button pure-button-primary"
      @click="startThread"
    >
      Start
    </button>

    <experiences v-if="isAnyThreadActive" with-add-button />

    <div v-if="isAnyThreadActive">
      <h2>Started: {{ startDate | formatDateAndTime }}</h2>
    </div>
  </div>
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
    ...mapGetters(['getActiveThread']),

    isAnyThreadActive(): boolean {
      return this.getActiveThread
    },

    startDate(): string {
      return this.getActiveThread?.startDatetime || ''
    },
  },

  methods: {
    ...mapActions(['startThread']),
  },
})
</script>

<style lang="scss"></style>
