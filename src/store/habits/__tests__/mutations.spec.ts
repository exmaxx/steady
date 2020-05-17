import mutations, { SET_HABIT } from '@/store/habits/mutations'
import habitsState from '@/store/habits/state'
import { Habit, HabitsState } from '@/store/habits/types'

describe('Habits module - mutations', () => {
  let state: HabitsState

  beforeEach(() => {
    state = { ...habitsState }
  })

  describe('SET_HABIT', () => {
    it('creates habit', () => {
      const newHabit: Habit = {
        id: 'NeWhaBit',
        name: 'Life Changer',
        experienceIds: [],
      }

      mutations[SET_HABIT](state, newHabit)

      expect(state).toEqual({
        [newHabit.id]: { ...newHabit },
      })
    })

    it('updates habit', () => {
      const habit: Habit = {
        id: 'NeWhaBit',
        name: 'Life Changer',
        experienceIds: [],
      }

      state = {
        [habit.id]: { ...habit },
      }

      const updatedHabit = { ...habit, name: 'different name' }

      mutations[SET_HABIT](state, updatedHabit)

      expect(state).toEqual({
        [habit.id]: { ...habit, name: updatedHabit.name },
      })

      expect(state).not.toEqual({
        [habit.id]: { ...habit },
      })
    })
  })
})
