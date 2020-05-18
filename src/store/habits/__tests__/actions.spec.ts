import { ActionContext, ActionHandler, Store } from 'vuex'

import { sampleHabit } from '../../../../tests/__samples__/habits'

import Firebase from '@/lib/api/firebase'
import actions from '@/store/habits/actions'
import { SET_HABIT } from '@/store/habits/mutations'
import { Habit, Habits, HabitsState } from '@/store/habits/types'
import { RootState } from '@/store/types'

jest.mock('@/lib/api/firebase')

Firebase.getHabits = jest.fn().mockImplementation(() =>
  Promise.resolve({
    [sampleHabit.id]: sampleHabit,
  } as Habits)
)

Firebase.setHabit = jest
  .fn()
  .mockImplementation((habit: Habit) => Promise.resolve(habit))

describe('Habits module - actions', () => {
  const emptyStoreMock = {} as Store<RootState>
  const contextMock = {} as ActionContext<HabitsState, RootState>

  contextMock.commit = jest.fn()
  contextMock.dispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchHabits', () => {
    const fetchHabits = (actions.fetchHabits as ActionHandler<
      HabitsState,
      RootState
    >).bind(emptyStoreMock)

    it('calls firebase for habits', () => {
      fetchHabits(contextMock)

      expect(Firebase.getHabits).toHaveBeenCalledTimes(1)
    })

    it('commits habits to store', async () => {
      await fetchHabits(contextMock)

      expect((contextMock.commit as jest.Mock).mock.calls).toContainEqual([
        SET_HABIT,
        sampleHabit,
      ])
    })
  })

  describe('createHabit', () => {
    const createHabit = (actions.createHabit as ActionHandler<
      HabitsState,
      RootState
    >).bind(emptyStoreMock)

    it('calls firebase to create new habit', () => {
      createHabit(contextMock, sampleHabit)

      expect(Firebase.setHabit).toHaveBeenCalledTimes(1)
    })

    it('commits new habit', async () => {
      await createHabit(contextMock, sampleHabit)

      expect(contextMock.commit).toHaveBeenCalledTimes(1)
      expect(contextMock.commit).toHaveBeenCalledWith(SET_HABIT, sampleHabit)
    })
  })

  describe('overwriteHabit', () => {
    const overwriteHabit = (actions.overwriteHabit as ActionHandler<
      HabitsState,
      RootState
    >).bind(emptyStoreMock)

    const updatedHabit = { ...sampleHabit, name: 'Updated Name' }

    it('throws when habit has empty id (and createHabit should be called instead)', () => {
      const habitWithEmptyId = {
        ...updatedHabit,
        id: '',
      }

      expect(() => overwriteHabit(contextMock, habitWithEmptyId)).toThrow(
        'Id is empty. You must provide valid id to update the habit.'
      )
    })

    it('calls firebase to overwrite habit', () => {
      overwriteHabit(contextMock, updatedHabit)

      expect(Firebase.setHabit).toHaveBeenCalledTimes(1)
    })

    it('commits updated habit', async () => {
      await overwriteHabit(contextMock, updatedHabit)

      expect(contextMock.commit).toHaveBeenCalledTimes(1)
      expect(contextMock.commit).toHaveBeenCalledWith(SET_HABIT, updatedHabit)
    })
  })
})
