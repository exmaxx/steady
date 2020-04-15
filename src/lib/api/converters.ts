import { ServerExperience, ServerThread } from '@/lib/api/types'
import { emptyExperience, removeEmptyFrom } from '@/lib/helpers'
import { Experience } from '@/store/experiences/types'
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter
import { Thread } from '@/store/threads/types'

export const experienceConverter: FirestoreDataConverter<Experience> = {
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

export const threadConverter: FirestoreDataConverter<Thread> = {
  toFirestore: (thread: Thread): ServerThread => {
    const serverThread = {
      ...thread,
    }

    delete serverThread.id

    return serverThread
  },

  fromFirestore: (snapshot, options): Thread => {
    const data = snapshot.data(options) as ServerThread

    return {
      ...data,
      id: snapshot.id,
    } as Thread
  },
}
