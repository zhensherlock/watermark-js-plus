import { describe, expect, test } from '@jest/globals'
import { Watermark } from '../../src/core/watermark'
import $ from 'jquery'

describe('core watermark module', () => {
  test('Watermark create expected true', async () => {
    const watermark = new Watermark({
      content: 'hello my watermark',
      width: 200,
      height: 200,
      zIndex: 2147483646
    })
    await watermark.create()
    const watermarkDom = $('body > div:last')
    expect(watermarkDom.css('z-index')).toBe('2147483646')
  })
})
