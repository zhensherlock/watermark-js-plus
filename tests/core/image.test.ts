import $ from 'jquery'
import { describe, expect, test } from '@jest/globals'
import { ImageWatermark } from '../../src/core/image'
import imageWatermarkTextResult from '../assets/image-watermark-text-result.png'

const imageWatermarkOriginal = 'https://upic-1258271354.cos.ap-shanghai.myqcloud.com//uPic/image-watermark-original-tuxD08.jpg'

describe('core image module', () => {
  test('image-watermark create expected true', (done) => {
    document.body.innerHTML = `<img class="text-watermark-image" src="${imageWatermarkOriginal}">`

    setTimeout(async () => {
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
        fontSize: '30px'
      })
      await watermark.create()
      done()
      expect($('.text-watermark-image').attr('src')).toBe(imageWatermarkTextResult)
      watermark.destroy()
      expect($('.text-watermark-image').attr('src')).toBe(imageWatermarkOriginal)
    }, 5000)
  }, 10000)
})
