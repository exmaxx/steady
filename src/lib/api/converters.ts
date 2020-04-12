import { ServerExperience } from '@/lib/api/types'
import { emptyExperience, removeEmptyFrom } from '@/lib/helpers'
import { Experience } from '@/store/experiences/types'
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter

export const experienceConverter: FirestoreDataConverter<Experience> = {
  toFirestore: (experience: Experience): ServerExperience => {
    const serverExperience = {
      ...experience,
    }

    removeEmptyFrom(serverExperience)

    return serverExperience
  },

  fromFirestore: (snapshot, options): Experience => {
    const data = snapshot.data(options) as ServerExperience

    return {
      ...emptyExperience,
      ...data,
    } as Experience
  },
}
