/**
 * Thread model. Representing one thread that starts and ends in certain time.
 */
import { Experience } from '@/store/experiences/types'

export interface Thread {
  id?: string
  startDatetime: string
  endDatetime: string
}

/**
 * Title says it all. Threads state.
 */
export type ThreadsState = Thread[]

/**
 * Experiences assigned to thread. Key is thread id, value is ids of experiences.
 */
export interface ExperiencesForThreads {
  [threadId: string]: Experience[]
}
