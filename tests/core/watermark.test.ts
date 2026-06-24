import $ from 'jquery'
import { describe, expect, test } from '@jest/globals'
import { Watermark } from '../../src/core/watermark'
import { sleep } from '../utils'

describe('core watermark module', () => {
  test('parent sibling mutation should not recreate watermark', async () => {
    const parentElement = document.createElement('div')
    document.body.appendChild(parentElement)
    let destroyCount = 0
    const watermark = new Watermark({
      content: 'hello my watermark',
      width: 50,
      height: 50,
      zIndex: 2147483646,
      parent: parentElement,
      onBeforeDestroy: () => {
        destroyCount++
      },
    })
    try {
      await watermark.create()
      const watermarkDom = parentElement.lastElementChild

      const externalDom = document.createElement('div')
      externalDom.id = 'ai-assistant'
      parentElement.appendChild(externalDom)
      await sleep(20)

      expect(destroyCount).toBe(0)
      expect(parentElement.contains(watermarkDom)).toBe(true)
      expect(parentElement.lastElementChild).toBe(externalDom)
    } finally {
      watermark.destroy()
      parentElement.remove()
    }
  })

  test('removed watermark should be recreated by parent observer', async () => {
    const parentElement = document.createElement('div')
    document.body.appendChild(parentElement)
    const watermark = new Watermark({
      content: 'hello my watermark',
      width: 50,
      height: 50,
      zIndex: 2147483646,
      parent: parentElement,
    })
    try {
      await watermark.create()
      const watermarkDom = parentElement.lastElementChild

      watermarkDom?.remove()
      await sleep(20)

      expect(await watermark.check()).toBe(true)
      expect(parentElement.contains(watermarkDom)).toBe(false)
      expect((parentElement.lastElementChild as HTMLElement).style.zIndex).toBe('2147483646')
    } finally {
      watermark.destroy()
      parentElement.remove()
    }
  })

  test('text watermark expected true', async () => {
    const watermark = new Watermark({
      textBaseline: 'middle',
      translatePlacement: 'top',
      contentType: 'text',
      content: 'hello my watermark',
      textType: 'stroke',
      width: 200,
      height: 200,
      rotate: 22,
      zIndex: 2147483646,
      monitorProtection: true,
      movable: true,
    })
    await watermark.create()
    await watermark.check()

    await watermark.changeOptions(
      {
        textBaseline: 'top',
        translatePlacement: 'top-start',
        auxiliaryLine: true,
        layout: 'grid',
        gridLayoutOptions: {
          rows: 2,
          cols: 2,
          gap: [20, 20],
          matrix: [
            [1, 0],
            [0, 1],
          ],
        },
        advancedStyle: {
          type: 'linear',
          colorStops: [
            {
              offset: 0,
              color: 'red',
            },
            {
              offset: 1,
              color: 'blue',
            },
          ],
        },
        shadowStyle: {
          shadowBlur: 10,
          shadowColor: '#000000FF',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
        extraDrawFunc: () => {},
      },
      'append',
    )

    await watermark.changeOptions({
      backgroundRepeat: 'repeat-x',
    }, 'append')

    await watermark.changeOptions({
      backgroundRepeat: 'repeat-y',
    }, 'append')

    expect($('body > div:last').css('z-index')).toBe('2147483646')
    watermark.destroy()
    expect($('body > div:last').css('z-index')).toBe(undefined)
  })

  test('multi-line-text watermark expected true', async () => {
    const watermark = new Watermark({
      translatePlacement: 'top-end',
      contentType: 'multi-line-text',
      content: 'multi text watermark',
      textType: 'stroke',
      width: 200,
      height: 200,
      rotate: 22,
      zIndex: 2147483646,
    })
    await watermark.create()
    await watermark.changeOptions(
      {
        translatePlacement: 'bottom',
        advancedStyle: {
          type: 'radial',
          params: {
            radial: {
              x0: 0,
              y0: 0,
              r0: 0,
              x1: 0,
              y1: 0,
              r1: 0,
            },
          },
          colorStops: [
            { offset: 0, color: 'red' },
            { offset: 0.5, color: 'green' },
            { offset: 1, color: 'blue' },
          ],
        },
      },
      'append',
    )
    expect($('body > div:last').css('z-index')).toBe('2147483646')
    watermark.destroy()
    expect($('body > div:last').css('z-index')).toBe(undefined)
  })

  test('image watermark expected true', async () => {
    const watermark = new Watermark({
      translatePlacement: 'top',
      contentType: 'image',
      image: 'https://upic-1258271354.cos.ap-shanghai.myqcloud.com/uPic/github-XQkjmL.png',
      width: 200,
      height: 200,
      zIndex: 2147483646,
      filter: 'grayscale(100%)',
    })
    await watermark.create()
    await watermark.changeOptions(
      {
        translatePlacement: 'top-start',
        imageWidth: 100,
      },
      'append',
    )
    await watermark.changeOptions(
      {
        translatePlacement: 'top-end',
        imageHeight: 100,
      },
      'append',
    )
    await watermark.changeOptions(
      {
        translatePlacement: 'bottom',
      },
      'append',
    )
    await watermark.changeOptions(
      {
        translatePlacement: 'bottom-start',
      },
      'append',
    )
    await watermark.changeOptions(
      {
        translatePlacement: 'bottom-end',
      },
      'append',
    )
    await watermark.changeOptions(
      {
        translatePlacement: 'left',
      },
      'append',
    )
    await watermark.changeOptions(
      {
        translatePlacement: 'right',
      },
      'append',
    )

    expect($('body > div:last').css('z-index')).toBe('2147483646')
    watermark.destroy()
    expect($('body > div:last').css('z-index')).toBe(undefined)
  }, 50000)

  test('rich text watermark watermark expected true', async () => {
    const watermark = new Watermark({
      translatePlacement: 'left',
      contentType: 'rich-text',
      content:
        '<div style="background: #ccc;display: flex;flex-direction: column;"><div>how <span style="color: #f00;margin-left: 5px;">nice</span></div><br></div>',
      width: 300,
      height: 300,
      filter: 'blur(2px)',
      movable: true,
      zIndex: 2147483646,
    })
    await watermark.create()

    expect($('body > div:last').css('z-index')).toBe('2147483646')
    watermark.destroy()
    expect($('body > div:last').css('z-index')).toBe(undefined)
  }, 50000)
})
