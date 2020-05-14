import activities from '../../../../tests/__samples__/activities'
import emotions from '../../../../tests/__samples__/emotions'
import {
  experienceSample,
  serverExperienceSample,
} from '../../../../tests/__samples__/experiences'

import {
  experienceToClient,
  experienceToServer,
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
      it('creates a copy', () => {
        const serverObj = experienceToServer(experienceSample)

        expect(serverObj).not.toBe(experienceSample)
      })

      it('throws when no id', () => {
        expect.assertions(1)
        expect(() =>
          experienceToServer({ ...experienceSample, id: '' })
        ).toThrowError('No id specified.')
      })

      it('keeps id', () => {
        const serverObj = experienceToServer(experienceSample)

        expect(serverObj).toHaveProperty('id', experienceSample.id)
      })

      it('deletes empty fields', () => {
        const serverObj = experienceToServer({
          ...experienceSample,
          reactionStory: '',
          reactionEmotions: [],
          reactionAspect: 0,
        })

        expect(serverObj).not.toHaveProperty('reactionStory')
        expect(serverObj).not.toHaveProperty('reactionEmotions')
        expect(serverObj).toHaveProperty('reactionAspect', 0)
      })

      it('keeps non-empty fields', () => {
        const serverObj = experienceToServer(experienceSample)

        expect(serverObj).toEqual(experienceSample)
      })
    })

    describe('to client', () => {
      it('creates a copy', () => {
        const clientObj = experienceToClient(serverExperienceSample)

        expect(clientObj).not.toBe(serverExperienceSample)
      })

      it('keeps all fields', () => {
        const clientObj = experienceToClient(serverExperienceSample)

        expect(clientObj).toEqual(serverExperienceSample)
      })

      it('has id', () => {
        const clientObj = experienceToClient(serverExperienceSample)

        expect(clientObj).toHaveProperty('id', serverExperienceSample.id)
      })

      it('creates missing fields', () => {
        const serverObj = serverExperienceSample

        delete serverObj.situationEmotions
        delete serverObj.reactionStory
        delete serverObj.reactionAspect

        const clientObj = experienceToClient(serverObj)

        expect(clientObj).not.toEqual(serverObj)
        expect(clientObj).toHaveProperty('situationEmotions', [])
        expect(clientObj).toHaveProperty('reactionStory', '')
        expect(clientObj).toHaveProperty('reactionAspect', 0)
      })
    })
  })
})
