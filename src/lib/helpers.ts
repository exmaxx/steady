import dayjs from 'dayjs'

import { Experience } from '@/store/experiences/types'
import { Habit } from '@/store/habits/types'

export const createEmptyExperience = (): Experience => ({
  id: '',
  datetime: dayjs().toISOString(),
  situationStory: '',
  situationEmotions: [],
  situationActivities: [],
  reactionStory: '',
  reactionEmotions: [],
  reactionActivities: [],
  reactionAspect: 1,
})

export const createEmptyHabit = (): Habit => ({
  id: '',
  name: '',
  experienceIds: [],
})

// TODO: Maybe use lodash's `isEmpty`?
export const isEmpty = (prop: unknown): boolean => {
  if (!prop) return true
  if (prop === {}) return true // FIXME: This is not working!
  if (Array.isArray(prop)) return prop.length <= 0

  return false
}

export const removeEmptyFrom = (obj: { [key: string]: unknown }) => {
  Object.keys(obj).forEach((key) => isEmpty(obj[key]) && delete obj[key])
}

export const generateId = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let id = ''

  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return id
}
