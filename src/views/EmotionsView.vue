<template>
  <with-menu-layout>
    <h1>Emotions</h1>

    <div class="emotions ">
      <tag v-for="emotion in emotions" :key="emotion" :title="emotion" />
    </div>
  </with-menu-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import Tag from '@/components/Tag.vue'

export default Vue.extend({
  name: 'ThreadsView',

  components: {
    Tag,
  },

  computed: {
    ...mapState(['emotions']),
  },
})
</script>

<style lang="scss" scoped>
.emotions {
  max-width: 40rem;
  padding: 1rem;
  margin: auto;
}

.emotion {
  margin: 0.5rem;
}
</style>
