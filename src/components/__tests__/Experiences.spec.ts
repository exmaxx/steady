import { shallowMount } from '@vue/test-utils'

import Experiences from '@/components/Experiences.vue'
import { createEmptyExperience } from '@/lib/helpers'
import { getPropsDef } from '@/lib/test-helpers'

describe('Experiences', function () {
  it('has required prop "experiences"', () => {
    // TODO: Introduce try catch (so that when the param doesnt exist we catch it and assesr it)
    const props = getPropsDef(Experiences)

    expect(props).toHaveProperty('experiences')
    expect(props['experiences']).toHaveProperty('required', true)
  })

  it('renders experiences', () => {
    const experiences = [
      createEmptyExperience(),
      createEmptyExperience(),
      createEmptyExperience(),
    ]

    const wrapper = shallowMount(Experiences, {
      propsData: {
        experiences,
      },
      stubs: ['experiences'],
    })

    expect(wrapper.findAll('experience-stub').length).toBe(experiences.length)
  })

  it('renders nothing when experiences field empty', () => {
    const wrapper = shallowMount(Experiences, {
      propsData: {
        experiences: [],
        stubs: ['experiences'],
      },
    })

    expect(wrapper.findAll('experience-stub').length).toBe(0)
  })
})
