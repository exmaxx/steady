import firebase from 'firebase'

import * as FirebaseTypes from '@/lib/api/types'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import { Tag } from '@/store/types'

// import 'firebase/functions'  // TODO: Add when functions needed

const TEMPORARY_USER_ID = '7AAdTrXZFkWsD2e48GN3P56YZoR2'

const Firebase = {
  /**
   * Initializes Firebase.
   *
   * You can then access firebase by importing
   * `import firebase from 'firebase'` anywhere in the app.
   * But it is preferred to call firebase through this file.
   */
  init() {
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
  },

  getEmotions(): Promise<Tag[]> {
    const db = firebase.firestore()

    return db
      .collection('users')
      .doc(TEMPORARY_USER_ID)
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data() as FirebaseTypes.User

          if (data) {
            return data.emotions
          }
        }

        console.error('Firebase: User not found or user data incorrect.')
        return []
      })
  },

  getActivities(): FirebaseTypes.Activity[] {
    return ['programovani', 'vareni', 'premysleni']
  },
}

export default Firebase
