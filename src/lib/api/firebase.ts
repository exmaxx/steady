import firebase from 'firebase'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import {
  experienceConverter,
  threadConverter,
  userConverter,
} from '@/lib/api/converters'
import { NO_USER_DATA_ERROR, NO_USER_DOC_ERROR } from '@/lib/constants'
import store from '@/store'
import { User } from '@/store/auth/types'
import { Experience } from '@/store/experiences/types'
import { Thread } from '@/store/threads/types'
import { Tag } from '@/store/types'

// import 'firebase/functions'  // TODO: Add when functions needed

const USERS = 'users'
const EXPERIENCES = 'experiences'
const THREADS = 'threads'

/**
 * Initializes Firebase.
 *
 * You can then access firebase by importing
 * `import firebase from 'firebase'` anywhere in the app.
 * But it is preferred to call firebase through this file.
 */
function init() {
  const firebaseConfig = {
    apiKey: 'AIzaSyCsxrMEk8GpTxzQpiGAeOcZ8uYo3yf0NIw',
    authDomain: 'slow-n-steady.firebaseapp.com',
    databaseURL: 'https://slow-n-steady.firebaseio.com',
    projectId: 'slow-n-steady',
    storageBucket: 'slow-n-steady.appspot.com',
    messagingSenderId: '83112960496',
    appId: '1:83112960496:web:1d5c2c2eabd1a8a6537d35',
    measurementId: 'G-P8TQT77NE1',
  }

  firebase.initializeApp(firebaseConfig)

  if (firebase.app.length > 0) {
    console.log('Firebase initialized.')
  } else {
    console.log('Firebase failed to initialize.')
  }
}

const getUserId = (): string => {
  const { state } = store

  if (!state.auth || !state.auth.userId) throw new Error('No userId!')

  return state.auth.userId
}

const db = () => firebase.firestore()

const userDoc = () =>
  db()
    .collection(USERS)
    .doc(getUserId())

const experiencesCollection = () =>
  userDoc()
    .collection(EXPERIENCES)
    .withConverter(experienceConverter)

const threadsCollection = () =>
  userDoc()
    .collection(THREADS)
    .withConverter(threadConverter)

const postUser = () => userDoc().set({})

function getUser(): Promise<User> {
  return userDoc()
    .withConverter(userConverter)
    .get()
    .then(doc => {
      if (!doc.exists) throw new Error(NO_USER_DOC_ERROR)

      const user = doc.data()

      if (!user) throw new Error(NO_USER_DATA_ERROR)

      return user
    })
}

const getEmotions = (): Promise<Tag[]> => getUser().then(user => user.emotions)

const getActivities = (): Promise<Tag[]> =>
  getUser().then(user => user.activities)

const getExperiences = (): Promise<Experience[]> => {
  return experiencesCollection()
    .orderBy('datetime', 'desc')
    .get()
    .then(qs => qs.docs.map(doc => doc.data() as Experience))
}

function postExperience(experience: Experience): Promise<void | string> {
  return experiencesCollection()
    .add(experience)
    .then(doc => doc.id)
    .catch(error => {
      console.error('Error writing experience document: ', error)
    })
}

function postEmotion(emotion: Tag): Promise<void> {
  return userDoc()
    .set(
      { emotions: firebase.firestore.FieldValue.arrayUnion(emotion) }, // adds the item to array without overwriting it
      { merge: true }
    )
    .catch(error => {
      console.error('Error writing emotion document: ', error)
    })
}

function postActivity(activity: Tag): Promise<void> {
  return userDoc()
    .set(
      { activities: firebase.firestore.FieldValue.arrayUnion(activity) }, // adds the item to array without overwriting it
      { merge: true }
    )
    .catch(error => {
      console.error('Error writing activity document: ', error)
    })
}

const getThreads = (): Promise<void | Thread[]> => {
  return threadsCollection()
    .orderBy('startDatetime', 'desc')
    .get()
    .then(qs => qs.docs.map(doc => doc.data()))
    .catch(error => {
      console.error('Error getting threads: ', error)
    })
}

const postThread = (thread: Thread): Promise<void | string> => {
  return threadsCollection()
    .add(thread)
    .then(doc => doc.id)
    .catch(error => {
      console.error('Error writing thread document: ', error)
    })
}

const putThread = (
  id: string,
  partialThread: Partial<Thread>
): Promise<void | string> => {
  if (!id) return Promise.reject('Missing thread id.')

  return threadsCollection()
    .doc(id)
    .update(partialThread)
    .catch(error => {
      console.error('Error updating thread document: ', error)
    })
}

const Firebase = {
  init,
  getUser,
  postUser,
  getExperiences,
  postExperience,
  getActivities,
  postActivity,
  getEmotions,
  postEmotion,
  getThreads,
  postThread,
  putThread,
}

export default Firebase
