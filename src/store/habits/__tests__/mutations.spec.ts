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
      const originalHabit: Habit = {
        id: 'NeWhaBit',
        name: 'Life Changer',
        experienceIds: [],
      }

      state = {
        [originalHabit.id]: { ...originalHabit },
      }

      const updatedHabit = { ...originalHabit, name: 'different name' }

      mutations[SET_HABIT](state, updatedHabit)

      expect(state).toEqual({
        [originalHabit.id]: { ...originalHabit, name: updatedHabit.name },
      })

      expect(state).not.toEqual({
        [originalHabit.id]: { ...originalHabit },
      })
    })
  })
})
