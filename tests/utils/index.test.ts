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

  test('wraps characters wider than a line and preserves explicit line breaks', () => {
    const ctx = document.createElement('canvas').getContext('2d')!
    ctx.font = '20px sans-serif'
    const text = 'WW\n\nW'
    const measureText = ctx.measureText.bind(ctx)
    let measurements = 0
    ctx.measureText = value => {
      if (++measurements > text.length) {
        throw new Error('Text wrapping did not advance')
      }
      return measureText(value)
    }

    expect(utils.getMultiLineData(ctx, text, 5)).toEqual(['W', 'W', '', 'W'])
  })

  // test('createSVGElement expected false', () => {
  //   expect(utils.createSVGElement('svg'))
  // })
})
