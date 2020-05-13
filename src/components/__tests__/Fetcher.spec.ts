import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

import Fetcher from '@/components/Fetcher.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Fetcher', () => {
  it('call fetchAll when created', () => {
    const actions = {
      fetchAll: jest.fn(),
    }

    const store = new Vuex.Store({
      // state,
      actions,
    })

    shallowMount(Fetcher, {
      store,
      localVue,
      stubs: ['spinner'],
    })

    expect(actions.fetchAll).toBeCalledTimes(1)
  })
})
