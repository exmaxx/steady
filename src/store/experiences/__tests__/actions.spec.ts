import { ActionContext, ActionHandler, Store } from 'vuex'

import { sampleExperience } from '../../../../tests/__samples__/experiences'

import Firebase from '@/lib/api/firebase'
import actions from '@/store/experiences/actions'
import {
  ADD_EXPERIENCE,
  UPDATE_EXPERIENCE,
} from '@/store/experiences/mutations'
import { ExperiencesState } from '@/store/experiences/types'
import { RootState } from '@/store/types'

jest.mock('@/lib/api/firebase')

describe('Experiences module - actions', () => {
  const emptyStoreMock = {} as Store<RootState>
  const contextMock = {} as ActionContext<ExperiencesState, RootState>

  contextMock.commit = jest.fn()
  contextMock.dispatch = jest.fn()

  describe('fetchExperiences', () => {
    const fetchExperiences = (actions.fetchExperiences as ActionHandler<
      ExperiencesState,
      RootState
    >).bind(emptyStoreMock)

    beforeAll(() => {
      Firebase.getExperiences = jest
        .fn()
        .mockImplementation(() => Promise.resolve([sampleExperience]))
    })

    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterAll(() => {
      Firebase.getExperiences = jest.fn() // Returning to what `jest.mock` has set up (not restoring the real original code)
    })

    it('calls Firebase to get experiences', () => {
      fetchExperiences(contextMock)

      expect(Firebase.getExperiences).toHaveBeenCalledTimes(1)
    })

    it('commits received experiences to store', async () => {
      await fetchExperiences(contextMock)

      expect((contextMock.commit as jest.Mock).mock.calls).toContainEqual([
        ADD_EXPERIENCE,
        sampleExperience,
      ])
    })
  })

  describe('createExperience', () => {
    const createExperience = (actions.createExperience as ActionHandler<
      ExperiencesState,
      RootState
    >).bind(emptyStoreMock)

    const sampleId = 'samplEID'

    beforeAll(() => {
      Firebase.setExperience = jest
        .fn()
        .mockImplementation(() => Promise.resolve(sampleId))
    })

    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterAll(() => {
      Firebase.setExperience = jest.fn() // Returning to what `jest.mock` has set up (not restoring the real original code)
    })

    it('calls Firebase for pushing the experience', () => {
      createExperience(contextMock, sampleExperience)

      expect(Firebase.setExperience).toHaveBeenCalledTimes(1)
    })

    it('commits experience to store', async () => {
      await createExperience(contextMock, sampleExperience)

      expect(contextMock.commit).toHaveBeenCalledTimes(1)
      expect(contextMock.commit).toHaveBeenCalledWith(ADD_EXPERIENCE, {
        ...sampleExperience,
        id: sampleId,
      })
    })
  })

  describe('overwriteExperience', () => {
    const overwriteExperience = (actions.overwriteExperience as ActionHandler<
      ExperiencesState,
      RootState
    >).bind(emptyStoreMock)

    const sampleId = 'samplEID'

    beforeAll(() => {
      Firebase.setExperience = jest
        .fn()
        .mockImplementation(() => Promise.resolve(sampleId))
    })

    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterAll(() => {
      Firebase.setExperience = jest.fn() // Returning to what `jest.mock` has set up (not restoring the real original code)
    })

    it('throws when experience has empty id', () => {
      const experienceWithEmptyId = {
        ...sampleExperience,
        id: '',
      }

      expect(() =>
        overwriteExperience(contextMock, experienceWithEmptyId)
      ).toThrow('Experience must have an id when updating.')
    })

    it('calls Firebase for pushing the experience', () => {
      overwriteExperience(contextMock, sampleExperience)

      expect(Firebase.setExperience).toHaveBeenCalledTimes(1)
    })

    it('commits updated experience to store', async () => {
      await overwriteExperience(contextMock, sampleExperience)

      expect(contextMock.commit).toHaveBeenCalledTimes(1)
      expect(contextMock.commit).toHaveBeenCalledWith(UPDATE_EXPERIENCE, {
        ...sampleExperience,
      })
    })
  })
})
