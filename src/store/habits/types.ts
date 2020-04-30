import { Experience } from '@/store/experiences/types'

export interface Habit {
  id: string
  name: string
  experiences?: Experience[]
}

export interface Habits {
  [id: string]: Habit
}

export type HabitsState = Habits
