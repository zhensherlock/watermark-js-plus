import type { ImageWatermarkOptions, WatermarkOptions } from '../types'
import { WatermarkCanvas } from './canvas'
import { initialOptions } from '../utils/initialization'
import { renderLayout } from './layout'
import { convertImage } from '../utils'

/**
 * ImageWatermark class
 */
class ImageWatermark {
  private readonly options: {} & WatermarkOptions & Partial<ImageWatermarkOptions>
  private readonly props?: Partial<ImageWatermarkOptions>
  private watermarkCanvas?: WatermarkCanvas
  private layoutCanvas?: HTMLCanvasElement
  private readonly originalSrc?: string
  private readonly backgroundImage?: HTMLImageElement
  private drew = false

  /**
   * ImageWatermark constructor
   * @param args - image watermark args
   */
  constructor (args: Partial<ImageWatermarkOptions> = {}) {
    this.props = args
    this.options = {
      ...initialOptions,
      ...args
    }
    this.watermarkCanvas = new WatermarkCanvas(this.props, this.options)
    this.originalSrc = this.props.dom?.src
    this.backgroundImage = this.getBackgroundImage()
  }

  async create () {
    if (this.drew) {
      return
    }
    await this.watermarkCanvas?.draw()
    this.options.layout = 'grid'
    this.options.gridLayoutOptions = {
      ...this.options.gridLayoutOptions,
      width: this.backgroundImage?.width,
      height: this.backgroundImage?.height,
      backgroundImage: this.backgroundImage
    }
    this.layoutCanvas = renderLayout(this.options, <HTMLCanvasElement> this.watermarkCanvas?.getCanvas())
    this.options.dom!.src = convertImage(this.layoutCanvas)
    this.watermarkCanvas?.clear()
    this.drew = true
  }

  destroy () {
    this.options.dom!.src = <string> this.originalSrc
    this.drew = false
  }

  private getBackgroundImage () {
    if (this.options.dom) {
      return this.options.dom
    }
  }
}

export {
  ImageWatermark
}
