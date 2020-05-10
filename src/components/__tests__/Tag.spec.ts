import { shallowMount } from '@vue/test-utils'

import Tag from '@/components/Tag.vue'

describe('Tag', () => {
  it('displays title', () => {
    const wrapper = shallowMount(Tag, {
      propsData: {
        title: 'Testing Tag Title',
      },
    })

    expect(wrapper.text()).toEqual('Testing Tag Title')
  })

  it('uses class based on tag type', () => {
    const wrapper = shallowMount(Tag, {
      propsData: {
        title: 'Testing Tag Title',
        type: 'positive',
      },
    })

    expect(wrapper.find('span.positive').exists()).toBe(true)
  })
})
