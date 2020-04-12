export type ServerTag = string

export interface ServerUser {
  emotions: string[]
  activities: string[]
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
