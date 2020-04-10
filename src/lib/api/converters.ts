import { emptyExperience } from '@/lib/helpers'
import { Experience } from '@/store/experiences/types'
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter

export const experienceConverter: FirestoreDataConverter<Experience> = {
  toFirestore: (experience: Experience) => experience,

  fromFirestore: (snapshot, options): Experience => {
    const data = snapshot.data(options)

    return {
      ...emptyExperience,
      ...data,
    }
  },
}
