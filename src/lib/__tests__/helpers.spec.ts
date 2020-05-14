import { generateId, isEmptyProperty, withoutEmptyFields } from '@/lib/helpers'

describe('HELPERS', () => {
  describe('isEmptyProperty', () => {
    it('detects empty arrays, objects, zero length strings, nulls and undefined values', () => {
      expect(isEmptyProperty({})).toBe(true)
      expect(isEmptyProperty([])).toBe(true)
      expect(isEmptyProperty('')).toBe(true)
      expect(isEmptyProperty(null)).toBe(true)
      expect(isEmptyProperty(undefined)).toBe(true)
    })

    it('does not detect the rest', () => {
      expect(isEmptyProperty({ hey: 'girls' })).toBe(false)
      expect(isEmptyProperty(['hey', 'boys'])).toBe(false)
      expect(isEmptyProperty('superstar djs')).toBe(false)
      expect(isEmptyProperty(true)).toBe(false)
      expect(isEmptyProperty(false)).toBe(false)
      expect(isEmptyProperty(123)).toBe(false)
    })
  })

  describe('removeEmptyFrom', () => {
    it('does not modify the original object', () => {
      const obj = {
        emptyString: '',
        emptyObject: {},
        emptyArray: [],
        nullValue: null,
        undefinedValue: undefined,
      }

      expect(withoutEmptyFields(obj)).not.toBe(obj)
    })

    it('removes different kinds of empty values', () => {
      const obj = {
        emptyString: '',
        emptyObject: {},
        emptyArray: [],
        nullValue: null,
        undefinedValue: undefined,
      }

      expect(withoutEmptyFields(obj)).toEqual({})
    })

    it('leaves non-empty values', () => {
      const template = {
        str: 'cini minies',
        obj: { cini: 'minies' },
        arr: ['cini minies'],
        num: 12,
        negBool: false,
        posBool: true,
      }

      const obj = {
        ...template,
      }

      expect(withoutEmptyFields(obj)).not.toBe(template)
      expect(withoutEmptyFields(obj)).toEqual(template)
    })
  })

  describe('generateId', () => {
    it('generates string of specified length', () => {
      const id = generateId(16)

      expect(typeof id).toBe('string')
      expect(id.length).toBe(16)
    })

    it('does not repeat', () => {
      const id1 = generateId(16)
      const id2 = generateId(16)

      expect(id1).not.toBe(id2)
      expect(id1).not.toEqual(id2)
    })
  })
})
