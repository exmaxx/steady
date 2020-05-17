import firebase from 'firebase'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import {
  experienceConverter,
  habitsConverter,
  userConverter,
} from '@/lib/api/converters'
import {
  ID_LENGTH,
  NO_USER_DATA_ERROR,
  NO_USER_DOC_ERROR,
} from '@/lib/constants'
import { createEmptyHabit, generateId } from '@/lib/helpers'
import store from '@/store'
import { User } from '@/store/auth/types'
import { Experience } from '@/store/experiences/types'
import { Habit, Habits } from '@/store/habits/types'
import { Tag } from '@/store/types'

// import 'firebase/functions'  // TODO: Add when functions needed

const USERS = 'users'
const EXPERIENCES = 'experiences'
const HABITS = 'habits'

/**
 * INITIALIZATION
 */

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

/**
 * AUTH
 */

/**
 * Get user id from Vuex store (from auth module).
 */
const getUserId = (): string => {
  const { state } = store

  if (!state.auth || !state.auth.userId) throw new Error('No userId!')

  return state.auth.userId
}

/**
 * DB HELPERS
 */

/**
 * Get db object. You must call `init()` first.
 */
const db = () => firebase.firestore()

/**
 * Get user doc reference.
 */
const userDoc = () => db().collection(USERS).doc(getUserId())

/**
 * Get experience collection reference.
 */
const experiencesCollection = () =>
  userDoc().collection(EXPERIENCES).withConverter(experienceConverter)

/**
 * Get habits collection reference.
 */
const habitsCollection = () =>
  userDoc().collection(HABITS).withConverter(habitsConverter)

/**
 * DB CALLS
 */

/**
 * Creates an empty user data object.
 */
const setUserData = (): Promise<void> => userDoc().set({})

/**
 * Get user data.
 */
function getUserData(): Promise<User> {
  return userDoc()
    .withConverter(userConverter)
    .get()
    .then((doc) => {
      if (!doc.exists) throw new Error(NO_USER_DOC_ERROR)

      const user = doc.data()

      if (!user) throw new Error(NO_USER_DATA_ERROR)

      return user
    })
}

/**
 * Get emotions data.
 */
const getEmotions = (): Promise<Tag[]> =>
  getUserData().then((user) => user.emotions.sort())

/**
 * Get activities data.
 */
const getActivities = (): Promise<Tag[]> =>
  getUserData().then((user) => user.activities.sort())

/**
 * Get habits data.
 */
const getHabits = (): Promise<Habits> => {
  return habitsCollection()
    .orderBy('name', 'desc')
    .get()
    .then((qs) =>
      qs.docs.reduce((habits: Habits, doc): Habits => {
        const habit = doc.data()
        habits[habit.id] = habit
        return habits
      }, {})
    )
}

/**
 * Create or overwrite experience.
 * @param habit
 */
const setHabit = (habit: Habit): Promise<Habit | void> => {
  const id = habit.id || generateId(ID_LENGTH)

  const newHabit = {
    ...createEmptyHabit(),
    ...habit,
    id,
  }

  return habitsCollection()
    .doc(id)
    .set(newHabit)
    .then(() => newHabit)
    .catch((error) => {
      console.error('Error writing habit document: ', error)
    })
}

/**
 * Get experiences data.
 */
const getExperiences = (): Promise<Experience[]> => {
  return experiencesCollection()
    .orderBy('datetime', 'desc')
    .get()
    .then((qs) => qs.docs.map((doc) => doc.data() as Experience))
}

/**
 * Create or overwrite experience.
 * @param experience
 */
const setExperience = (experience: Experience): Promise<string | void> => {
  const id = experience.id || generateId(ID_LENGTH)
  const newExperience = {
    ...experience,
    id,
  }

  return experiencesCollection()
    .doc(id)
    .set(newExperience)
    .then(() => id)
    .catch((error) => {
      console.error('Error writing experience document: ', error)
    })
}

function setEmotion(emotion: Tag): Promise<void> {
  return userDoc()
    .set(
      { emotions: firebase.firestore.FieldValue.arrayUnion(emotion) }, // adds the item to array without overwriting it
      { merge: true }
    )
    .catch((error) => {
      console.error('Error writing emotion document: ', error)
    })
}

function setActivity(activity: Tag): Promise<void> {
  return userDoc()
    .set(
      { activities: firebase.firestore.FieldValue.arrayUnion(activity) }, // adds the item to array without overwriting it
      { merge: true }
    )
    .catch((error) => {
      console.error('Error writing activity document: ', error)
    })
}

/**
 * Export out happy object.
 */
const Firebase = {
  init,
  getUserData,
  setUserData,
  getHabits,
  setHabit,
  getExperiences,
  setExperience,
  getActivities,
  setActivity,
  getEmotions,
  setEmotion,
}

export default Firebase
