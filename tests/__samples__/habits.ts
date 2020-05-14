import { sampleExperience, sampleServerExperience } from './experiences'

import { Habit } from '@/store/habits/types'

export const sampleHabit: Habit = {
  id: 'sampleHabit',
  name: 'I will start naming my habits more creatively',
  experienceIds: [sampleExperience.id],
}

export const sampleServerHabit: Habit = {
  id: 'sampleHabit',
  name: 'I will start naming my habits more creatively',
  experienceIds: [sampleServerExperience.id],
}
