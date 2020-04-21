<template>
  <with-menu-layout>
    <div class="activities ">
      <tag v-for="activity in activities" :key="activity" :title="activity" />
    </div>
  </with-menu-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import Tag from '@/components/Tag.vue'

export default Vue.extend({
  name: 'ActivitiesView',

  components: {
    Tag,
  },

  computed: {
    ...mapState(['activities']),
  },
})
</script>

<style lang="scss" scoped>
.activities {
  width: 40rem;
  padding: 1rem;
  margin: auto;
}

.activity {
  margin: 0.5rem;
}
</style>
