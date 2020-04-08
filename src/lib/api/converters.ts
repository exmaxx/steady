import { Experience } from '@/store/experiences/types'
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter

const emptyExperience = {
  datetime: '',
  situation: '',
  situationEmotions: [],
  situationActivities: [],
  solution: '',
  solutionEmotions: [],
  solutionActivities: [],
}

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
