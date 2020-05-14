// Resources

import { Experience } from '@/store/experiences/types'

export type ServerTag = string

export interface ServerUser {
  emotions?: ServerTag[]
  activities?: ServerTag[]
}

export type ServerExperience = Experience

export interface ServerHabit {
  id: string
  name: string
  experienceIds: string[]
}

// Types

export type ApiStatus = 'idle' | 'queued' | 'working' | 'finished' | 'error'
