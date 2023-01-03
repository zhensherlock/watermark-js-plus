export enum ContentTypeEnum {
  text = 'text',
  image = 'image',
  multiLineText = 'multi-line-text',
  richText = 'rich-text'
}
export enum TextAlignEnum {
  center = 'center',
  left = 'left',
  right = 'right'
}

export enum TextBaselineEnum {
  top = 'top',
  bottom = 'bottom',
  middle = 'middle'
}

export enum CreateWatermarkModeEnum {
  default = 'default',
  blind = 'blind'
}

export enum DecodeBlindWatermarkModeEnum {
  canvas = 'canvas',
  html = 'html',
  svg = 'svg'
}

export interface WatermarkDom extends HTMLDivElement {
  __WATERMARK__?: string;
  __WATERMARK__INSTANCE__?: any;
}

export interface WatermarkOptions {
  width: number;
  height: number;
  rotate: number;
  contentType: ContentTypeEnum;
  content: string;
  image?: string;
  imageWidth: number;
  imageHeight: number;
  lineHeight: number;
  zIndex: number;
  backgroundPosition: string;
  backgroundRepeat: string;
  fontSize: number;
  fontFamily: string;
  textAlign: TextAlignEnum; // 对齐方式 center | left | right
  textBaseline: TextBaselineEnum; // 底部对齐方式 top | bottom | middle
  fontColor: string;
  globalAlpha: number;
  fontWeight: string;
  mode: CreateWatermarkModeEnum; // 模式 default | blind
  mutationObserve: boolean;
  unique: boolean;
  parent: Element | string;
  onSuccess: Function;
  onBeforeDestroy: Function;
  onDestroyed: Function;
}

export interface DecodeBlindWatermarkOptions {
  url: string;
  fillColor: string;
  compositeOperation: string;
  mode: DecodeBlindWatermarkModeEnum;
  onSuccess: Function;
}
