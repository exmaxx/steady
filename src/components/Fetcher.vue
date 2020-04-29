<template>
  <div class="content">
    <span v-if="isDataLoading" class="spinner"><spinner /></span>
    <slot v-else />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import { RootState } from '@/store/types'

export default Vue.extend({
  name: 'Fetcher',

  computed: {
    ...mapState({
      userId: (state: RootState) => state.auth?.userId,

      isDataLoading(state: RootState): boolean {
        if (!state.statuses) return true

        const areExperiencesLoading = state.statuses.experiences === 'working'
        const areEmotionLoading = state.statuses.emotions === 'working'
        const areActivitesLoading = state.statuses.activities === 'working'

        return areExperiencesLoading || areEmotionLoading || areActivitesLoading
      },
    }),
  },

  created() {
    this.$store.dispatch('fetchAll')
  },
})
</script>

<style lang="scss" scoped>
.spinner {
  margin: 2em;
  position: fixed;
  right: 0;
  top: 0;
}
</style>
