export interface Experience {
  datetime: string
  situationStory: string
  situationEmotions: string[]
  situationActivities: string[]
  solutionStory: string
  solutionEmotions: string[]
  solutionActivities: string[]
}

export type ExperiencesState = Experience[]
