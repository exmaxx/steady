<template>
  <with-menu-layout>
    <h1>Emotions</h1>

    <div class="emotions">
      <spinner v-if="areEmotionsLoading" />

      <tag v-for="emotion in emotions" :key="emotion" :title="emotion" />
    </div>
  </with-menu-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import Tag from '@/components/Tag.vue'
import { RootState } from '@/store/types'

export default Vue.extend({
  name: 'EmotionsView',

  components: {
    Tag,
  },

  computed: {
    ...mapState({
      emotions: (state: RootState) => state.emotions,

      areEmotionsLoading(state: RootState): boolean {
        if (!state.statuses) return true

        return state.statuses.experiences === 'working'
      },
    }),
  },
})
</script>

<style lang="scss" scoped>
@import 'src/constants';

.emotions {
  max-width: 40rem;
  padding: 1rem;
  margin: auto;
  text-align: center;
}
</style>
