import { ApiStatus } from '@/lib/api/types'
import { Tag } from '@/store/types'

export interface AuthState {
  userId: string | null
  loginStatus: ApiStatus
}

export interface User {
  emotions: Tag[]
  activities: Tag[]
}
