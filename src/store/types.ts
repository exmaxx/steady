import { ExperiencesState } from '@/store/experiences/types'
import {ThreadsState} from "@/store/threads/types";

export interface RootState {
  experiences?: ExperiencesState
  threads?: ThreadsState
  emotions: Tag[]
  activities: Tag[]
}

export type Tag = string
