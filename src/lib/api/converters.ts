import { firestore } from 'firebase'
import { isEmpty } from 'lodash'

import { ServerExperience, ServerHabit, ServerUser } from '@/lib/api/types'
import {
  createEmptyExperience,
  createEmptyHabit,
  removeEmptyFrom,
} from '@/lib/helpers'
import { User } from '@/store/auth/types'
import { Experience } from '@/store/experiences/types'
import { Habit } from '@/store/habits/types'

export const userToServer = (user: User): ServerUser => user

export const userToClient = (serverUser: ServerUser): User => ({
  emotions: serverUser.emotions || [],
  activities: serverUser.activities || [],
})

export const userConverter: firestore.FirestoreDataConverter<User> = {
  toFirestore: userToServer,

  fromFirestore: (snapshot, options): User => {
    const serverUser = snapshot.data(options) as ServerUser
    return userToClient(serverUser)
  },
}

export const experienceToServer = (
  experience: Experience
): ServerExperience => {
  if (isEmpty(experience.id)) throw new Error('No id specified.')

  const serverExperience = {
    ...experience,
  }

  removeEmptyFrom(serverExperience)

  return serverExperience
}

export const experienceToClient = (
  serverExperience: ServerExperience
): Experience => ({
  ...createEmptyExperience(),
  ...serverExperience,
})

export const experienceConverter: firestore.FirestoreDataConverter<Experience> = {
  toFirestore: experienceToServer,

  fromFirestore: (snapshot, options): Experience => {
    const serverExperience = snapshot.data(options) as ServerExperience

    return experienceToClient(serverExperience)
  },
}

export const habitsConverter: firestore.FirestoreDataConverter<Habit> = {
  toFirestore: (habit: Habit): ServerHabit => habit,
  fromFirestore: (snapshot, options): Habit => {
    const serverHabit = snapshot.data(options) as ServerHabit

    return {
      ...createEmptyHabit(),
      ...serverHabit,
      experienceIds: serverHabit.experienceIds || [],
    }
  },
}
