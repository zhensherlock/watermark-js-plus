export type ContentTypeType = 'text' | 'image' | 'multi-line-text' | 'rich-text'

export type LayoutType = 'default' | 'grid'

export type TextAlignType = 'center' | 'end' | 'left' | 'right' | 'start'

export type TextBaselineType = 'alphabetic' | 'hanging' | 'ideographic' | 'top' | 'bottom' | 'middle'

export type CreateWatermarkModeType = 'default' | 'blind'

export type DecodeBlindWatermarkModeType = 'canvas' | 'html' | 'svg'

export type TranslatePlacementType =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right'
  | 'middle'

export type TextType = 'fill' | 'stroke'

export type ChangeOptionsMode = 'overwrite' | 'append'

export type Matrix<T> = Array<Array<T>>

export interface CanvasShadowStyles {
  shadowBlur: number
  shadowColor: string
  shadowOffsetX: number
  shadowOffsetY: number
}

export interface AdvancedStyleParamsType {
  linear: Partial<{
    x0: number
    y0: number
    x1: number
    y1: number
  }>
  radial: Partial<{
    x0: number
    y0: number
    r0: number
    x1: number
    y1: number
    r1: number
  }>
  conic: Partial<{
    startAngle: number
    x: number
    y: number
  }>
  pattern: Partial<{
    image: HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas
    repetition: string
  }>
}

export interface AdvancedStyleType {
  type: 'linear' | 'radial' | 'conic' | 'pattern'
  params?: Partial<AdvancedStyleParamsType>
  colorStops?: { offset: number; color: string }[]
}

export interface WatermarkDom extends HTMLDivElement {
  __WATERMARK__?: string
  __WATERMARK__INSTANCE__?: any
}

export interface LayoutOptions {}

export interface GridLayoutOptions extends LayoutOptions {
  rows?: number
  cols?: number
  gap?: [number, number]
  matrix?: Matrix<number>
  width?: number
  height?: number
  backgroundImage?: any
}

export interface WatermarkOptions {
  width: number
  height: number
  rotate: number
  layout: LayoutType
  gridLayoutOptions?: GridLayoutOptions
  auxiliaryLine: boolean
  globalAlpha: number
  zIndex: number
  mutationObserve: boolean
  monitorProtection: boolean
  movable: boolean
  mode: CreateWatermarkModeType
  parent: Element | string
  backgroundPosition: string
  backgroundRepeat: string
  translatePlacement: TranslatePlacementType
  translateX?: number
  translateY?: number
  contentType: ContentTypeType
  content: string
  textType: TextType
  lineHeight: number
  fontSize: string
  fontFamily: string
  fontStyle: string
  fontVariant: string
  fontColor: string
  fontWeight: string
  textAlign?: TextAlignType
  textBaseline?: TextBaselineType
  filter: string
  letterSpacing: string
  wordSpacing: string
  textRowMaxWidth?: number
  richTextWidth?: number
  richTextHeight?: number
  image?: string
  imageWidth: number
  imageHeight: number
  shadowStyle?: Partial<CanvasShadowStyles>
  advancedStyle?: AdvancedStyleType
  extraDrawFunc?: Function
  onSuccess: Function
  onBeforeDestroy: Function
  onDestroyed: Function
  onObserveError: Function
}

export interface DecodeBlindWatermarkOptions {
  url: string
  fillColor: string
  compositeOperation: string
  mode: DecodeBlindWatermarkModeType
  compositeTimes: number
  onSuccess: Function
}

export interface CustomContentSVGType {
  element: Element
  width: number
  height: number
}

export interface ImageWatermarkOptions extends WatermarkOptions {
  dom: HTMLImageElement
  crossOrigin: boolean
}
