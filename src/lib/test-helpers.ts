import { WrapperArray } from '@vue/test-utils'
import Vue from 'vue'

import { RootState } from '@/store/types'
import MockInstance = jest.MockInstance

/**
 * Sub-state of RootState suitable for providing just a part of the whole root state.
 */
export type LocalState = Partial<RootState>

/**
 * Allow you to search for elements by containing text.
 *
 * Copied from here: https://github.com/vuejs/vue-test-utils/issues/960#issuecomment-563155229
 *
 * @param wrapperArray
 */
export function withTextFilter(wrapperArray: WrapperArray<Vue>) {
  return {
    childSelectorHasText: (selector: string, str: string) =>
      wrapperArray.filter((i) =>
        i.find(selector).text().match(String(str).trim())
      ),

    hasExactText: (str: string) =>
      wrapperArray.filter((i) => i.text().match(String(str).trim())),

    includesText: (str: string) =>
      wrapperArray.filter((i) => i.text().includes(String(str).trim())),
  }
}

/**
 * Local spy for console.error
 */
let spyConsoleError: MockInstance<void, unknown[]>

/**
 * Disable console.error() output.
 */
export function disableConsoleErrors() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  spyConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
}

/**
 * Enable console.error() output.
 */
export function enableConsoleErrors() {
  spyConsoleError.mockRestore()
}
