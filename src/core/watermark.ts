import { convertImage, convertSVGToImage, createCustomContentSVG, getMultiLineData, isUndefined } from '../utils'
import {
  TextAlignType,
  TextBaselineType,
  WatermarkDom,
  WatermarkOptions
} from '../types'

/**
 * Watermark class
 */
export default class Watermark {
  private readonly options: WatermarkOptions
  private parentElement: Element = document.body
  private observer?: MutationObserver
  private parentObserve?: MutationObserver
  private watermarkDom?: WatermarkDom
  private props?: Partial<WatermarkOptions>

  /**
   * Watermark constructor
   * @param props - watermark options
   */
  constructor (props: Partial<WatermarkOptions> = {}) {
    this.props = props
    this.options = Object.assign({
      width: 300,
      height: 300,
      rotate: 45,
      translatePlacement: 'middle',
      contentType: 'text',
      content: 'hello watermark-js-plus',
      textType: 'fill',
      imageWidth: 0,
      imageHeight: 0,
      lineHeight: 30,
      zIndex: 10000,
      backgroundPosition: '0 0, 0 0',
      backgroundRepeat: 'repeat',
      fontSize: 20,
      fontFamily: 'sans-serif',
      fontColor: '#000',
      globalAlpha: 0.5,
      fontWeight: 'normal',
      mode: 'default',
      mutationObserve: true,
      unique: true,
      parent: 'body',
      onSuccess: () => {},
      onBeforeDestroy: () => {},
      onDestroyed: () => {}
    }, props)
    this.changeParentElement(this.options.parent)
    this.initializeOptions()
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

  changeParentElement (parent: Element | string) {
    if (typeof parent === 'string') {
      const parentElement = document.querySelector(parent)
      parentElement && (this.parentElement = parentElement)
    } else {
      this.parentElement = parent
    }
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

    const canvas = await this.draw()
    const image = convertImage(canvas)
    this.watermarkDom = document.createElement('div')
    const watermarkInnerDom = document.createElement('div')
    this.watermarkDom.__WATERMARK__ = 'watermark'
    this.watermarkDom.__WATERMARK__INSTANCE__ = this
    const parentElementType = this.checkParentElementType()
    this.watermarkDom.style.cssText = `
      z-index: ${this.options.zIndex};
      ${parentElementType === 'custom' ? 'top: 0;bottom: 0;left: 0;right: 0;height: 100%;pointer-events: none;position: absolute' : 'position: relative'}
    `
    watermarkInnerDom.style.cssText = `
      position: ${parentElementType === 'root' ? 'fixed;' : 'absolute;'}
      z-index: ${this.options.zIndex};
      pointer-events: none;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: url(${image});
      background-repeat: ${this.options.backgroundRepeat};
      background-size: ${this.options.width}px ${this.options.height}px;
      background-position: ${this.options.backgroundPosition};
      -webkit-print-color-adjust: exact;
    `
    this.watermarkDom.append(watermarkInnerDom)
    this.parentElement.appendChild(this.watermarkDom)

    if (this.options.mutationObserve) {
      this.bindMutationObserve()
    }
    this.options.onSuccess?.()
  }

  /**
   * Deleting this watermark.
   */
  destroy () {
    this.options.onBeforeDestroy?.()
    this.observer?.disconnect()
    this.parentObserve?.disconnect()
    this.watermarkDom?.remove()
    this.options.onDestroyed?.()
  }

  private initializeOptions () {
    if (this.options?.rotate) {
      this.options.rotate = (360 - this.options.rotate % 360) * (Math.PI / 180)
    }
    let translateX: number
    let translateY: number
    let textBaseline: TextBaselineType = 'middle'
    let textAlign: TextAlignType = 'center'
    switch (this.options.translatePlacement) {
      case 'top':
        translateX = this.options.width / 2
        translateY = 0
        textBaseline = 'top'
        break
      case 'top-start':
        translateX = 0
        translateY = 0
        textBaseline = 'top'
        textAlign = 'start'
        break
      case 'top-end':
        translateX = this.options.width
        translateY = 0
        textBaseline = 'top'
        textAlign = 'end'
        break
      case 'bottom':
        translateX = this.options.width / 2
        translateY = this.options.height
        textBaseline = 'bottom'
        break
      case 'bottom-start':
        translateX = 0
        translateY = this.options.height
        textBaseline = 'bottom'
        textAlign = 'start'
        break
      case 'bottom-end':
        translateX = this.options.width
        translateY = this.options.height
        textBaseline = 'bottom'
        textAlign = 'end'
        break
      case 'left':
        translateX = 0
        translateY = this.options.height / 2
        textAlign = 'start'
        break
      case 'right':
        translateX = this.options.width
        translateY = this.options.height / 2
        textAlign = 'end'
        break
      case 'middle':
        translateX = this.options.width / 2
        translateY = this.options.height / 2
        break
    }
    if (!isUndefined(this.props?.translateX) || !isUndefined(this.props?.translateY)) {
      textBaseline = 'top'
      textAlign = 'left'
    }
    isUndefined(this.props?.translateX) && (this.options.translateX = translateX)
    isUndefined(this.props?.translateY) && (this.options.translateY = translateY)
    isUndefined(this.props?.textBaseline) && (this.options.textBaseline = textBaseline)
    isUndefined(this.props?.textAlign) && (this.options.textAlign = textAlign)
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
    const canvas = Watermark.createCanvas(this.options.width, this.options.height)
    // document.body?.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    if (ctx === null) {
      throw new Error('get context error')
    }
    ctx.font = `${this.options.fontWeight} ${this.options.fontSize}px ${this.options.fontFamily}`
    this.options.textAlign && (ctx.textAlign = this.options.textAlign)
    this.options.textBaseline && (ctx.textBaseline = this.options.textBaseline)
    this.setTextStyle(ctx)
    ctx.globalAlpha = this.options.globalAlpha
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

  private setTextStyle (ctx: CanvasRenderingContext2D) {
    let propName: 'fillStyle' | 'strokeStyle' = 'fillStyle'
    if (this.options.textType === 'stroke') {
      propName = 'strokeStyle'
    }
    ctx[propName] && (ctx[propName] = this.options.fontColor)
    if (this.options.shadowStyle) {
      ctx.shadowBlur = this.options.shadowStyle.shadowBlur || 0
      ctx.shadowColor = this.options.shadowStyle.shadowColor || '#00000000'
      ctx.shadowOffsetX = this.options.shadowStyle.shadowOffsetX || 0
      ctx.shadowOffsetY = this.options.shadowStyle.shadowOffsetY || 0
    }
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
      maxWidth: this.options.textRowMaxWidth
    })
    resolve(ctx.canvas)
  }

  private drawImage (ctx: CanvasRenderingContext2D, resolve: Function) {
    const image = new Image()
    image.setAttribute('crossOrigin', 'Anonymous')
    image.src = this.options.image as string
    image.onload = () => {
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
    }
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
    const width = this.options.textRowMaxWidth || this.options.width
    const lines = getMultiLineData(ctx, this.options.content, width)
    let yOffsetValue: number
    switch (this.options.textBaseline) {
      case 'middle':
        yOffsetValue = (lines.length - 1) * this.options.lineHeight / 2
        break
      case 'bottom':
      case 'alphabetic':
      case 'ideographic':
        yOffsetValue = (lines.length - 1) * this.options.lineHeight
        break
      case 'top':
      case 'hanging':
        yOffsetValue = 0
        break
    }
    lines.forEach((text, index) => {
      this.setText(ctx, { text, x: 0, y: this.options.lineHeight * index - yOffsetValue })
    })
    resolve(ctx.canvas)
  }

  private drawRichText (ctx: CanvasRenderingContext2D, resolve: Function) {
    const obj = createCustomContentSVG(ctx, this.options)
    const image = new Image()
    image.width = obj.width
    image.height = obj.height
    image.src = convertSVGToImage(obj.element)
    image.onload = () => {
      const imagePosition = this.getDrawImagePosition(image.width, image.height)
      ctx.drawImage(
        image,
        imagePosition.x,
        imagePosition.y,
        ctx.canvas.width,
        ctx.canvas.height
      )
      resolve(ctx.canvas)
    }
  }

  private getImageRect (image: HTMLImageElement) {
    const rect = { width: this.options.imageWidth, height: this.options.imageHeight }
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
      attributes: true, // 子节点的变动（指新增，删除或者更改）
      childList: true, // 属性的变动
      subtree: true, // 布尔值，表示是否将该观察器应用于该节点的所有后代节点。
      characterData: true // 节点内容或节点文本的变动。
    })
    this.parentObserve = new MutationObserver((mutationsList: MutationRecord[]) => {
      mutationsList.forEach(item => {
        if (item?.target === this.watermarkDom || item?.removedNodes?.[0] === this.watermarkDom) {
          this.destroy()
          this.create()
        }
      })
    })
    this.parentObserve.observe(this.parentElement, {
      attributes: true, // 子节点的变动（指新增，删除或者更改）
      childList: true, // 属性的变动
      subtree: true, // 布尔值，表示是否将该观察器应用于该节点的所有后代节点。
      characterData: true // 节点内容或节点文本的变动。
    })
  }
}
