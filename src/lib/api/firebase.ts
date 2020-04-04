import { FirebaseTypes } from '@/lib/api/types'

export const fetchEmotions = (): FirebaseTypes.Tag[] => [
  'stres',
  'nasrany',
  'smutny',
]

export const fetchActivities = (): FirebaseTypes.Activity[] => [
  'programovani',
  'vareni',
  'premysleni',
]
