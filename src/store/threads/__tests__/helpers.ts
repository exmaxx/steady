import dayjs from 'dayjs'

import { Thread } from '@/store/threads/types'

export const TEST_ID = 'testId'

export const createSampleThread = (id: string, active = false): Thread => ({
  id,
  startDatetime: dayjs().toISOString(),
  endDatetime: active
    ? ''
    : dayjs()
        .add(1, 'day')
        .toISOString(),
})
