<template>
  <div class="threads">
    <div v-for="thread in threadsDetailed" class="thread">
      <div class="duration">
        {{ thread.duration }} dnů
        <span v-if="!thread.endDatetime"> (aktivní)</span>
      </div>

      <div>
        {{ thread.startDatetime | formatDate }} -
        <span v-if="thread.endDatetime">{{
          thread.endDatetime | formatDate
        }}</span>
        <span v-else>teď</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'
import { mapState } from 'vuex'

import { Thread } from '@/store/threads/types'

interface ThreadDetailed {
  startDatetime: string
  endDatetime: string
  duration: number
  experiences: number
  uniqueActivities: number
  uniqueEmotions: number
}

export default Vue.extend({
  name: 'ThreadsView',

  computed: {
    ...mapState(['threads']),

    threadsDetailed(): ThreadDetailed[] {
      const calcThreadDetails = (thread: Thread): ThreadDetailed => {
        const { startDatetime, endDatetime } = thread

        const duration = endDatetime
          ? dayjs(endDatetime).diff(dayjs(startDatetime), 'day')
          : 0

        return {
          startDatetime,
          endDatetime,
          duration,
          experiences: 0, // TODO: TBD
          uniqueActivities: 0, // TODO: TBD
          uniqueEmotions: 0, // TODO: TBD
        }
      }

      return this.threads.map(calcThreadDetails)
    },
  },
})
</script>

<style lang="scss" scoped>
.threads {
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin: 0.5em 0;

    &:first-child {
      margin: 1em 0 0.5em 0;
    }
  }

  .thread {
    border: 1px solid #acacac;
    box-sizing: border-box;
    border-radius: 0.5rem;
    padding: 1.5rem;
    width: 30rem;

    .duration {
      font-weight: bold;
      font-size: 1.2em;
    }
  }
}
</style>
