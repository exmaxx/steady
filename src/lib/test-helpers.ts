import { WrapperArray } from '@vue/test-utils'
import Vue, { VueConstructor } from 'vue'
import { DefaultProps, RecordPropsDefinition } from 'vue/types/options'

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

/**
 * Get props of the component.
 *
 * Note: Easier way would be to have definition of options as a separate exported variable
 * but that would be only for tests and I am avoiding that when possible.
 *
 * This way I need to create the component and extract the prop from its options. However,
 * when not initialized fully (with all props) it generates console errors. I do not want
 * to initialize the component fully when just examining props definitions. Therefore I suppress
 * the conosole errors.
 *
 * @param Component component to be tested
 */
export function getPropsDef(
  Component: VueConstructor
): RecordPropsDefinition<DefaultProps> {
  disableConsoleErrors()

  const props = new Component().$options.props as RecordPropsDefinition<
    DefaultProps
  >

  enableConsoleErrors()

  return props
}
