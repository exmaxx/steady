import activities from '../../../../tests/__samples__/activities'
import emotions from '../../../../tests/__samples__/emotions'
import {
  sampleExperience,
  sampleServerExperience,
} from '../../../../tests/__samples__/experiences'
import {
  sampleHabit,
  sampleServerHabit,
} from '../../../../tests/__samples__/habits'

import {
  experienceToClient,
  experienceToServer,
  habitToClient,
  habitToServer,
  userToClient,
  userToServer,
} from '@/lib/api/converters'
import { ServerUser } from '@/lib/api/types'
import { User } from '@/store/auth/types'

describe('converters', () => {
  describe('user converters', () => {
    describe('to server', () => {
      it('keeps server format same as client format', () => {
        const clientObj: User = {
          emotions,
          activities,
        }

        const serverObj = userToServer(clientObj)

        expect(serverObj).toEqual(clientObj)
      })
    })

    describe('to client', () => {
      it('keeps client format same as server format', () => {
        const serverObj: ServerUser = {
          emotions,
          activities,
        }

        const clientObj = userToClient(serverObj)

        expect(clientObj).toEqual(serverObj)
      })

      it('replaces missing data with empty arrays', () => {
        const serverObj: ServerUser = {}

        const clientObj = userToClient(serverObj)

        expect(clientObj).toEqual({
          emotions: [],
          activities: [],
        })
      })
    })
  })

  describe('experience converters', () => {
    describe('to server', () => {
      it('keeps the format', () => {
        const serverObj = experienceToServer(sampleExperience)

        expect(serverObj).toEqual(sampleExperience)
      })

      it('throws when no id', () => {
        expect.assertions(1)
        expect(() =>
          experienceToServer({ ...sampleExperience, id: '' })
        ).toThrowError('No id specified.')
      })

      it('keeps id', () => {
        const serverObj = experienceToServer(sampleExperience)

        expect(serverObj).toHaveProperty('id', sampleExperience.id)
      })

      it('deletes empty fields', () => {
        const serverObj = experienceToServer({
          ...sampleExperience,
          reactionStory: '',
          reactionEmotions: [],
          reactionAspect: 0,
        })

        expect(serverObj).not.toHaveProperty('reactionStory')
        expect(serverObj).not.toHaveProperty('reactionEmotions')
        expect(serverObj).toHaveProperty('reactionAspect', 0)
      })

      it('keeps non-empty fields', () => {
        const serverObj = experienceToServer(sampleExperience)

        expect(serverObj).toEqual(sampleExperience)
      })
    })

    describe('to client', () => {
      it('keeps id', () => {
        const clientObj = experienceToClient(sampleServerExperience)

        expect(clientObj).toHaveProperty('id', sampleServerExperience.id)
      })

      it('keeps all fields', () => {
        const clientObj = experienceToClient(sampleServerExperience)

        expect(clientObj).toEqual(sampleServerExperience)
      })

      it('creates missing fields', () => {
        const serverObj = { ...sampleServerExperience }

        delete serverObj.situationEmotions
        delete serverObj.reactionStory
        delete serverObj.reactionAspect

        const clientObj = experienceToClient(serverObj)

        expect(clientObj).not.toEqual(serverObj)
        expect(clientObj).toHaveProperty('situationEmotions', [])
        expect(clientObj).toHaveProperty('reactionStory', '')
        expect(clientObj).toHaveProperty('reactionAspect', 0)
      })

      describe('when server object comes with no id', () => {
        const sampleServerExperienceWithoutId =  { ...sampleServerExperience, id: '' }
        const backupId = 'idFromAnotherSource'

        it('allows backup id when server object has no id', () => {
          const clientObj = experienceToClient(
            sampleServerExperienceWithoutId,
            backupId
          )

          expect(clientObj).toHaveProperty('id', backupId)
        })

        it('keeps id when provided in server object even if backup is also provided', () => {
          const clientObj = experienceToClient(
            sampleServerExperience,
            backupId
          )

          expect(clientObj).toHaveProperty('id', sampleServerExperience.id)
        })

        it('throws exception when no backup id provided', () => {
          expect.assertions(1)
          expect(() =>
            experienceToClient(sampleServerExperienceWithoutId)
          ).toThrowError('No id specified.')
        })
      });
    })
  })

  describe('habit converters', () => {
    describe('to server', () => {
      it('keeps the format', () => {
        const serverObj = habitToServer(sampleHabit)

        expect(serverObj).toEqual(sampleHabit)
      })

      it('throws when no id', () => {
        expect.assertions(1)

        expect(() => habitToServer({ ...sampleHabit, id: '' })).toThrowError(
          'No id specified.'
        )
      })

      it('keeps id', () => {
        const serverObj = habitToServer(sampleHabit)

        expect(serverObj).toHaveProperty('id', sampleHabit.id)
      })
    })

    describe('to client', () => {
      it('creates empty fields', () => {
        const serverObj = { ...sampleServerHabit }

        delete serverObj.experienceIds

        const clientObj = habitToClient(serverObj)

        expect(clientObj).not.toEqual(serverObj)
        expect(clientObj).toHaveProperty('experienceIds', [])
      })

      it('keeps the format', () => {
        const clientObj = habitToClient(sampleServerHabit)

        expect(clientObj).toEqual(sampleServerHabit)
      })
    })
  })
})
