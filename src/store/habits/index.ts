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
    ADD_HABIT: (state, habit: Habit) => {
      Vue.set(state, habit.id, habit)
    },
  },

  actions: {
    fetchHabits: ({ commit }) => {
      const withTracker = new WithTracker('habits', commit)

      const promise = Firebase.getHabits().then((habits) =>
        Object.keys(habits).forEach((id) => commit('ADD_HABIT', habits[id]))
      )

      withTracker.runPromise(promise)
    },

    createHabit: ({ commit }, habit: Habit) =>
      Firebase.setHabit(habit).then(() => commit('ADD_HABIT', habit)),
  },

  getters: {
    sortedHabitIdsByName: (state) => sortBy(state, ['id']),
  },
}

export default habitsModule
