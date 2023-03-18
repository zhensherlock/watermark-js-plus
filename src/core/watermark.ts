import {
  convertImage,
  convertSVGToImage,
  createCustomContentSVG,
  isFunction,
  isUndefined,
  getValue,
  loadImage
} from '../utils'
import {
  ChangeOptionsMode,
  WatermarkDom,
  WatermarkOptions
} from '../types'

import { generateRecommendOptions, initialOptions } from '../utils/initialization'

/**
 * Watermark class
 */
export default class Watermark {
  private options: WatermarkOptions
  private parentElement: Element = document.body
  private observer?: MutationObserver
  private parentObserve?: MutationObserver
  private watermarkDom?: WatermarkDom
  private props?: Partial<WatermarkOptions>
  private canvas: HTMLCanvasElement
  private recommendOptions

  /**
   * Watermark constructor
   * @param args - watermark args
   */
  constructor (args: Partial<WatermarkOptions> = {}) {
    this.props = args
    this.options = Object.assign({}, initialOptions, args)
    this.changeParentElement(this.options.parent)
    this.canvas = Watermark.createCanvas(this.options.width, this.options.height)
    this.recommendOptions = generateRecommendOptions(this.canvas, this.options, this.props)
  }

  /**
   * Create an HD canvas.
   * @param width - width of canvas
   * @param height - height of canvas
   */
  static createCanvas (width: number, height: number): HTMLCanvasElement {
    const ratio = window.devicePixelRatio || 1
    const canvas = document.createElement('canvas')
    canvas.width = width * ratio // actual rendered pixel
    canvas.height = height * ratio // actual rendered pixel
    canvas.style.width = `${width}px` // control display size
    canvas.style.height = `${height}px` // control display size
    canvas.getContext('2d')?.setTransform(ratio, 0, 0, ratio, 0, 0)
    return canvas
  }

  changeOptions (args: Partial<WatermarkOptions> = {}, mode: ChangeOptionsMode = 'overwrite') {
    this.initConfigData(args, mode)
  }

  /**
   * Creating a watermark.
   */
  async create () {
    if (!this.validateUnique()) {
      return
    }

    if (!this.validateContent()) {
      return
    }

    await this.draw()
    const image = convertImage(this.canvas)
    this.clearCanvas()
    this.watermarkDom = document.createElement('div')
    const watermarkInnerDom = document.createElement('div')
    this.watermarkDom.__WATERMARK__ = 'watermark'
    this.watermarkDom.__WATERMARK__INSTANCE__ = this
    const parentElementType = this.checkParentElementType()
    this.watermarkDom.style.cssText = `
      z-index: ${this.options.zIndex};display:block!important;visibility:visible!important;transform:none!important;scale:none!important;
      ${parentElementType === 'custom' ? 'top:0;bottom:0;left:0;right:0;height:100%;pointer-events:none;position:absolute' : 'position:relative'}
    `
    watermarkInnerDom.style.cssText = `
      display:block!important;visibility:visible!important;pointer-events:none;top:0;bottom:0;left:0;right:0;transform:none!important;scale:none!important;
      position:${parentElementType === 'root' ? 'fixed' : 'absolute'};-webkit-print-color-adjust:exact;width:100%!important;height:100%!important;
      z-index:${this.options.zIndex};background-image:url(${image});background-repeat:${this.options.backgroundRepeat};
      background-size:${this.options.width}px ${this.options.height}px;background-position:${this.options.backgroundPosition};
    `
    this.watermarkDom.append(watermarkInnerDom)
    this.parentElement.appendChild(this.watermarkDom)

    if (this.options.mutationObserve) {
      this.bindMutationObserve()
    }
    this.options.onSuccess?.()
  }

  /**
   * Delete this watermark.
   */
  destroy () {
    this.options.onBeforeDestroy?.()
    this.observer?.disconnect()
    this.parentObserve?.disconnect()
    this.watermarkDom?.remove()
    this.options.onDestroyed?.()
  }

