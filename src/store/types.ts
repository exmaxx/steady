import { ExperiencesState } from '@/store/experiences/types'

export interface RootState {
  experiences: ExperiencesState
  emotions: Tag[]
}

export type Tag = string
