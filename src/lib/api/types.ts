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

export type ApiStatus = 'idle' | 'queued' | 'working' | 'finished' | 'error'
