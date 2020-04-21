import { AuthState } from '@/store/auth/types'
import { ExperiencesState } from '@/store/experiences/types'
import { ThreadsState } from '@/store/threads/types'

export interface RootState {
  auth?: AuthState
  experiences?: ExperiencesState
  threads?: ThreadsState
  emotions: Tag[]
  activities: Tag[]
}

export type Tag = string
