import dayjs from 'dayjs'

import mutations from '@/store/threads/mutations'
import { Thread, ThreadsState } from '@/store/threads/types'

const createNewThread = (id: string): Thread => ({
  id,
  startDatetime: dayjs().toISOString(),
  endDatetime: dayjs()
    .add(1, 'day')
    .toISOString(),
})

describe('THREADS MUTATIONS', () => {
  describe('addThread', () => {
    it('add thread to state', () => {
      const state: ThreadsState = []

      const newThread = createNewThread('testId')

      mutations.addThread(state, newThread)

      expect(state).toEqual([{ ...newThread }])
    })
  })

  describe('modifyThread', () => {
    let origThread: Thread
    let state: ThreadsState
    let newStartDatetime: string

    beforeEach(() => {
      origThread = createNewThread('testId')
      state = [origThread]
      newStartDatetime = dayjs()
        .add(1, 'minute')
        .toISOString()
    })

    it('modifies property', () => {
      mutations.modifyThread(state, {
        id: 'testId',
        partialThread: { startDatetime: newStartDatetime },
      })

      const expectedThread = {
        ...origThread,
        startDatetime: newStartDatetime,
      }

      expect(state[0]).toEqual(expectedThread)
    })

    it('does not add nor delete thread', () => {
      const expectedLength = state.length

      mutations.modifyThread(state, {
        id: 'testId',
        partialThread: { startDatetime: newStartDatetime },
      })

      expect(state.length).toEqual(expectedLength)
    })
  })
})
