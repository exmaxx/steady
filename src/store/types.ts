import { AuthState } from '@/store/auth/types'
import { ExperiencesState } from '@/store/experiences/types'
import { HabitsState } from '@/store/habits/types'
import { StatusesState } from '@/store/statuses/types'

export interface RootState {
  auth?: AuthState
  habits?: HabitsState
  experiences?: ExperiencesState
  statuses?: StatusesState
  emotions: Set<Tag>
  activities: Set<Tag>
}

export type Tag = string

export type Resource = keyof RootState
