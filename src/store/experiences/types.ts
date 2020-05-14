export enum AspectType {
  Negative = -1,
  Neutral = 0,
  Positive = 1,
}

export interface Experience {
  id: string
  datetime: string
  situationStory?: string
  situationEmotions?: string[]
  situationActivities?: string[]
  reactionStory?: string
  reactionEmotions?: string[]
  reactionActivities?: string[]
  reactionAspect?: AspectType
}

export type ExperiencesState = Experience[]
