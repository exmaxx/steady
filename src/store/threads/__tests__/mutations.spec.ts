import dayjs from 'dayjs'

import { createSampleThread } from './helpers'

import mutations from '@/store/threads/mutations'
import { Thread, ThreadsState } from '@/store/threads/types'

describe('THREADS MUTATIONS', () => {
  describe('addThread', () => {
    it('add thread to state', () => {
      const state: ThreadsState = []

      const newThread = createSampleThread('testId')

      mutations.addThread(state, newThread)

      expect(state).toEqual([{ ...newThread }])
    })
  })

  describe('modifyThread', () => {
    let origThread: Thread
    let state: ThreadsState
    let newStartDatetime: string

    beforeEach(() => {
      origThread = createSampleThread('testId')
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
