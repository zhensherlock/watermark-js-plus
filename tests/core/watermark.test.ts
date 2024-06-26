import $ from 'jquery'
import { describe, expect, test } from '@jest/globals'
import { Watermark } from '../../src/core/watermark'

describe('core watermark module', () => {
  test('Watermark create expected true', async () => {
    const watermark = new Watermark({
      content: 'hello my watermark',
      textType: 'stroke',
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
      extraDrawFunc: () => {},
      zIndex: 2147483646
    })
    await watermark.create()
    await watermark.changeOptions({
      auxiliaryLine: true,
      contentType: 'rich-text',
      content: 'multi text watermark',
      textType: 'stroke',
      shadowStyle: {
        shadowBlur: 10,
        shadowColor: '#000000FF',
        shadowOffsetX: 0,
        shadowOffsetY: 0
      },
      advancedStyle: {
        type: 'radial',
        params: {
          radial: {
            x0: 0,
            y0: 0,
            r0: 0,
            x1: 0,
            y1: 0,
            r1: 0
          }
        },
        colorStops: [
          { offset: 0, color: 'red' },
          { offset: 0.5, color: 'green' },
          { offset: 1, color: 'blue' }
        ]
      }
    }, 'append')
    expect($('body > div:last').css('z-index')).toBe('2147483646')
    watermark.destroy()
    expect($('body > div:last').css('z-index')).toBe(undefined)
  })
})
