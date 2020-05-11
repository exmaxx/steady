import sortBy from 'lodash/sortBy'
import Vue from 'vue'
import { Module } from 'vuex'
// TODO: Check whether the whole lodash is loaded. (If so, try to use lodash-es.)

import Firebase from '@/lib/api/firebase'
import { Habit, HabitsState } from '@/store/habits/types'
import WithTracker from '@/store/helpers/with-tracker'
import { RootState } from '@/store/types'

const habitsModule: Module<HabitsState, RootState> = {
  state: {},

  mutations: {
    SET_HABIT: (state, habit: Habit) => Vue.set(state, habit.id, habit),
  },

  actions: {
    fetchHabits: ({ commit }) => {
      const withTracker = new WithTracker('habits', commit)

      const promise = Firebase.getHabits().then((habits) =>
        Object.keys(habits).forEach((id) => commit('SET_HABIT', habits[id]))
      )

      return withTracker.runPromise(promise)
    },

    createHabit: ({ commit }, habit: Habit): Promise<Habit | void> =>
      Firebase.setHabit(habit).then((createdHabit) => {
        commit('SET_HABIT', createdHabit)
        return createdHabit
      }),

    overwriteHabit: ({ commit }, habitWithId: Habit): Promise<Habit | void> =>
      Firebase.setHabit(habitWithId).then((updatedHabit) => {
        commit('SET_HABIT', updatedHabit)
        return updatedHabit
      }),
  },

  getters: {
    habitsSortedByName: (state): Habit[] => sortBy(state, ['name']),

    findHabitById: (state) => (id: string): Habit | null => state[id] || null,
  },
}

export default habitsModule
