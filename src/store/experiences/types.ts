export interface Experience {
  id: string
  datetime: string
  situationStory: string
  situationEmotions: string[]
  situationActivities: string[]
  reactionStory: string
  reactionEmotions: string[]
  reactionActivities: string[]

  /** 1: positive, 0: neutral, -1: negative  */
  reactionAspect: number
}

export type ExperiencesState = Experience[]
