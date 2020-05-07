export interface Experience {
  id: string
  datetime: string
  situationStory: string
  situationEmotions: string[]
  situationActivities: string[]
  solutionStory: string
  solutionEmotions: string[]
  solutionActivities: string[]

  /** 1: positive, 0: neutral, -1: negative  */
  solutionAspect: number
}

export type ExperiencesState = Experience[]
