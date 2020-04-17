import firebase from 'firebase'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import { experienceConverter, threadConverter } from '@/lib/api/converters'
import { ServerUser } from '@/lib/api/types'
import { Experience } from '@/store/experiences/types'
import { Thread } from '@/store/threads/types'
import { Tag } from '@/store/types'
import DocumentReference = firebase.firestore.DocumentReference

// import 'firebase/functions'  // TODO: Add when functions needed

const TEMPORARY_USER_ID = '7AAdTrXZFkWsD2e48GN3P56YZoR2'
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

const db = () => firebase.firestore()

const userDoc = () =>
  db()
    .collection(USERS)
    .doc(TEMPORARY_USER_ID)

const experiencesCollection = () =>
  userDoc()
    .collection(EXPERIENCES)
    .withConverter(experienceConverter)

const threadsCollection = () =>
  userDoc()
    .collection(THREADS)
    .withConverter(threadConverter)

function getUser(): Promise<ServerUser> {
  return userDoc()
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.error(
          'Firebase: getUser() error. User document does not exist.'
        )
        throw new Error('User document does not exist.')
      }

      return doc.data() as ServerUser
    })
    .catch(error => {
      console.error(`Firebase: getUser() error. Error: ${error}`)
      throw new Error('User document does not exist.')
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

function postExperience(
  experience: Experience
): Promise<void | DocumentReference> {
  return experiencesCollection()
    .add(experience)
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
