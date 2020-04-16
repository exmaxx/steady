<template>
  <div>
    <button
      v-if="!isAnyThreadActive"
      class="pure-button pure-button-primary"
      @click="startThread"
    >
      Start
    </button>

    <experiences v-if="isAnyThreadActive" with-add-button />

    <div v-if="isAnyThreadActive">Started: {{ startDate | formatDate }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Experiences from '@/components/Experiences.vue'
import { mapActions, mapGetters } from 'vuex'

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
