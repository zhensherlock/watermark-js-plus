export const defaultConfig = {
  width: 300,
  height: 300,
  rotate: 45,
  layout: 'default',
  // layout: 'grid',
  // gridLayoutOptions: {
  //   rows: 2,
  //   cols: 2,
  //   matrix: [[1, 0], [0, 1]]
  // },
  contentType: 'text',
  content: 'this is my new watermark',
  globalAlpha: 0.5,
  zIndex: 10000,
  mutationObserve: true,
  monitorProtection: true,
  auxiliaryLine: false,
  movable: false,
  mode: 'default',
  parent: 'body',
  backgroundPosition: '0 0, 0 0',
  backgroundRepeat: 'repeat',
  translatePlacement: 'middle',
  translateX: undefined,
  translateY: undefined,
  textType: 'fill',
  textRowMaxWidth: undefined,
  lineHeight: 30,
  fontSize: '20px',
  fontFamily: 'sans-serif',
  fontStyle: '',
  fontVariant: '',
  fontColor: '#000',
  fontWeight: 'normal',
  textAlign: undefined,
  textBaseline: undefined,
  filter: 'none',
  letterSpacing: '0px',
  richTextWidth: undefined,
  richTextHeight: undefined,
  image: '',
  imageWidth: undefined,
  imageHeight: undefined,
  shadowStyle: {
    shadowBlur: 10,
    shadowColor: '#000000FF',
    shadowOffsetX: 0,
    shadowOffsetY: 0
  },
  advancedStyle: {
    type: 'linear',
    params: {
      linear: {
        // x0: 0,
        // y0: 0,
        // x1: 0,
        // y1: 0,
      },
      radial: {
        // x0: 0,
        // y0: 0,
        // r0: 0,
        // x1: 0,
        // y1: 0,
        // r1: 0,
      },
      conic: {
        // startAngle: 0,
        // x: 0,
        // y: 0,
      },
      pattern: {
        image: '',
        repetition: ''
      }
    },
    colorStops: [
      { offset: 0, color: 'red' },
      { offset: 0.5, color: 'green' },
      { offset: 1, color: 'blue' }
    ]
  },
  extraDrawFunc: '',
  onSuccess: '',
  onBeforeDestroy: '',
  onDestroyed: ''
}

export const basicOptionKeys = [
  'width',
  'height',
  'rotate',
  'contentType',
  'content'
]

export const positionOptionKeys = [
  'translatePlacement',
  'translateX',
  'translateY',
  'backgroundPosition',
  'backgroundRepeat',
  'parent',
  'zIndex'
]

export const richTextOptionKeys = [
  'richTextWidth',
  'richTextHeight'
]

export const imageOptionKeys = [
  'image',
  'imageWidth',
  'imageHeight'
]

export const styleOptionKeys = [
  'globalAlpha',
  'mode',
  'textType',
  'lineHeight',
  'fontSize',
  'fontFamily',
  'fontStyle',
  'fontVariant',
  'fontColor',
  'fontWeight',
  'textAlign',
  'textBaseline',
  'filter',
  'textRowMaxWidth',
  'letterSpacing',
  'wordSpacing'
]

export const shadowOptionKeys = [
  'shadowStyle'
]

export const advancedStyleOptionKeys = [
  'advancedStyle'
]

export const extraOptionKeys = [
  'mutationObserve',
  'monitorProtection',
  'auxiliaryLine',
  'movable'
]
