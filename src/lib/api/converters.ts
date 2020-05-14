import { firestore } from 'firebase'

import { ServerExperience, ServerHabit, ServerUser } from '@/lib/api/types'
import {
  createEmptyExperience,
  createEmptyHabit,
  withoutEmptyFields,
  withAssertedId,
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

  fromFirestore: (snapshot, options) => {
    const serverUser = snapshot.data(options) as ServerUser
    return userToClient(serverUser)
  },
}

export const experienceToServer = (
  experience: Experience
): ServerExperience => {
  const serverExperience = {
    ...experience,
  }

  return withAssertedId(withoutEmptyFields(serverExperience))
}

export const experienceToClient = (
  serverExperience: ServerExperience,
  backupId?: string
): Experience => {
  const experience = {
    ...createEmptyExperience(),
    ...serverExperience,
  }

  if (!serverExperience.id && backupId) {
    experience.id = backupId
  }

  return withAssertedId(experience)
}

export const experienceConverter: firestore.FirestoreDataConverter<Experience> = {
  toFirestore: experienceToServer,

  fromFirestore: (snapshot, options) => {
    const serverExperience = snapshot.data(options) as ServerExperience

    return experienceToClient(serverExperience, snapshot.id)
  },
}

export const habitToServer = (habit: Habit): ServerHabit =>
  withAssertedId(habit)

export const habitToClient = (serverHabit: ServerHabit): Habit => {
  return { ...createEmptyHabit(), ...serverHabit }
}

export const habitsConverter: firestore.FirestoreDataConverter<Habit> = {
  toFirestore: habitToServer,
  fromFirestore: (snapshot, options) => {
    const serverHabit = snapshot.data(options) as ServerHabit

    return habitToClient(serverHabit)
  },
}
