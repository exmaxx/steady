export interface Experience {
  date: string
  time: string
  situation: string
  situationEmotions: string[]
  situationActivities: string[]
  solution: string
  solutionEmotions: string[]
  solutionActivities: string[]
}

export type ExperiencesState = Experience[]
