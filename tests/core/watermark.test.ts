import { describe, expect, test } from '@jest/globals'
import { Watermark } from '../../src/core/watermark'
import $ from 'jquery'

describe('core watermark module', () => {
  test('Watermark create expected true', async () => {
    const watermark = new Watermark({
      content: 'hello my watermark',
      width: 200,
      height: 200,
      rotate: 22,
      layout: 'grid',
      gridLayoutOptions: {
        rows: 2,
        cols: 2,
        gap: [20, 20],
        matrix: [[1, 0], [0, 1]]
      },
      advancedStyle: {
        type: 'linear',
        colorStops: [
          {
            offset: 0,
            color: 'red'
          },
          {
            offset: 1,
            color: 'blue'
          }
        ]
      },
      zIndex: 2147483646
    })
    await watermark.create()
    expect($('body > div:last').css('z-index')).toBe('2147483646')
    watermark.destroy()
    expect($('body > div:last').css('z-index')).toBe(undefined)
  })
})
