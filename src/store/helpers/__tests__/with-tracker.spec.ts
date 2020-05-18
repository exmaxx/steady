import WithTracker from '@/store/helpers/with-tracker'
import {
  SET_STATUS_FINISHED,
  SET_STATUS_WORKING,
} from '@/store/statuses/mutations'

describe('WithTracker', () => {
  const resource = 'experiences'
  const commitMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('runPromise()', () => {
    const samplePromise = Promise.resolve()

    it('set status to "working" before the promise is processed', async () => {
      const withTracker = new WithTracker(resource, commitMock)

      await withTracker.runPromise(
        samplePromise.then(() => {
          // NOTE: This is the first "then" in the chain and so we can check what happened
          //  to `commitMock` before the second "then" (which adds status change to finished).
          expect(commitMock).toHaveBeenCalledTimes(1)
          expect(commitMock).toHaveBeenCalledWith(SET_STATUS_WORKING, resource)
        })
      )
    })

    it('set status to "finished" after the promise resolves', async () => {
      const withTracker = new WithTracker(resource, commitMock)

      await withTracker.runPromise(samplePromise)

      expect(commitMock).toHaveBeenCalledTimes(2)
      expect(commitMock).toHaveBeenNthCalledWith(
        2,
        SET_STATUS_FINISHED,
        resource
      )
    })
  })

  describe('runAsync()', () => {
    it('set status to "working" before the function is called', async () => {
      expect.assertions(2)

      const withTracker = new WithTracker(resource, commitMock)

      const fn = () => {
        expect(commitMock).toHaveBeenCalledTimes(1)
        expect(commitMock).toHaveBeenCalledWith(SET_STATUS_WORKING, resource)
      }

      await withTracker.runAsync(fn)
    })

    it('set status to "finished" after the promise resolves', async () => {
      const withTracker = new WithTracker(resource, commitMock)

      const fn = () => null

      await withTracker.runAsync(fn)

      expect(commitMock).toHaveBeenCalledTimes(2)
      expect(commitMock).toHaveBeenNthCalledWith(
        2,
        SET_STATUS_FINISHED,
        resource
      )
    })

    it('returns result of the function', async () => {
      const withTracker = new WithTracker(resource, commitMock)

      const fn = () => 'mockito'

      const result = await withTracker.runAsync(fn)

      expect(result).toBe('mockito')
    })
  })
})
