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
 * Confirm that the object really has an 'id'. And that the id is not empty string.
 *
 * Note: Typescript ensures that the id is there in compile time. This ensures
 * that it is there also in run time.
 *
 * @param obj
 */
export const withAssertedId = <T extends { id: string }>(obj: T): T => {
  if (isEmpty(obj.id)) throw new Error('No id specified.')

  return obj
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
export const withoutEmptyFields = <T extends { [key: string]: unknown }>(
  obj: T
): T => {
  const shallowCopyWithoutEmpty = { ...obj }

  Object.keys(shallowCopyWithoutEmpty).forEach((key): void => {
    isEmptyProperty(shallowCopyWithoutEmpty[key]) &&
      delete shallowCopyWithoutEmpty[key]
  })

  return shallowCopyWithoutEmpty
}
