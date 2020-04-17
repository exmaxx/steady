import { Thread, ThreadsState } from '@/store/threads/types'

export default {
  activeThread: (state: ThreadsState): Thread | null =>
    state.find(thread => thread.endDatetime === '') || null,
}
