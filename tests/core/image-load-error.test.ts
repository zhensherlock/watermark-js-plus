import { afterEach, describe, expect, jest, test } from '@jest/globals'
import { ImageWatermark } from '../../src/core/image'

function makeImageLoadsFail() {
  // Exercise the real loader and canvas dispatcher without external images or jsdom's resource loader.
  jest.spyOn(globalThis, 'Image').mockImplementation(() => {
    const image = document.createElement('img')
    Object.defineProperty(image, 'src', {
      set() {
        queueMicrotask(() => image.dispatchEvent(new Event('error')))
      },
    })
    return image
  })
}

async function settleWithin<T>(promise: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error('render did not settle')), 500)
      }),
    ])
  } finally {
    clearTimeout(timer)
  }
}

describe('ImageWatermark load errors', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test.each([
    { contentType: 'image' as const, image: 'data:image/png;base64,ZmFrZQ==' },
    { contentType: 'rich-text' as const, content: '<strong>watermark</strong>' },
  ])('rejects when the $contentType watermark cannot load', async options => {
    makeImageLoadsFail()
    const dom = document.createElement('img')
    const original = dom.src
    const watermark = new ImageWatermark({ dom, ...options })

    await expect(settleWithin(watermark.create())).rejects.toThrow('Failed to load watermark image')
    expect(dom.src).toBe(original)
  })
})