  private initConfigData (args: Partial<WatermarkOptions>, mode: ChangeOptionsMode = 'overwrite') {
    this.props = args
    if (mode === 'overwrite') {
      this.options = Object.assign({}, initialOptions, args)
    } else {
      Object.keys(args).forEach(key => {
        this.options[key as keyof WatermarkOptions] = <never> args[key as keyof WatermarkOptions]
      })
    }
    this.changeParentElement(this.options.parent)
    this.canvas = Watermark.createCanvas(this.options.width, this.options.height)
    this.recommendOptions = generateRecommendOptions(this.canvas, this.options, this.props)
    // document.body?.appendChild(this.canvas)
  }

  private changeParentElement (parent: Element | string) {
    if (typeof parent === 'string') {
      const parentElement = document.querySelector(parent)
      parentElement && (this.parentElement = parentElement)
    } else {
      this.parentElement = parent
    }
  }

  private validateUnique (): boolean {
    let result = true
    if (this.options.unique) {
      this.parentElement.childNodes.forEach(node => {
        if (!result) {
          return
        }
        if (Object.hasOwnProperty.call(node, '__WATERMARK__')) {
          result = false
          // throw new Error('duplicate watermark error')
        }
      })
    }
    return result
  }

  private validateContent (): boolean {
    switch (this.options.contentType) {
      case 'image':
        return Object.hasOwnProperty.call(this.options, 'image')
      case 'multi-line-text':
      case 'rich-text':
      case 'text':
        return this.options.content.length > 0
    }
    return false
  }

  private draw (): Promise<HTMLCanvasElement> {
    const ctx = this.canvas.getContext('2d')
    if (ctx === null) {
      throw new Error('get context error')
    }

    if (this.options.auxiliaryLine) {
      ctx.beginPath()
      ctx.rect(1, 1, this.options.width, this.options.height)
      ctx.lineWidth = 1
      ctx.strokeStyle = '#000'
      ctx.stroke()
      ctx.closePath()

      ctx.beginPath()
      ctx.rect(this.options.translateX as number, this.options.translateY as number, 1, 1)
      ctx.lineWidth = 1
      ctx.strokeStyle = '#f00'
      ctx.stroke()
      ctx.closePath()
    }

    this.setStyle(ctx)
    ctx.save()
    ctx.translate(this.options.translateX as number, this.options.translateY as number)
    ctx.rotate(this.options.rotate)
    return new Promise((resolve) => {
      switch (this.options.contentType) {
        case 'text':
          this.drawText(ctx, resolve)
          break
        case 'image':
          this.drawImage(ctx, resolve)
          break
        case 'multi-line-text':
          this.drawMultiLineText(ctx, resolve)
          break
        case 'rich-text':
          this.drawRichText(ctx, resolve)
          break
      }
    })
  }

  private setStyle (ctx: CanvasRenderingContext2D) {
    let propName: 'fillStyle' | 'strokeStyle' = 'fillStyle'
    if (this.options.textType === 'stroke') {
      propName = 'strokeStyle'
    }
    let style: string | CanvasGradient | CanvasPattern | null = this.options.fontColor
    if (this.options?.advancedStyle) {
      switch (this.options.advancedStyle.type) {
        case 'linear':
          style = this.createLinearGradient(ctx)
          break
        case 'radial':
          style = this.createRadialGradient(ctx)
          break
        case 'conic':
          style = this.createConicGradient(ctx)
          break
        case 'pattern':
          style = this.createPattern(ctx)
          break
      }
    }
    ctx[propName] && style && (ctx[propName] = style)

    this.options.textAlign && (ctx.textAlign = this.options.textAlign)
    this.options.textBaseline && (ctx.textBaseline = this.options.textBaseline)
    ctx.globalAlpha = this.options.globalAlpha
    if (this.options.shadowStyle) {
      ctx.shadowBlur = getValue(this.options.shadowStyle.shadowBlur, 0)
      ctx.shadowColor = getValue(this.options.shadowStyle.shadowColor, '#00000000')
      ctx.shadowOffsetX = getValue(this.options.shadowStyle.shadowOffsetX, 0)
      ctx.shadowOffsetY = getValue(this.options.shadowStyle.shadowOffsetY, 0)
    }
    if (isFunction(<Function> this.options.extraDrawFunc)) {
      (<Function> this.options.extraDrawFunc)(ctx)
    }
  }

