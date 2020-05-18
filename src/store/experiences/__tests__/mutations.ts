import { sampleExperience } from '../../../../tests/__samples__/experiences'

import mutations, {
  ADD_EXPERIENCE,
  REMOVE_EXPERIENCE,
  UPDATE_EXPERIENCE,
} from '@/store/experiences/mutations'
import experiencesState from '@/store/experiences/state'
import { ExperiencesState } from '@/store/experiences/types'

describe('Experiences module - mutations', () => {
  let state: ExperiencesState

  beforeEach(() => {
    state = [...experiencesState]
  })

  describe('ADD_EXPERIENCE', () => {
    it('adds experience to state', () => {
      mutations[ADD_EXPERIENCE](state, sampleExperience)

      expect(state).toEqual([{ ...sampleExperience }])
    })

    it('sorts the experiences with more recent coming first', () => {
      const olderExperience = {
        ...sampleExperience,
        id: 'oLder',
        datetime: '2019-05-13T17:53:01.494Z',
      }

      const newerExperience = {
        ...sampleExperience,
        id: 'neweR',
        datetime: '2020-05-13T17:53:01.494Z',
      }

      mutations[ADD_EXPERIENCE](state, olderExperience)
      mutations[ADD_EXPERIENCE](state, newerExperience)

      expect(state).toEqual([newerExperience, olderExperience])
    })
  })

  describe('UPDATE_EXPERIENCE', () => {
    const anotherSampleExperience = {
      ...sampleExperience,
      id: 'anotHER',
      datetime: '2019-05-13T17:53:01.494Z',
    }

    beforeEach(() => {
      state = [sampleExperience, anotherSampleExperience]
    })

    it('updates the experience (and not anything else)', () => {
      const updatedExperience = {
        ...anotherSampleExperience,
        description: 'Updated text.',
      }

      mutations[UPDATE_EXPERIENCE](state, updatedExperience)

      expect(state).toEqual([sampleExperience, updatedExperience])
    })

    it('sorts experiences correctly after time change', () => {
      const updatedExperience = {
        ...anotherSampleExperience,
        datetime: '2021-05-13T17:53:01.494Z',
      }

      mutations[UPDATE_EXPERIENCE](state, updatedExperience)

      expect(state).toEqual([updatedExperience, sampleExperience])
    })

    it('throws when id is empty', () => {
      expect(() =>
        mutations[UPDATE_EXPERIENCE](state, { ...sampleExperience, id: '' })
      ).toThrowError(
        'Id is empty. You must provide valid id to update the experience.'
      )
    })
  })

  describe('REMOVE_EXPERIENCE', () => {
    beforeEach(() => {
      state = [sampleExperience]
    })

    it('removes experience from store', () => {
      mutations[REMOVE_EXPERIENCE](state, sampleExperience.id)

      expect(state).toEqual([])
    })
  })
})
