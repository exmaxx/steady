import { ApiStatus } from '@/lib/api/types'
import { Resource } from '@/store/types'

export type StatusesState = {
  [resource in Resource]: ApiStatus
}
