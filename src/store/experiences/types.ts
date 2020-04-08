export interface Experience {
  datetime: string
  situation: string
  situationEmotions: string[]
  situationActivities: string[]
  solution: string
  solutionEmotions: string[]
  solutionActivities: string[]
}

export type ExperiencesState = Experience[]
