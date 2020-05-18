import { ActionTree } from 'vuex'

import Firebase from '@/lib/api/firebase'
import { SET_HABIT } from '@/store/habits/mutations'
import { Habit, HabitsState } from '@/store/habits/types'
import WithTracker from '@/store/helpers/with-tracker'
import { RootState } from '@/store/types'

const actions: ActionTree<HabitsState, RootState> = {
  fetchHabits: ({ commit }) => {
    const withTracker = new WithTracker('habits', commit)

    const promise = Firebase.getHabits().then((habits) =>
      Object.keys(habits).forEach((id) => commit(SET_HABIT, habits[id]))
    )

    return withTracker.runPromise(promise)
  },

  createHabit: ({ commit }, habit: Habit): Promise<Habit | void> =>
    Firebase.setHabit(habit).then((createdHabit) => {
      commit(SET_HABIT, createdHabit)
      return createdHabit
    }),

  overwriteHabit: ({ commit }, habitWithId: Habit): Promise<Habit | void> => {
    if (habitWithId.id.length === 0)
      throw new Error(
        'Id is empty. You must provide valid id to update the habit.'
      )

    return Firebase.setHabit(habitWithId).then((updatedHabit) => {
      commit(SET_HABIT, updatedHabit)
      return updatedHabit
    })
  },
}

export default actions
