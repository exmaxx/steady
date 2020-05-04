// Resources

export type ServerTag = string

export interface ServerUser {
  emotions?: ServerTag[]
  activities?: ServerTag[]
}

export interface ServerExperience {
  datetime: string
  situationStory?: string
  situationEmotions?: string[]
  situationActivities?: string[]
  solutionStory?: string
  solutionEmotions?: string[]
  solutionActivities?: string[]
}

export interface ServerHabit {
  id: string
  name: string
  experienceIds: string[]
}

// Types

export type ApiStatus = 'idle' | 'queued' | 'working' | 'finished' | 'error'
