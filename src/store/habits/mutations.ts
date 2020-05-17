import Vue from 'vue'
import { MutationTree } from 'vuex'

import { Habit, HabitsState } from '@/store/habits/types'

export const SET_HABIT = '✏️ Set Habit'

const mutations: MutationTree<HabitsState> = {
  [SET_HABIT]: (state, habit: Habit) => Vue.set(state, habit.id, habit),
}

export default mutations
