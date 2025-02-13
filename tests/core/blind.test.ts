import $ from 'jquery'
import jimp from 'jimp'
import { describe, expect, test } from '@jest/globals'
import { BlindWatermark } from '../../src/core/blind'
import decodeImage from '../assets/blind-watermark-decode-result.png'
import { base64ToBuffer } from '../utils'

describe('core blind module', () => {
  test('blind-watermark create expected true', async () => {
    const watermark = new BlindWatermark({
      contentType: 'multi-line-text',
      content: 'hello my watermark',
      width: 200,
      height: 200,
      zIndex: 2147483646,
      translatePlacement: 'right',
      textBaseline: 'bottom'
    })
    await watermark.create()
    await watermark.changeOptions()
    expect($('body > div:last').css('z-index')).toBe('2147483646')
    watermark.destroy()
    expect($('body > div:last').css('z-index')).toBe(undefined)
  })

  test('blind-watermark decode expected true', (done) => {
    BlindWatermark.decode({
      url: 'https://upic-1258271354.cos.ap-shanghai.myqcloud.com/uPic/blind-watermark-7xVnIB.png',
      onSuccess: async (res: any) => {
        const actualImage = await jimp.read(base64ToBuffer(res))
        const expectedImage = await jimp.read(base64ToBuffer(decodeImage))
        const diff = jimp.diff(actualImage, expectedImage)
        done()
        expect(diff.percent).toBe(0)
      }
    })
  }, 10000)
})
