import { convertImage, generateAnimationStyle, isUndefined } from '../utils'
import type { ChangeOptionsMode, WatermarkDom, WatermarkOptions } from '../types'
import { initialOptions } from '../utils/initialization'
import protection from '../utils/protection'
import { generateBackgroundSize, renderLayout } from './layout'
import { WatermarkCanvas } from './canvas'

/**
 * Watermark class
 */
class Watermark {
  protected options: WatermarkOptions
  private parentElement: Element = document.body
  private observer?: MutationObserver
  private parentObserve?: MutationObserver
  private watermarkDom?: WatermarkDom
  private props?: Partial<WatermarkOptions>
  private layoutCanvas?: HTMLCanvasElement
  private watermarkCanvas?: WatermarkCanvas
  private isCreating: Boolean = false

  /**
   * Watermark constructor
   * @param args - watermark args
   */
  constructor(args: Partial<WatermarkOptions> = {}) {
    this.props = args
    this.options = {
      ...initialOptions,
      ...args,
    }
    this.changeParentElement(this.options.parent)
    this.watermarkCanvas = new WatermarkCanvas(this.props, this.options)
    protection(this.options.monitorProtection)
  }

  /**
   * Change watermark options
   * @param args
   * @param mode
   * @param redraw
   */
  async changeOptions(
    args: Partial<WatermarkOptions> = {},
    mode: ChangeOptionsMode = 'overwrite',
    redraw: boolean = true,
  ) {
    this.initConfigData(args, mode)
    protection(this.options.monitorProtection)
    if (redraw) {
      this.remove()
      await this.create()
    }
  }

  /**
   * Creating a watermark.
   */
  async create() {
    if (this.isCreating) {
      return
    }
    this.isCreating = true
    if (!this.validateUnique()) {
      this.isCreating = false
      return
    }

    if (!this.validateContent()) {
      this.isCreating = false
      return
    }
    const firstDraw = isUndefined(this.watermarkDom)

    await this.watermarkCanvas?.draw()
    this.layoutCanvas = renderLayout(this.options, <HTMLCanvasElement>this.watermarkCanvas?.getCanvas())
    const image = convertImage(this.layoutCanvas)
    this.watermarkCanvas?.clear()
    this.watermarkDom = document.createElement('div')
    const watermarkInnerDom = document.createElement('div')
    this.watermarkDom.__WATERMARK__ = 'watermark'
    this.watermarkDom.__WATERMARK__INSTANCE__ = this
    const parentElementType = this.checkParentElementType()
    this.watermarkDom.style.cssText = `
      z-index:${this.options.zIndex}!important;display:block!important;visibility:visible!important;transform:none!important;scale:none!important;
      ${parentElementType === 'custom' ? 'top:0!important;bottom:0!important;left:0!important;right:0!important;height:100%!important;pointer-events:none!important;position:absolute!important;' : 'position:relative!important;'}
    `
    const backgroundSize = generateBackgroundSize(this.options)
    watermarkInnerDom.style.cssText = `
      display:block!important;visibility:visible!important;pointer-events:none;top:0;bottom:0;left:0;right:0;transform:none!important;scale:none!important;
      position:${parentElementType === 'root' ? 'fixed' : 'absolute'}!important;-webkit-print-color-adjust:exact!important;width:100%!important;height:100%!important;
      z-index:${this.options.zIndex}!important;background-image:url(${image})!important;background-repeat:${this.options.backgroundRepeat}!important;
      background-size:${backgroundSize[0]}px ${backgroundSize[1]}px!important;background-position:${this.options.backgroundPosition};
      ${generateAnimationStyle(this.options.movable, this.options.backgroundRepeat)}
    `
    this.watermarkDom.appendChild(watermarkInnerDom)
    this.parentElement.appendChild(this.watermarkDom)

    if (this.options.mutationObserve) {
      try {
        this.bindMutationObserve()
      } catch {
        this.options.onObserveError?.()
      }
    }
    firstDraw && this.options.onSuccess?.()
    this.isCreating = false
  }

  /**
   * Delete this watermark.
   */
  destroy() {
    this.remove()
    this.watermarkDom = undefined
  }

  async check() {
    return this.parentElement.contains(<Node>this.watermarkDom)
  }

  protected remove() {
    this.options.onBeforeDestroy?.()
    this.observer?.disconnect()
    this.parentObserve?.disconnect()
    this.watermarkDom?.parentNode?.removeChild(this.watermarkDom)
    this.options.onDestroyed?.()
  }

  protected initConfigData(args: Partial<WatermarkOptions>, mode: ChangeOptionsMode = 'overwrite') {
    if (mode === 'append') {
      Object.keys(args).forEach(key => {
        this.props && (this.props[key as keyof WatermarkOptions] = <never>args[key as keyof WatermarkOptions])
      })
    } else {
      this.props = args
    }
    this.options = {
      ...initialOptions,
      ...this.props,
    }
    this.changeParentElement(this.options.parent)
    this.watermarkCanvas = new WatermarkCanvas(<Partial<WatermarkOptions>>this.props, this.options)
  }

  private changeParentElement(parent: Element | string) {
    if (typeof parent === 'string') {
      const parentElement = document.querySelector(parent)
      parentElement && (this.parentElement = parentElement)
    } else {
      this.parentElement = parent
    }

    if (!this.parentElement) {
      console.error('[WatermarkJsPlus]: please pass a valid parent element.')
    }
  }

  private validateUnique(): boolean {
    let result = true

    Array.from(this.parentElement.childNodes).forEach(node => {
      if (!result) {
        return
      }
      if (Object.hasOwnProperty.call(node, '__WATERMARK__')) {
        result = false
        // throw new Error('duplicate watermark error')
      }
    })
    return result
  }

  private validateContent(): boolean {
    switch (this.options.contentType) {
      case 'image':
        return Object.hasOwnProperty.call(this.options, 'image')
      case 'multi-line-text':
      case 'rich-text':
      case 'text':
        return this.options.content.length > 0
    }
  }

  private checkParentElementType() {
    if (['html', 'body'].includes(this.parentElement.tagName.toLocaleLowerCase())) {
      return 'root'
    }
    return 'custom'
  }

  private bindMutationObserve(): void {
    if (!this.watermarkDom) {
      return
    }
    this.observer = new MutationObserver(async (mutationsList: MutationRecord[]) => {
      if (mutationsList.length > 0) {
        this.remove()
        await this.create()
      }
    })
    this.observer.observe(this.watermarkDom, {
      attributes: true, // 属性的变动
      childList: true, // 子节点的变动（指新增，删除或者更改）
      subtree: true, // 布尔值，表示是否将该观察器应用于该节点的所有后代节点。
      characterData: true, // 节点内容或节点文本的变动。
    })
    this.parentObserve = new MutationObserver(async (mutationsList: MutationRecord[]) => {
      for (const item of mutationsList) {
        if (
          item?.target === this.watermarkDom ||
          item?.removedNodes?.[0] === this.watermarkDom ||
          (item.type === 'childList' &&
            item.target === this.parentElement &&
            item.target.lastChild !== this.watermarkDom)
        ) {
          this.remove()
          await this.create()
        }
      }
    })
    this.parentObserve.observe(this.parentElement, {
      attributes: true, // 属性的变动
      childList: true, // 子节点的变动（指新增，删除或者更改）
      subtree: true, // 布尔值，表示是否将该观察器应用于该节点的所有后代节点。
      characterData: true, // 节点内容或节点文本的变动。
    })
  }
}

export { Watermark }
