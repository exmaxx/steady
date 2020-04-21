<template>
  <div class="experiences flex-centered-column">
    <experience
      v-for="experience in experiences"
      :key="experience.id"
      :experience="experience"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Experience from '@/components/Experience.vue'

export default Vue.extend({
  name: 'Experiences',

  components: {
    Experience,
  },

  props: {
    experiences: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.experiences {
  > * {
    margin: 0.5em 0;

    &:first-child {
      margin: 1em 0 0.5em 0;
    }
  }
}
</style>
