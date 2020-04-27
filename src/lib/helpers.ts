import { Experience } from '@/store/experiences/types'

export const emptyExperience: Experience = {
  id: '',
  datetime: '',
  situationStory: '',
  situationEmotions: [],
  situationActivities: [],
  solutionStory: '',
  solutionEmotions: [],
  solutionActivities: [],
}

export const isEmpty = (prop: unknown): boolean => {
  if (!prop) return true
  if (prop === {}) return true
  if (Array.isArray(prop)) return prop.length <= 0

  return false
}

export const removeEmptyFrom = (obj: { [key: string]: unknown }) => {
  Object.keys(obj).forEach((key) => isEmpty(obj[key]) && delete obj[key])
}
