import { firestore } from 'firebase'

import { ServerExperience, ServerUser } from '@/lib/api/types'
import { emptyExperience, removeEmptyFrom } from '@/lib/helpers'
import { User } from '@/store/auth/types'
import { Experience } from '@/store/experiences/types'

export const userConverter: firestore.FirestoreDataConverter<User> = {
  toFirestore: (user: User): ServerUser => {
    return user
  },

  fromFirestore: (snapshot, options): User => {
    const serverUser = snapshot.data(options) as ServerUser

    return {
      emotions: serverUser.emotions || [],
      activities: serverUser.activities || [],
    }
  },
}

export const experienceConverter: firestore.FirestoreDataConverter<Experience> = {
  toFirestore: (experience: Experience): ServerExperience => {
    const serverExperience = {
      ...experience,
    }

    removeEmptyFrom(serverExperience)

    delete serverExperience.id

    return serverExperience
  },

  fromFirestore: (snapshot, options): Experience => {
    const data = snapshot.data(options) as ServerExperience

    return {
      ...emptyExperience,
      ...data,
      id: snapshot.id,
    } as Experience
  },
}
