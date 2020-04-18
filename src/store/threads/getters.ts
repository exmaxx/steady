import dayjs from 'dayjs'
import { GetterTree } from 'vuex'

import { Experience } from '@/store/experiences/types'
import {
  ExperiencesForThreads,
  Thread,
  ThreadsState,
} from '@/store/threads/types'
import { RootState } from '@/store/types'

const getters: GetterTree<ThreadsState, RootState> = {
  activeThread: (state): Thread | null =>
    state.find(thread => thread.endDatetime === '') || null,

  activeThreadExperiences: (state, getters): Experience[] => {
    const activeThread = getters.activeThread

    if (!activeThread || !activeThread.id) return []

    return getters.experiencesByThreads[activeThread.id] || []
  },

  // TODO: Is it good idea for this to be a getter? It reacalculates
  //  after every change of rootstate (when experiencesByThreads is called).
  //  Meaning also after adding new activity or emotion.
  experiencesByThreads: (state, getters, rootState): ExperiencesForThreads => {
    if (state.length <= 0) return {}
    if (!rootState.experiences || rootState.experiences.length <= 0) return {}

    const findThreadFor = (experience: Experience) =>
      state.find(thread => {
        const { startDatetime, endDatetime } = thread
        const endTimeOrNow = endDatetime || dayjs().toISOString()

        return (
          startDatetime.localeCompare(experience.datetime) <= 0 &&
          endTimeOrNow.localeCompare(experience.datetime) >= 0
        )
      })

    const result = rootState.experiences.reduce(
      (results: ExperiencesForThreads, experience) => {
        const thread = findThreadFor(experience)

        if (!thread) {
          console.error(
            'No thread for experience. Experience id: ',
            experience.id,
            ', time:',
            experience.datetime
          )
          return results
        }

        if (thread.id) {
          if (!results[thread.id]) {
            results[thread.id] = []
          }

          results[thread.id].push(experience)
        }

        return results
      },
      {}
    )

    return result || {}
  },
}

export default getters
