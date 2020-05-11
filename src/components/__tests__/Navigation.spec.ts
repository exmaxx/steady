import { shallowMount, ThisTypedShallowMountOptions } from '@vue/test-utils'
import Vue from 'vue'

import Navigation from '@/components/Navigation.vue'
import { withTextFilter } from '@/lib/test-helpers'
import { Habit } from '@/store/habits/types'

describe('Navigation', () => {
  let options: ThisTypedShallowMountOptions<Vue>

  beforeEach(() => {
    options = {
      propsData: {
        habits: [],
      },
      stubs: ['router-link'],
    }
  })

  it('displays habits', () => {
    const sampleIds = ['goodHabit', 'badHabit']
    const wrapper = shallowMount(Navigation, {
      ...options,
      propsData: {
        habits: sampleIds.map((id) => ({
          id,
          name: id,
          experienceIds: [],
        })) as Habit[],
      },
    })

    const habitBtns = wrapper
      .findAll('li')
      .filter((btn) => sampleIds.includes(btn.text()))

    expect(habitBtns.length).toBe(sampleIds.length)
  })

  it('provides Logout', () => {
    const wrapper = shallowMount(Navigation, options)

    const logoutBtn = withTextFilter(wrapper.findAll('a'))
      .hasExactText('Logout')
      .at(0)

    logoutBtn.trigger('click')

    expect(logoutBtn.exists()).toBe(true)
    expect(wrapper.emitted()['logout-click']?.length).toBe(1)
  })

  it('provides Add habit', () => {
    const wrapper = shallowMount(Navigation, options)

    const addBtn = withTextFilter(wrapper.findAll('li'))
      .hasExactText('Add Habit')
      .at(0)

    expect(addBtn.exists()).toBe(true)
    expect(addBtn.find('router-link-stub').exists()).toBe(true)
  })
})