  private createLinearGradient (ctx: CanvasRenderingContext2D): CanvasGradient {
    const gradient = ctx.createLinearGradient(
      <number> getValue(this.options.advancedStyle?.params?.linear?.x0, this.recommendOptions.advancedStyleParams.linear.x0),
      <number> getValue(this.options.advancedStyle?.params?.linear?.y0, 0),
      <number> getValue(this.options.advancedStyle?.params?.linear?.x1, this.recommendOptions.advancedStyleParams.linear.x1),
      <number> getValue(this.options.advancedStyle?.params?.linear?.y1, 0)
    )
    this.options?.advancedStyle?.colorStops?.forEach(item => {
      gradient.addColorStop(item.offset, item.color)
    })
    return gradient
  }

  private createConicGradient (ctx: CanvasRenderingContext2D): CanvasGradient {
    const gradient = ctx.createConicGradient(
      <number> getValue(this.options?.advancedStyle?.params?.conic?.startAngle, 0),
      <number> getValue(this.options?.advancedStyle?.params?.conic?.x, this.recommendOptions.advancedStyleParams.conic.x),
      <number> getValue(this.options?.advancedStyle?.params?.conic?.y, this.recommendOptions.advancedStyleParams.conic.y)
    )
    this.options?.advancedStyle?.colorStops?.forEach(item => {
      gradient.addColorStop(item.offset, item.color)
    })
    return gradient
  }

  private createRadialGradient (ctx: CanvasRenderingContext2D): CanvasGradient {
    const gradient = ctx.createRadialGradient(
      <number> getValue(this.options?.advancedStyle?.params?.radial?.x0, this.recommendOptions.advancedStyleParams.radial.x0),
      <number> getValue(this.options?.advancedStyle?.params?.radial?.y0, this.recommendOptions.advancedStyleParams.radial.y0),
      <number> getValue(this.options?.advancedStyle?.params?.radial?.r0, this.recommendOptions.advancedStyleParams.radial.r0),
      <number> getValue(this.options?.advancedStyle?.params?.radial?.x1, this.recommendOptions.advancedStyleParams.radial.x1),
      <number> getValue(this.options?.advancedStyle?.params?.radial?.y1, this.recommendOptions.advancedStyleParams.radial.y1),
      <number> getValue(this.options?.advancedStyle?.params?.radial?.r1, this.recommendOptions.advancedStyleParams.radial.r1)
    )
    this.options?.advancedStyle?.colorStops?.forEach(item => {
      gradient.addColorStop(item.offset, item.color)
    })
    return gradient
  }

  private createPattern (ctx: CanvasRenderingContext2D): CanvasPattern | null {
    return ctx.createPattern(
      <HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas> this.options?.advancedStyle?.params?.pattern?.image,
      this.options?.advancedStyle?.params?.pattern?.repetition || ''
    )
  }

  private setText (ctx: CanvasRenderingContext2D, params: { text: string; x: number; y: number; maxWidth?: number }) {
    let methodName: 'fillText' | 'strokeText' = 'fillText'
    if (this.options.textType === 'stroke') {
      methodName = 'strokeText'
    }
    ctx[methodName] && ctx[methodName](params.text, params.x, params.y, params.maxWidth)
  }

  private drawText (ctx: CanvasRenderingContext2D, resolve: Function) {
    this.setText(ctx, {
      text: this.options.content,
      x: 0,
      y: 0,
      maxWidth: this.options.textRowMaxWidth || this.options.width
    })
    resolve(ctx.canvas)
  }

  private drawImage (ctx: CanvasRenderingContext2D, resolve: Function) {
    loadImage(<string> this.options.image).then(image => {
      const { width: imageWidth, height: imageHeight } = this.getImageRect(image)
      const imagePosition = this.getDrawImagePosition(imageWidth, imageHeight)
      ctx.drawImage(
        image,
        imagePosition.x,
        imagePosition.y,
        imageWidth,
        imageHeight
      )
      resolve(ctx.canvas)
    })
  }

  private drawMultiLineText (ctx: CanvasRenderingContext2D, resolve: Function) {
    // image.width = this.options.width
    // image.height = this.options.height
    // const element = createCustomContentSvg(context, this.options)
    // image.src = convertSVGToImage(element)
    // image.onload = () => {
    //   context.translate(this.options.width / 2, this.options.height / 2)
    //   context.rotate(this.options.rotate)
    //   context.drawImage(
    //     image,
    //     -this.options.width / 2,
    //     -this.options.height / 2,
    //     context.canvas.width,
    //     context.canvas.height
    //   )
    //   resolve(canvas)
    // }
    const lines = this.recommendOptions.textLine.data
    const yOffsetValue = this.recommendOptions.textLine.yOffsetValue
    lines.forEach((text, index) => {
      this.setText(ctx, { text, x: 0, y: this.options.lineHeight * index - yOffsetValue })
    })
    resolve(ctx.canvas)
  }

