import { JOGGING, THINKING, USING_COMPUTER } from './activities'
import { HAPPY, SAD } from './emotions'

import { ServerExperience } from '@/lib/api/types'
import { Experience } from '@/store/experiences/types'

export const experienceSample: Experience = {
  id: 'sAmPleId',
  datetime: '2020-05-13T17:53:01.494Z',
  situationStory: 'On a computer, working.',
  situationActivities: [USING_COMPUTER, THINKING],
  situationEmotions: [SAD],
  reactionStory: 'Went outside and started jogging.',
  reactionActivities: [JOGGING],
  reactionEmotions: [HAPPY],
  reactionAspect: 1,
}

export const serverExperienceSample: ServerExperience = {
  id: 'sAmPleSerVerId',
  datetime: '2019-04-14T14:53:02.443Z',
  situationStory: 'Thinking about a problem.',
  situationActivities: [USING_COMPUTER, THINKING],
  situationEmotions: [SAD],
  reactionStory: 'Jogging.',
  reactionActivities: [JOGGING],
  reactionEmotions: [HAPPY],
  reactionAspect: 1,
}
