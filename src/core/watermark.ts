import { convertImage, convertSVGToImage, createCustomContentSVG, getMultiLineData } from '../utils'
import {
  ContentTypeEnum,
  CreateWatermarkModeEnum,
  TextAlignEnum,
  TextBaselineEnum,
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

  /**
   * Watermark constructor
   * @param props - watermark options
   */
  constructor (props: Partial<WatermarkOptions> = {}) {
    this.options = Object.assign({
      width: 300,
      height: 300,
      rotate: 45,
      contentType: ContentTypeEnum.text,
      content: 'hello watermark-js-plus',
      imageWidth: 0,
      imageHeight: 0,
      lineHeight: 30,
      zIndex: 10000,
      backgroundPosition: '0 0, 0 0',
      fontSize: 20,
      fontFamily: 'sans-serif',
      textAlign: TextAlignEnum.center,
      textBaseline: TextBaselineEnum.middle,
      fontColor: '#000',
      globalAlpha: 0.5,
      fontWeight: 'normal',
      mode: CreateWatermarkModeEnum.default,
      mutationObserve: true,
      unique: true,
      parent: 'body',
      onSuccess: () => {},
      onBeforeDestroy: () => {},
      onDestroyed: () => {}
    }, props)
    if (this.options?.rotate) {
      this.options.rotate = (360 - this.options.rotate % 360) * (Math.PI / 180)
    }
    this.changeParentElement(this.options.parent)
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
    this.watermarkDom.style.cssText = `
      z-index: ${this.options.zIndex};
      position: relative;
    `
    watermarkInnerDom.style.cssText = `
      position: fixed;
      z-index: ${this.options.zIndex};
      pointer-events: none;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: url(${image});
      background-repeat: repeat;
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
      case ContentTypeEnum.image:
        return Object.hasOwnProperty.call(this.options, 'image')
      case ContentTypeEnum.multiLineText:
      case ContentTypeEnum.richText:
      case ContentTypeEnum.text:
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
    ctx.textAlign = this.options.textAlign
    ctx.textBaseline = this.options.textBaseline
    ctx.fillStyle = this.options.fontColor
    ctx.globalAlpha = this.options.globalAlpha
    return new Promise((resolve) => {
      switch (this.options.contentType) {
        case ContentTypeEnum.text:
          this.drawText(ctx, resolve)
          break
        case ContentTypeEnum.image:
          this.drawImage(ctx, resolve)
          break
        case ContentTypeEnum.multiLineText:
          this.drawMultiLineText(ctx, resolve)
          break
        case ContentTypeEnum.richText:
          this.drawRichText(ctx, resolve)
          break
      }
    })
  }

  private drawText (ctx: CanvasRenderingContext2D, resolve: Function) {
    ctx.translate(this.options.width / 2, this.options.height / 2)
    ctx.rotate(this.options.rotate)
    ctx.fillText(this.options.content, 0, 0)
    resolve(ctx.canvas)
  }

  private drawImage (ctx: CanvasRenderingContext2D, resolve: Function) {
    const image = new Image()
    image.setAttribute('crossOrigin', 'Anonymous')
    image.src = this.options.image as string
    image.onload = () => {
      ctx.translate(this.options.width / 2, this.options.height / 2)
      ctx.rotate(this.options.rotate)
      const { width: imageWidth, height: imageHeight } = this.getImageRect(image)
      ctx.drawImage(
        image,
        0 - imageWidth / 2,
        0 - imageHeight / 2,
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
    const lines = getMultiLineData(ctx, this.options.content, this.options.width)
    ctx.translate(this.options.width / 2, this.options.height / 2)
    ctx.rotate(this.options.rotate)
    const yOffsetValue = (lines.length - 1) * this.options.lineHeight / 2
    lines.forEach((txt, index) => {
      ctx.fillText(txt, 0, this.options.lineHeight * index - yOffsetValue)
    })
    resolve(ctx.canvas)
  }

  private drawRichText (ctx: CanvasRenderingContext2D, resolve: Function) {
    const image = new Image()
    image.width = this.options.width
    image.height = this.options.height
    const element = createCustomContentSVG(ctx, this.options)
    image.src = convertSVGToImage(element)
    image.onload = () => {
      ctx.translate(this.options.width / 2, this.options.height / 2)
      ctx.rotate(this.options.rotate)
      ctx.drawImage(
        image,
        -this.options.width / 2,
        -this.options.height / 2,
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
