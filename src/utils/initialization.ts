import { AdvancedStyleParamsType, TextAlignType, TextBaselineType, WatermarkOptions } from '../types'
import { getMultiLineData, isUndefined } from './index'

export const initialOptions = {
  width: 300,
  height: 300,
  rotate: 45,
  auxiliaryLine: false,
  translatePlacement: 'middle',
  contentType: 'text',
  content: 'hello watermark-js-plus',
  textType: 'fill',
  imageWidth: 0,
  imageHeight: 0,
  lineHeight: 30,
  zIndex: 2147483647,
  backgroundPosition: '0 0, 0 0',
  backgroundRepeat: 'repeat',
  fontSize: '20px',
  fontFamily: 'sans-serif',
  fontStyle: '',
  fontVariant: '',
  fontColor: '#000',
  fontWeight: 'normal',
  filter: 'none',
  globalAlpha: 0.5,
  mode: 'default',
  mutationObserve: true,
  unique: true,
  parent: 'body',
  onSuccess: () => {},
  onBeforeDestroy: () => {},
  onDestroyed: () => {}
}

export const generateRecommendOptions = (canvas: HTMLCanvasElement, options: WatermarkOptions, args: Partial<WatermarkOptions>) => {
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    throw new Error('get context error')
  }
  ctx.font = `${options.fontStyle} ${options.fontVariant} ${options.fontWeight} ${options.fontSize} ${options.fontFamily}`
  ctx.filter = options.filter
  if (options?.rotate) {
    options.rotate = (360 - options.rotate % 360) * (Math.PI / 180)
  }
  if (isUndefined(args.textRowMaxWidth)) {
    options.textRowMaxWidth = options.width
  }
  const result = {
    image: {
      rect: {
        width: options.imageWidth,
        height: options.imageHeight
      },
      position: {
        x: 0,
        y: 0
      }
    },
    textLine: {
      data: [] as string[],
      yOffsetValue: 0
    },
    advancedStyleParams: {
      linear: {
        x0: 0,
        x1: 0
      },
      radial: {
        x0: 0,
        y0: 0,
        r0: 0,
        x1: 0,
        y1: 0,
        r1: 0
      },
      conic: {
        x: 0,
        y: 0,
        startAngle: 0
      },
      pattern: {}
    } as AdvancedStyleParamsType
  }
  switch (options.contentType) {
    case 'text':
      result.textLine.data = [options.content]
      break
    // case 'image':
    //   break
    case 'multi-line-text':
      result.textLine.data = getMultiLineData(ctx, options.content, <number> options.textRowMaxWidth)
      break
    // case 'rich-text':
    //   break
  }
  let translateX: number = options.width / 2
  let translateY: number = options.height / 2
  let textBaseline: TextBaselineType = 'middle'
  let textAlign: TextAlignType = 'center'

  if (!isUndefined(args?.translateX) && !isUndefined(args?.translateY)) {
    translateX = <number> args?.translateX
    translateY = <number> args?.translateY
    textBaseline = 'top'
    textAlign = 'left'
  } else {
    // default middle
    // translateX = options.width / 2
    // translateY = options.height / 2
    // TextBaselineType = 'middle'
    // textAlign = 'center'
    result.advancedStyleParams.linear.x0 = -options.width / 2
    result.advancedStyleParams.linear.x1 = options.width / 2
    // result.advancedStyleParams.radial.x0 = 0
    // result.advancedStyleParams.radial.y0 = 0
    result.advancedStyleParams.radial.r0 = 0
    // result.advancedStyleParams.radial.x1 = 0
    // result.advancedStyleParams.radial.y1 = 0
    result.advancedStyleParams.radial.r1 = options.width / 2
    // result.advancedStyleParams.conic.x = 0
    // result.advancedStyleParams.conic.y = 0
  }
  switch (args.translatePlacement) {
    case 'top':
      translateX = options.width / 2
      translateY = 0
      textBaseline = 'top'
      // textAlign = 'center'
      result.advancedStyleParams.linear.x0 = -options.width / 2
      result.advancedStyleParams.linear.x1 = options.width / 2
      // result.advancedStyleParams.radial.x0 = 0
      result.advancedStyleParams.radial.y0 = result.textLine.data.length * options.lineHeight / 2
      // result.advancedStyleParams.radial.r0 = 0
      // result.advancedStyleParams.radial.x1 = 0
      // result.advancedStyleParams.radial.y1 = 0
      result.advancedStyleParams.radial.y1 = result.textLine.data.length * options.lineHeight / 2
      // result.advancedStyleParams.radial.r1 = options.width / 2
      // result.advancedStyleParams.conic.x = 0
      result.advancedStyleParams.conic.y = result.textLine.data.length * options.lineHeight / 2
      break
    case 'top-start':
      translateX = 0
      translateY = 0
      textBaseline = 'top'
      textAlign = 'start'
      result.advancedStyleParams.linear.x0 = 0
      result.advancedStyleParams.linear.x1 = options.width
      result.advancedStyleParams.radial.x0 = options.width / 2
      result.advancedStyleParams.radial.y0 = result.textLine.data.length * options.lineHeight / 2
      // result.advancedStyleParams.radial.r0 = 0
      result.advancedStyleParams.radial.x1 = options.width / 2
      result.advancedStyleParams.radial.y1 = result.textLine.data.length * options.lineHeight / 2
      // result.advancedStyleParams.radial.r1 = options.width / 2
      result.advancedStyleParams.conic.x = options.width / 2
      result.advancedStyleParams.conic.y = result.textLine.data.length * options.lineHeight / 2
      break
    case 'top-end':
      translateX = options.width
      translateY = 0
      textBaseline = 'top'
      textAlign = 'end'
      result.advancedStyleParams.linear.x0 = 0
      result.advancedStyleParams.linear.x1 = -options.width
      result.advancedStyleParams.radial.x0 = -options.width / 2
      result.advancedStyleParams.radial.y0 = result.textLine.data.length * options.lineHeight / 2
      // result.advancedStyleParams.radial.r0 = 0
      result.advancedStyleParams.radial.x1 = -options.width / 2
      result.advancedStyleParams.radial.y1 = result.textLine.data.length * options.lineHeight / 2
      // result.advancedStyleParams.radial.r1 = options.width / 2
      result.advancedStyleParams.conic.x = -options.width / 2
      result.advancedStyleParams.conic.y = result.textLine.data.length * options.lineHeight / 2
      break
    case 'bottom':
      translateX = options.width / 2
      translateY = options.height
      textBaseline = 'bottom'
      // textAlign = 'center'
      result.advancedStyleParams.linear.x0 = -options.width / 2
      result.advancedStyleParams.linear.x1 = options.width / 2
      // result.advancedStyleParams.radial.x0 = 0
      result.advancedStyleParams.radial.y0 = -result.textLine.data.length * options.lineHeight / 2
      // result.advancedStyleParams.radial.r0 = 0
      // result.advancedStyleParams.radial.x1 = 0
      result.advancedStyleParams.radial.y1 = -result.textLine.data.length * options.lineHeight / 2
      // result.advancedStyleParams.radial.r1 = options.width / 2
      result.advancedStyleParams.conic.x = 0
      result.advancedStyleParams.conic.y = -result.textLine.data.length * options.lineHeight / 2
      break
    case 'bottom-start':
      translateX = 0
      translateY = options.height
      textBaseline = 'bottom'
      textAlign = 'start'
      result.advancedStyleParams.linear.x0 = 0
      result.advancedStyleParams.linear.x1 = options.width
      result.advancedStyleParams.radial.x0 = options.width / 2
      result.advancedStyleParams.radial.y0 = -result.textLine.data.length * options.lineHeight / 2
      // result.advancedStyleParams.radial.r0 = 0
      result.advancedStyleParams.radial.x1 = options.width / 2
      result.advancedStyleParams.radial.y1 = -result.textLine.data.length * options.lineHeight / 2
      // result.advancedStyleParams.radial.r1 = options.width / 2
      result.advancedStyleParams.conic.x = options.width / 2
      result.advancedStyleParams.conic.y = -result.textLine.data.length * options.lineHeight / 2
      break
    case 'bottom-end':
      translateX = options.width
      translateY = options.height
      textBaseline = 'bottom'
      textAlign = 'end'
      result.advancedStyleParams.linear.x0 = 0
      result.advancedStyleParams.linear.x1 = -options.width
      result.advancedStyleParams.radial.x0 = -options.width / 2
      result.advancedStyleParams.radial.y0 = -result.textLine.data.length * options.lineHeight / 2
      // result.advancedStyleParams.radial.r0 = 0
      result.advancedStyleParams.radial.x1 = -options.width / 2
      result.advancedStyleParams.radial.y1 = -result.textLine.data.length * options.lineHeight / 2
      // result.advancedStyleParams.radial.r1 = options.width / 2
      result.advancedStyleParams.conic.x = -options.width / 2
      result.advancedStyleParams.conic.y = -result.textLine.data.length * options.lineHeight / 2
      break
    case 'left':
      translateX = 0
      translateY = options.height / 2
      // TextBaselineType = 'middle'
      textAlign = 'start'
      result.advancedStyleParams.linear.x0 = 0
      result.advancedStyleParams.linear.x1 = options.width
      result.advancedStyleParams.radial.x0 = options.width / 2
      // result.advancedStyleParams.radial.y0 = 0
      // result.advancedStyleParams.radial.r0 = 0
      result.advancedStyleParams.radial.x1 = options.width / 2
      // result.advancedStyleParams.radial.y1 = 0
      // result.advancedStyleParams.radial.r1 = options.width / 2
      result.advancedStyleParams.conic.x = options.width / 2
      result.advancedStyleParams.conic.y = 0
      break
    case 'right':
      translateX = options.width
      translateY = options.height / 2
      // TextBaselineType = 'middle'
      textAlign = 'end'
      result.advancedStyleParams.linear.x0 = 0
      result.advancedStyleParams.linear.x1 = -options.width
      result.advancedStyleParams.radial.x0 = -options.width / 2
      // result.advancedStyleParams.radial.y0 = 0
      // result.advancedStyleParams.radial.r0 = 0
      result.advancedStyleParams.radial.x1 = -options.width / 2
      // result.advancedStyleParams.radial.y1 = 0
      // result.advancedStyleParams.radial.r1 = options.width / 2
      result.advancedStyleParams.conic.x = -options.width / 2
      result.advancedStyleParams.conic.y = 0
      break
  }
  options.translateX = translateX
  options.translateY = translateY
  isUndefined(args?.textBaseline) && (options.textBaseline = textBaseline)
  isUndefined(args?.textAlign) && (options.textAlign = textAlign)

  if (options.contentType === 'multi-line-text') {
    switch (options.textBaseline) {
      case 'middle':
        result.textLine.yOffsetValue = (result.textLine.data.length - 1) * options.lineHeight / 2
        break
      case 'bottom':
      case 'alphabetic':
      case 'ideographic':
        result.textLine.yOffsetValue = (result.textLine.data.length - 1) * options.lineHeight
        break
      case 'top':
      case 'hanging':
        result.textLine.yOffsetValue = 0
        break
    }
  }

  return result
}
