import $ from 'jquery'
import { describe, expect, test } from '@jest/globals'
import { Watermark } from '../../src/core/watermark'

describe('core watermark module', () => {
  test('text watermark expected true', async () => {
    const watermark = new Watermark({
      contentType: 'text',
      content: 'hello my watermark',
      textType: 'stroke',
      width: 200,
      height: 200,
      rotate: 22,
      zIndex: 2147483646
    })
    await watermark.create()

    await watermark.changeOptions({
      auxiliaryLine: true,
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
      shadowStyle: {
        shadowBlur: 10,
        shadowColor: '#000000FF',
        shadowOffsetX: 0,
        shadowOffsetY: 0
      },
      extraDrawFunc: () => {}
    }, 'append')

    expect($('body > div:last').css('z-index')).toBe('2147483646')
    watermark.destroy()
    expect($('body > div:last').css('z-index')).toBe(undefined)
  })

  test('multi-line-text watermark expected true', async () => {
    const watermark = new Watermark({
      contentType: 'multi-line-text',
      content: 'multi text watermark',
      textType: 'stroke',
      width: 200,
      height: 200,
      rotate: 22,
      zIndex: 2147483646
    })
    await watermark.create()
    await watermark.changeOptions({
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

  test('image watermark expected true', async () => {
    const watermark = new Watermark({
      contentType: 'image',
      image: 'https://upic-1258271354.cos.ap-shanghai.myqcloud.com//uPic/github-XQkjmL.png',
      width: 200,
      height: 200,
      zIndex: 2147483646,
      imageWidth: 100,
      filter: 'grayscale(100%)'
    })
    await watermark.create()

    expect($('body > div:last').css('z-index')).toBe('2147483646')
    watermark.destroy()
    expect($('body > div:last').css('z-index')).toBe(undefined)
  })

  test('rich text watermark watermark expected true', async () => {
    const watermark = new Watermark({
      contentType: 'rich-text',
      content: '<div style="background: #ccc;display: flex;flex-direction: column;"><div>how <span style="color: #f00;margin-left: 5px;">nice</span></div></div>',
      width: 300,
      height: 300,
      filter: 'blur(2px)',
      movable: true,
      zIndex: 2147483646
    })
    await watermark.create()

    expect($('body > div:last').css('z-index')).toBe('2147483646')
    watermark.destroy()
    expect($('body > div:last').css('z-index')).toBe(undefined)
  }, 50000)
})
