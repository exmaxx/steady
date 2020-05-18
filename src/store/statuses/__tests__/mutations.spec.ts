import mutations, { SET_STATUS } from '@/store/statuses/mutations'
import { StatusesState } from '@/store/statuses/types'

describe('Statuses module - mutations', () => {
  let state: StatusesState

  beforeEach(() => {
    state = {} as StatusesState
  })

  describe('SET_STATUS', () => {
    it('change status of a specified resource', () => {
      mutations[SET_STATUS](state, { resource: 'experiences', status: 'idle' })

      expect(state).toEqual({
        experiences: 'idle',
      })
    })
  })

  describe('SET_STATUS_WORKING', () => {
    it('change status of a specified resource to working', () => {
      mutations[SET_STATUS](state, { resource: 'habits', status: 'working' })

      expect(state).toEqual({
        habits: 'working',
      })
    })
  })

  describe('SET_STATUS_FINISHED', () => {
    it('change status of a specified resource to finished', () => {
      mutations[SET_STATUS](state, { resource: 'auth', status: 'finished' })

      expect(state).toEqual({
        auth: 'finished',
      })
    })
  })
})
