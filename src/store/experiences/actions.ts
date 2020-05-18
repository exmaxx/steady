import { ActionTree } from 'vuex'

import Firebase from '@/lib/api/firebase'
import {
  ADD_EXPERIENCE,
  UPDATE_EXPERIENCE,
} from '@/store/experiences/mutations'
import { Experience, ExperiencesState } from '@/store/experiences/types'
import WithTracker from '@/store/helpers/with-tracker'
import { RootState } from '@/store/types'

const actions: ActionTree<ExperiencesState, RootState> = {
  fetchExperiences: ({ commit }) => {
    const withTracker = new WithTracker('experiences', commit)

    const promise = Firebase.getExperiences().then((experiences) =>
      experiences.forEach((experience) => commit(ADD_EXPERIENCE, experience))
    )

    return withTracker.runPromise(promise)
  },

  createExperience: (
    { commit },
    experience: Experience
  ): Promise<string | void> =>
    Firebase.setExperience(experience)
      .catch((error) =>
        console.error('Error in action createExperience.', error)
      )
      .then((id) => {
        commit(ADD_EXPERIENCE, { ...experience, id })
        return id
      }),

  overwriteExperience: (
    { commit },
    experience: Experience
  ): Promise<string | void> => {
    if (!experience.id)
      throw new Error('Experience must have an id when updating.')

    return Firebase.setExperience(experience)
      .catch((error) =>
        console.error('Error in action createOrOverwriteExperience.', error)
      )
      .then((id) => {
        commit(UPDATE_EXPERIENCE, { ...experience })
        return id
      })
  },
}

export default actions
