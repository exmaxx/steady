import { AuthState } from '@/store/auth/types'
import { ExperiencesState } from '@/store/experiences/types'

export interface RootState {
  auth?: AuthState
  experiences?: ExperiencesState
  emotions: Tag[]
  activities: Tag[]
}

export type Tag = string
