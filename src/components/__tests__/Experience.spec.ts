import { shallowMount } from '@vue/test-utils'
import dayjs from 'dayjs'

import Experience from '@/components/Experience.vue'
import { createEmptyExperience } from '@/lib/helpers'
import {
  registerDayjsExtensions,
  registerVueFilters,
} from '@/lib/initialization'
import { getPropsDef } from '@/lib/test-helpers'

registerVueFilters()
registerDayjsExtensions()

describe('Experience', function () {
  it('has required prop "experience"', function () {
    const props = getPropsDef(Experience)

    expect(props).toHaveProperty('experience')
    expect(props['experience']).toHaveProperty('required', true)
  })

  it('renders situation details when present', function () {
    const testDescription = 'I have a good mood.'
    const activities = ['jogging']
    const emotions = ['happiness', 'fun']

    const wrapper = shallowMount(Experience, {
      propsData: {
        experience: {
          ...createEmptyExperience(),
          datetime: dayjs().toISOString(),
          situationStory: testDescription,
          situationEmotions: emotions,
          situationActivities: activities,
        },
      },
      stubs: ['router-link'],
    })

    expect(wrapper.find('.situation .story').exists()).toEqual(true)

    const tagGroups = wrapper.findAll('.situation .tags')

    expect(tagGroups.length).toEqual(2)
    expect(tagGroups.at(0).findAll('li').length).toEqual(activities.length)
    expect(tagGroups.at(1).findAll('li').length).toEqual(emotions.length)
  })

  it('renders reaction details when present', function () {
    const testDescription = 'I have a good mood.'
    const activities = ['jogging']
    const emotions = ['happiness', 'fun']

    const wrapper = shallowMount(Experience, {
      propsData: {
        experience: {
          ...createEmptyExperience(),
          datetime: dayjs().toISOString(),
          reactionStory: testDescription,
          reactionEmotions: emotions,
          reactionActivities: activities,
        },
      },
      stubs: ['router-link'],
    })

    expect(wrapper.find('.reaction .story').exists()).toEqual(true)

    const tagGroups = wrapper.findAll('.reaction .tags')

    expect(tagGroups.length).toEqual(2)
    expect(tagGroups.at(0).findAll('li').length).toEqual(activities.length)
    expect(tagGroups.at(1).findAll('li').length).toEqual(emotions.length)
  })

  it('renders nothing for empty details', function () {
    const wrapper = shallowMount(Experience, {
      propsData: {
        experience: createEmptyExperience(),
      },
      stubs: ['router-link'],
    })

    expect(wrapper.find('.situation .story').exists()).toEqual(false)
    expect(wrapper.find('.situation .tags').exists()).toEqual(false)

    expect(wrapper.find('.reaction .story').exists()).toEqual(false)
    expect(wrapper.find('.reaction .tags').exists()).toEqual(false)
  })
})
