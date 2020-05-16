import { shallowMount } from '@vue/test-utils'
import { ComponentOptions } from 'vue'
import Vue from 'vue'

import { isFunction, withTextFilter } from '@/lib/test-helpers'

describe('Helpers for tests', () => {
  describe('withTextFilter', () => {
    it('has methods for text detection', () => {
      const SampleComponent: ComponentOptions<Vue> = {
        template:
          '<div><li>Sample 1</li><li>Sample 2</li><li>Sample 3</li></div>',
      }

      const wrapperArray = shallowMount(SampleComponent).findAll('li')

      const helper = withTextFilter(wrapperArray)

      expect(helper).toHaveProperty('hasExactText')
      expect(helper).toHaveProperty('includesText')
      expect(helper).toHaveProperty('childSelectorHasText')
    })

    it('finds wrapper by text', () => {
      const SampleComponent: ComponentOptions<Vue> = {
        template:
          '<div><li>Sample 1</li><li>Sample 2</li><li>Sample 3</li></div>',
      }

      const wrapperArray = shallowMount(SampleComponent).findAll('li')

      const filtered = withTextFilter(wrapperArray).hasExactText('Sample 1')

      expect(filtered.length).toBe(1)
      expect(filtered.at(0).text()).toBe('Sample 1')
    })
  })

  describe('isFunction', () => {
    it('detects function (and only function)', () => {
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction({})).toBe(false)
      expect(isFunction('hi')).toBe(false)
      expect(isFunction(3)).toBe(false)
      expect(isFunction(true)).toBe(false)
    })
  })
})
