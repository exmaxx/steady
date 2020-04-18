<template>
  <experiences :experiences="experiences" />
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import Experiences from '@/components/Experiences.vue'

export default Vue.extend({
  name: 'ExperiencesView',

  components: {
    Experiences,
  },

  computed: {
    ...mapState(['experiences']),
  },
})
</script>

<style lang="scss" scoped></style>
