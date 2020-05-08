import { shallowMount } from '@vue/test-utils'

import Welcome from '@/components/Welcome.vue'

describe('Welcome', function () {
  it('renders welcome message', function () {
    const wrapper = shallowMount(Welcome)

    expect(wrapper.text()).toEqual('Welcome to Steady.')
  })

  it('has slot', function () {
    const wrapper = shallowMount(Welcome, {
      slots: {
        default: 'Slot Test',
      },
    })

    expect(wrapper.text().indexOf('Slot Test')).toBeGreaterThanOrEqual(0)
  })
})
