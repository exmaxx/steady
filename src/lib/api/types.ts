// Resources

import { AspectType } from '@/store/experiences/types'

export type ServerTag = string

export interface ServerUser {
  emotions?: ServerTag[]
  activities?: ServerTag[]
}

export interface ServerExperience {
  id?: string
  datetime: string
  situationStory?: string
  situationEmotions?: string[]
  situationActivities?: string[]
  reactionStory?: string
  reactionEmotions?: string[]
  reactionActivities?: string[]
  reactionAspect?: AspectType
}

export interface ServerHabit {
  id: string
  name: string
  experienceIds?: string[]
}

// Types

export type ApiStatus = 'idle' | 'queued' | 'working' | 'finished' | 'error'
