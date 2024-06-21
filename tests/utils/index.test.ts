import { describe, expect, test } from '@jest/globals'
import * as utils from '../../src/utils'

describe('utils index module', () => {
  test('isFunction expected true', () => {
    expect(utils.isFunction(() => {})).toBe(true)
  })

  test('isUndefined expected true', () => {
    expect(utils.isUndefined(undefined)).toBe(true)
  })

  test('isUndefined expected false', () => {
    expect(utils.isUndefined(1)).toBe(false)
  })

  test('isString expected true', () => {
    expect(utils.isString('test')).toBe(true)
  })

  test('isString expected false', () => {
    expect(utils.isString(1)).toBe(false)
  })
})
