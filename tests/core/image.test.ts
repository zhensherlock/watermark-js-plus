import $ from 'jquery'
import jimp from 'jimp'
import { describe, expect, test } from '@jest/globals'
import { ImageWatermark } from '../../src/core/image'
import imageWatermarkTextResult from '../assets/image-watermark-text-result.png'
import { base64ToBuffer, sleep } from '../utils'

const imageWatermarkOriginal =
  'https://upic-1258271354.cos.ap-shanghai.myqcloud.com/uPic/image-watermark-original-tuxD08.jpg'

describe('core image module', () => {
  test('image-watermark create expected true', async () => {
    document.body.innerHTML = `<img class='text-watermark-image' src='${imageWatermarkOriginal}'>`

    await sleep(10000)
    const imgDom = <HTMLImageElement>$('.text-watermark-image').get(0)
    const watermark = new ImageWatermark({
      content: 'my text watermark',
      width: imgDom.width,
      height: imgDom.height,
      dom: imgDom,
      rotate: 0,
      translatePlacement: 'bottom-end',
      fontColor: '#fff',
      globalAlpha: 0.5,
      fontSize: '30px',
    })
    await watermark.create()
    await sleep(10000)
    {
      const actualImage = await jimp.read(base64ToBuffer($('.text-watermark-image').attr('src')!))
      const expectedImage = await jimp.read(base64ToBuffer(imageWatermarkTextResult))
      const diff = jimp.diff(actualImage, expectedImage)
      expect(diff.percent).toBeLessThan(0.1)
    }
    watermark.destroy()
    expect($('.text-watermark-image').attr('src')).toBe(imageWatermarkOriginal)
  }, 600000)
})
