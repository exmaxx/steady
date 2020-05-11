import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex, { ActionTree, Store } from 'vuex'

import Auth from '@/components/Auth.vue'
import Spinner from '@/components/Spinner.vue'
import Welcome from '@/components/Welcome.vue'
import { LocalState } from '@/lib/test-helpers'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Auth', function () {
  let state: LocalState
  let actions: ActionTree<LocalState, LocalState>
  let store: Store<LocalState>

  beforeEach(() => {
    actions = {
      attemptLogin: jest.fn(),
      registerLoginHook: jest.fn(),
    }
  })

  describe('when authorization check in progress', () => {
    beforeEach(() => {
      state = {
        auth: {
          userId: null,
          loginStatus: 'working',
        },
      }

      store = new Vuex.Store({
        state,
        actions,
      })
    })

    it('renders welcome message and spinner', () => {
      const wrapper = shallowMount(Auth, {
        store,
        localVue,
        components: {
          Spinner,
        },
      })

      expect(wrapper.findComponent(Welcome).exists()).toBe(true)
      expect(wrapper.findComponent(Spinner).exists()).toBe(true)
    })
  })

  describe('when user logged in', () => {
    beforeEach(() => {
      state = {
        auth: {
          userId: 'tEsTiD',
          loginStatus: 'finished',
        },
      }

      store = new Vuex.Store({
        state,
        actions,
      })
    })

    it('renders content', () => {
      const wrapper = shallowMount(Auth, {
        store,
        localVue,
        slots: {
          default: 'content',
        },
      })

      expect(wrapper.text()).toMatch('content')
    })
  })

  describe('when authorization check finished but user not logged in', () => {
    beforeEach(() => {
      state = {
        auth: {
          userId: null,
          loginStatus: 'finished',
        },
      }

      store = new Vuex.Store({
        state,
        actions,
      })
    })

    it('renders content', () => {
      const wrapper = shallowMount(Auth, {
        store,
        localVue,
        slots: {
          default: 'content',
        },
      })

      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.text()).toContain('Login')
      expect(wrapper.text()).not.toContain('content')
    })
  })
})
