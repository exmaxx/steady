import dayjs from 'dayjs'
import { isEmpty } from 'lodash'

import { ID_LENGTH } from '@/lib/constants'
import { Experience } from '@/store/experiences/types'
import { Habit } from '@/store/habits/types'

/**
 * Generates id of specified length. Used for unique resource ids.
 * @param length
 */
export const generateId = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let id = ''

  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return id
}

/**
 * Create an empty experience. Serves as a template for new experience.
 */
export const createEmptyExperience = (): Experience => ({
  id: generateId(ID_LENGTH),
  datetime: dayjs().toISOString(),
  situationStory: '',
  situationEmotions: [],
  situationActivities: [],
  reactionStory: '',
  reactionEmotions: [],
  reactionActivities: [],
  reactionAspect: 0,
})

/**
 * Create an empty habit. Serves as a template for new habit.
 */
export const createEmptyHabit = (): Habit => ({
  id: '',
  name: '',
  experienceIds: [],
})

/**
 * Test whether property is empty. Empty means that it is array without values,
 * object without keys, null or undefined.
 * @param prop
 */
export const isEmptyProperty = (prop: unknown): boolean => {
  switch (typeof prop) {
    case 'number':
      return false
    case 'boolean':
      return false
    default:
      return isEmpty(prop)
  }
}

/**
 * Removes empty keys from and object.
 * @param obj Object will be modified.
 */
export const removeEmptyFrom = (obj: { [key: string]: unknown }) =>
  Object.keys(obj).forEach((key): void => {
    isEmptyProperty(obj[key]) && delete obj[key]
  })
