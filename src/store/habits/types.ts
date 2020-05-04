export interface Habit {
  id: string
  name: string
  experienceIds: string[]
}

export interface Habits {
  [id: string]: Habit
}

export type HabitsState = Habits
