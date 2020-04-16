import { Thread, ThreadsState } from '@/store/threads/types'

export default {
  getActiveThread: (state: ThreadsState): Thread | null =>
    state.find(thread => thread.endDatetime === '') || null,
}
