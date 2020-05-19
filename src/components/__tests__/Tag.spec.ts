import { shallowMount } from '@vue/test-utils'

import Tag from '@/components/Tag.vue'

describe('Tag', () => {
  it('displays title', () => {
    const sampleTitle = 'Testing Tag Title'

    const wrapper = shallowMount(Tag, {
      propsData: {
        title: sampleTitle,
      },
    })

    expect(wrapper.text()).toEqual(sampleTitle)
  })

  it('uses class based on tag type', () => {
    const sampleTagType = 'positive'

    const wrapper = shallowMount(Tag, {
      propsData: {
        title: 'Testing Tag Title',
        type: sampleTagType,
      },
    })

    expect(wrapper.find('span').classes()).toContain(sampleTagType)
  })
})
