import firebase from 'firebase'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import { Tag } from '@/store/types'
import { ServerUser } from '@/lib/api/types'

// import 'firebase/functions'  // TODO: Add when functions needed

const TEMPORARY_USER_ID = '7AAdTrXZFkWsD2e48GN3P56YZoR2'

/**
 * Initializes Firebase.
 *
 * You can then access firebase by importing
 * `import firebase from 'firebase'` anywhere in the app.
 * But it is preferred to call firebase through this file.
 */
export function init() {
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
    .collection('users')
    .doc(TEMPORARY_USER_ID)

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

export const getEmotions = (): Promise<Tag[]> =>
  getUser().then(user => user.emotions)

export const getActivities = (): Promise<Tag[]> =>
  getUser().then(user => user.activities)

export function postEmotion(emotion: Tag): Promise<void> {
  return userDoc()
    .set(
      { emotions: firebase.firestore.FieldValue.arrayUnion(emotion) }, // adds the item to array without overwriting it
      { merge: true }
    )
    .catch(error => {
      console.error('Error writing emotion document: ', error)
    })
}

export function postActivity(activity: Tag): Promise<void> {
  return userDoc()
    .set(
      { activities: firebase.firestore.FieldValue.arrayUnion(activity) }, // adds the item to array without overwriting it
      { merge: true }
    )
    .catch(error => {
      console.error('Error writing activity document: ', error)
    })
}
