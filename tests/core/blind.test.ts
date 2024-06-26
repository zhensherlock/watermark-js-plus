import $ from 'jquery'
import { describe, expect, test } from '@jest/globals'
import { BlindWatermark } from '../../src/core/blind'
import decodeImage from '../assets/blind-watermark-decode-result.png'

describe('core blind module', () => {
  test('blind-watermark create expected true', async () => {
    const watermark = new BlindWatermark({
      contentType: 'multi-line-text',
      content: 'hello my watermark',
      width: 200,
      height: 200,
      zIndex: 2147483646,
      translatePlacement: 'top',
      textBaseline: 'bottom'
    })
    await watermark.create()
    expect($('body > div:last').css('z-index')).toBe('2147483646')
    watermark.destroy()
    expect($('body > div:last').css('z-index')).toBe(undefined)
  })

  test('blind-watermark decode expected true', (done) => {
    BlindWatermark.decode({
      url: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/blind-watermark-X9D8to.png',
      onSuccess: (res: any) => {
        done()
        expect(res).toBe(decodeImage)
      }
    })
  }, 10000)
})