  private drawRichText (ctx: CanvasRenderingContext2D, resolve: Function) {
    const obj = createCustomContentSVG(ctx, this.options)
    loadImage(convertSVGToImage(obj.element), obj.width, obj.height).then(image => {
      const imagePosition = this.getDrawImagePosition(image.width, image.height)
      ctx.drawImage(
        image,
        imagePosition.x,
        imagePosition.y,
        ctx.canvas.width,
        ctx.canvas.height
      )
      resolve(ctx.canvas)
    })
  }

  private getImageRect (image: HTMLImageElement) {
    const rect = { width: this.options.imageWidth || 0, height: this.options.imageHeight || 0 }
    switch (true) {
      case rect.width !== 0 && rect.height === 0:
        rect.height = rect.width * image.height / image.width
        break
      case rect.width === 0 && rect.height !== 0:
        rect.width = rect.height * image.width / image.height
        break
      case rect.width === 0 && rect.height === 0:
        rect.width = image.width
        rect.height = image.height
        break
    }
    return rect
  }

  private getDrawImagePosition (imageWidth: number, imageHeight: number) {
    const result = {
      x: -imageWidth / 2,
      y: -imageHeight / 2
    }
    switch (this.options.translatePlacement) {
      case 'top':
        result.x = -imageWidth / 2
        result.y = 0
        break
      case 'top-start':
        result.x = 0
        result.y = 0
        break
      case 'top-end':
        result.x = -imageWidth
        result.y = 0
        break
      case 'bottom':
        result.x = -imageWidth / 2
        result.y = -imageHeight
        break
      case 'bottom-start':
        result.x = 0
        result.y = -imageHeight
        break
      case 'bottom-end':
        result.x = -imageWidth
        result.y = -imageHeight
        break
      case 'left':
        result.x = 0
        result.y = -imageHeight / 2
        break
      case 'right':
        result.x = -imageWidth
        result.y = -imageHeight / 2
        break
    }
    !isUndefined(this.props?.translateX) && (result.x = 0)
    !isUndefined(this.props?.translateY) && (result.y = 0)
    return result
  }

  private checkParentElementType () {
    if (['html', 'body'].includes(this.parentElement.tagName.toLocaleLowerCase())) {
      return 'root'
    }
    return 'custom'
  }

  private bindMutationObserve (): void {
    if (!this.watermarkDom) {
      return
    }
    this.observer = new MutationObserver((mutationsList: MutationRecord[]) => {
      if (mutationsList.length > 0) {
        this.destroy()
        this.create()
      }
    })
    this.observer.observe(this.watermarkDom, {
      attributes: true, // 属性的变动
      childList: true, // 子节点的变动（指新增，删除或者更改）
      subtree: true, // 布尔值，表示是否将该观察器应用于该节点的所有后代节点。
      characterData: true // 节点内容或节点文本的变动。
    })
    this.parentObserve = new MutationObserver((mutationsList: MutationRecord[]) => {
      mutationsList.forEach(item => {
        if (
          item?.target === this.watermarkDom ||
          item?.removedNodes?.[0] === this.watermarkDom ||
          (item.type === 'childList' && item.target === this.parentElement && item.target.lastChild !== this.watermarkDom)
        ) {
          this.destroy()
          this.create()
        }
      })
    })
    this.parentObserve.observe(this.parentElement, {
      attributes: true, // 属性的变动
      childList: true, // 子节点的变动（指新增，删除或者更改）
      subtree: true, // 布尔值，表示是否将该观察器应用于该节点的所有后代节点。
      characterData: true // 节点内容或节点文本的变动。
    })
  }

  private clearCanvas () {
    const ctx = this.canvas.getContext('2d')
    if (ctx === null) {
      throw new Error('get context error')
    }
    ctx.restore()
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // this.canvas.width = this.options.w
  }
}
