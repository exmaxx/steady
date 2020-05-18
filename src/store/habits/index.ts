// TODO: Check whether the whole lodash is loaded. (If so, try to use lodash-es.)
import sortBy from 'lodash/sortBy'
import { Module } from 'vuex'

import actions from '@/store/habits/actions'
import mutations from '@/store/habits/mutations'
import state from '@/store/habits/state'
import { Habit, HabitsState } from '@/store/habits/types'
import { RootState } from '@/store/types'

const habitsModule: Module<HabitsState, RootState> = {
  state,
  mutations,
  actions,

  getters: {
    habitsSortedByName: (state): Habit[] => sortBy(state, ['name']),

    findHabitById: (state) => (id: string): Habit | null => state[id] || null,
  },
}

export default habitsModule
