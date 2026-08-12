<script setup lang="ts">
import {
  Aim,
  ArrowDown,
  Back,
  Bottom,
  BottomLeft,
  BottomRight,
  CircleCheck,
  Delete,
  Document,
  Download,
  Grid,
  Lock,
  Picture,
  RefreshLeft,
  Right,
  Top,
  TopLeft,
  TopRight,
  UploadFilled,
} from '@element-plus/icons-vue'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { ImageWatermark } from '../../../src'
import type { ImageWatermarkOptions } from '../../../src'

type Locale = 'en' | 'zh'
type WatermarkKind = 'text' | 'logo'
type WatermarkPreset = 'custom' | 'copyright' | 'subtle' | 'tiled' | 'logo-corner'
type TextRendering = 'fill' | 'stroke'
type GradientType = 'linear' | 'radial' | 'conic'
type RepeatPattern = 'grid' | 'diagonal'
type WatermarkPosition =
  'top-start' | 'top' | 'top-end' | 'left' | 'middle' | 'right' | 'bottom-start' | 'bottom' | 'bottom-end' | 'repeat'

interface ImageMeta {
  name: string
  size: number
  width: number
  height: number
}

const props = withDefaults(
  defineProps<{
    locale?: Locale
  }>(),
  {
    locale: 'en',
  },
)

const messages = {
  en: {
    localBadge: 'Local processing',
    localMessage: 'Your images stay in this browser and are never uploaded to a server.',
    previewTitle: 'Image preview',
    settingsTitle: 'Watermark settings',
    uploadTitle: 'Choose an image to begin',
    uploadBody: 'Drop a JPG, PNG, or WebP here, or click to browse.',
    uploadHint: 'Paste supported · Up to 15 MB · Export max edge 2400 px',
    replace: 'Replace',
    remove: 'Remove image',
    original: 'Original',
    output: 'Output',
    rendering: 'Updating preview…',
    presetLabel: 'Preset',
    customPreset: 'Custom',
    copyrightPreset: 'Copyright corner',
    subtlePreset: 'Subtle signature',
    tiledPreset: 'Tiled protection',
    logoCornerPreset: 'Logo corner',
    kindLabel: 'Watermark type',
    textKind: 'Text',
    logoKind: 'Logo',
    textLabel: 'Watermark text',
    textPlaceholder: 'Enter watermark text',
    logoLabel: 'Logo image',
    chooseLogo: 'Choose logo',
    replaceLogo: 'Replace logo',
    logoHint: 'PNG with transparency works best.',
    colorLabel: 'Text color',
    textStyleLabel: 'Text style',
    textStyleHint: 'Typography, outline, multi-line, and gradient.',
    textStyleExpandLabel: 'Show text style settings',
    textStyleCollapseLabel: 'Hide text style settings',
    fontFamilyLabel: 'Font family',
    sansSerifFont: 'Sans serif',
    serifFont: 'Serif',
    monospaceFont: 'Monospace',
    fontWeightLabel: 'Weight',
    regularWeight: 'Regular',
    mediumWeight: 'Medium',
    semiboldWeight: 'Semibold',
    boldWeight: 'Bold',
    italicLabel: 'Italic',
    textRenderingLabel: 'Rendering',
    fillRendering: 'Fill',
    strokeRendering: 'Outline',
    strokeWidthLabel: 'Outline width',
    letterSpacingLabel: 'Letter spacing',
    multiLineLabel: 'Multi-line text',
    multiLineHint: 'Wrap long text and preserve manual line breaks.',
    lineHeightLabel: 'Line height',
    textMaxWidthLabel: 'Maximum width',
    gradientLabel: 'Text gradient',
    gradientHint: 'Replace the solid text color with a gradient.',
    gradientActive: 'Gradient active',
    gradientToggleLabel: 'Enable text gradient',
    gradientTypeLabel: 'Gradient type',
    linearGradient: 'Linear',
    radialGradient: 'Radial',
    conicGradient: 'Conic',
    gradientStartLabel: 'Start color',
    gradientEndLabel: 'End color',
    gradientAngleLabel: 'Angle',
    imageFilterLabel: 'Image filters',
    imageFilterHint: 'Tune the uploaded logo without changing the source file.',
    imageFilterExpandLabel: 'Show image filter settings',
    imageFilterCollapseLabel: 'Hide image filter settings',
    brightnessLabel: 'Brightness',
    contrastLabel: 'Contrast',
    saturationLabel: 'Saturation',
    grayscaleLabel: 'Grayscale',
    resetFilters: 'Reset filters',
    sizeLabel: 'Size',
    opacityLabel: 'Opacity',
    rotationLabel: 'Rotation',
    shadowLabel: 'Shadow',
    shadowHint: 'Improve contrast against detailed backgrounds.',
    shadowToggleLabel: 'Enable watermark shadow',
    shadowColorLabel: 'Shadow color',
    shadowBlurLabel: 'Blur',
    shadowOffsetXLabel: 'Horizontal offset',
    shadowOffsetYLabel: 'Vertical offset',
    shadowExpandLabel: 'Show shadow settings',
    shadowCollapseLabel: 'Hide shadow settings',
    positionLabel: 'Position',
    precisePositionLabel: 'Precise offset',
    precisePositionHint: 'Fine-tune from the selected anchor point.',
    precisePositionExpandLabel: 'Show precise position settings',
    precisePositionCollapseLabel: 'Hide precise position settings',
    positionOffsetXLabel: 'X offset',
    positionOffsetYLabel: 'Y offset',
    repeatPatternLabel: 'Pattern',
    gridPattern: 'Grid',
    diagonalPattern: 'Diagonal',
    horizontalSpacingLabel: 'Horizontal spacing',
    verticalSpacingLabel: 'Vertical spacing',
    reset: 'Reset options',
    download: 'Download PNG',
    downloadHint: 'Keeps the aspect ratio; large images are scaled to a 2400 px maximum edge.',
    ready: 'Ready to export',
    sourceError: 'Choose a JPG, PNG, or WebP image smaller than 15 MB.',
    logoError: 'Choose a logo image smaller than 5 MB.',
    loadError: 'This image could not be read. Try another file.',
    renderError: 'The watermark could not be rendered. Try a smaller image.',
    textRequired: 'Enter watermark text to continue.',
    logoRequired: 'Choose a logo to continue.',
    topStart: 'Top left',
    top: 'Top center',
    topEnd: 'Top right',
    left: 'Middle left',
    middle: 'Center',
    right: 'Middle right',
    bottomStart: 'Bottom left',
    bottom: 'Bottom center',
    bottomEnd: 'Bottom right',
    repeat: 'Repeat',
  },
  zh: {
    localBadge: '本地处理',
    localMessage: '图片仅在当前浏览器中处理，不会上传到服务器。',
    previewTitle: '图片预览',
    settingsTitle: '水印设置',
    uploadTitle: '选择一张图片开始',
    uploadBody: '拖入 JPG、PNG 或 WebP 图片，或点击选择文件。',
    uploadHint: '支持粘贴 · 最大 15 MB · 导出最长边 2400 px',
    replace: '更换图片',
    remove: '移除图片',
    original: '原图',
    output: '导出',
    rendering: '正在更新预览…',
    presetLabel: '水印预设',
    customPreset: '自定义',
    copyrightPreset: '版权角标',
    subtlePreset: '轻量签名',
    tiledPreset: '平铺保护',
    logoCornerPreset: 'Logo 角标',
    kindLabel: '水印类型',
    textKind: '文字',
    logoKind: '图片',
    textLabel: '水印文字',
    textPlaceholder: '请输入水印内容',
    logoLabel: '水印图片',
    chooseLogo: '选择图片水印',
    replaceLogo: '更换图片水印',
    logoHint: '推荐使用带透明背景的 PNG。',
    colorLabel: '文字颜色',
    textStyleLabel: '文字样式',
    textStyleHint: '设置字体、描边、多行文字和渐变。',
    textStyleExpandLabel: '展开文字样式设置',
    textStyleCollapseLabel: '收起文字样式设置',
    fontFamilyLabel: '字体',
    sansSerifFont: '无衬线',
    serifFont: '衬线',
    monospaceFont: '等宽',
    fontWeightLabel: '字重',
    regularWeight: '常规',
    mediumWeight: '中等',
    semiboldWeight: '半粗',
    boldWeight: '粗体',
    italicLabel: '斜体',
    textRenderingLabel: '渲染方式',
    fillRendering: '填充',
    strokeRendering: '描边',
    strokeWidthLabel: '描边宽度',
    letterSpacingLabel: '字符间距',
    multiLineLabel: '多行文字',
    multiLineHint: '自动换行并保留手动输入的换行。',
    lineHeightLabel: '行高',
    textMaxWidthLabel: '最大宽度',
    gradientLabel: '文字渐变',
    gradientHint: '使用渐变替代纯色文字。',
    gradientActive: '已使用渐变',
    gradientToggleLabel: '启用文字渐变',
    gradientTypeLabel: '渐变类型',
    linearGradient: '线性',
    radialGradient: '径向',
    conicGradient: '锥形',
    gradientStartLabel: '起始颜色',
    gradientEndLabel: '结束颜色',
    gradientAngleLabel: '角度',
    imageFilterLabel: '图片滤镜',
    imageFilterHint: '不修改源文件，直接调整水印图片效果。',
    imageFilterExpandLabel: '展开图片滤镜设置',
    imageFilterCollapseLabel: '收起图片滤镜设置',
    brightnessLabel: '亮度',
    contrastLabel: '对比度',
    saturationLabel: '饱和度',
    grayscaleLabel: '灰度',
    resetFilters: '重置滤镜',
    sizeLabel: '大小',
    opacityLabel: '透明度',
    rotationLabel: '旋转角度',
    shadowLabel: '阴影',
    shadowHint: '提升水印在复杂背景上的辨识度。',
    shadowToggleLabel: '启用水印阴影',
    shadowColorLabel: '阴影颜色',
    shadowBlurLabel: '模糊',
    shadowOffsetXLabel: '水平偏移',
    shadowOffsetYLabel: '垂直偏移',
    shadowExpandLabel: '展开阴影设置',
    shadowCollapseLabel: '收起阴影设置',
    positionLabel: '水印位置',
    precisePositionLabel: '精确偏移',
    precisePositionHint: '基于当前定位点进行细微调整。',
    precisePositionExpandLabel: '展开精确位置设置',
    precisePositionCollapseLabel: '收起精确位置设置',
    positionOffsetXLabel: '水平偏移',
    positionOffsetYLabel: '垂直偏移',
    repeatPatternLabel: '排列方式',
    gridPattern: '网格',
    diagonalPattern: '交错',
    horizontalSpacingLabel: '水平间距',
    verticalSpacingLabel: '垂直间距',
    reset: '重置参数',
    download: '下载 PNG',
    downloadHint: '保留原图宽高比；大图会缩放至最长边 2400 px。',
    ready: '可以导出',
    sourceError: '请选择小于 15 MB 的 JPG、PNG 或 WebP 图片。',
    logoError: '请选择小于 5 MB 的图片作为水印。',
    loadError: '无法读取这张图片，请更换文件后重试。',
    renderError: '水印生成失败，请尝试使用尺寸更小的图片。',
    textRequired: '请输入水印文字后继续。',
    logoRequired: '请先选择一张图片作为水印。',
    topStart: '左上',
    top: '顶部居中',
    topEnd: '右上',
    left: '左侧居中',
    middle: '居中',
    right: '右侧居中',
    bottomStart: '左下',
    bottom: '底部居中',
    bottomEnd: '右下',
    repeat: '平铺',
  },
} as const

const copy = computed(() => messages[props.locale])
const sourceInput = ref<HTMLInputElement>()
const logoInput = ref<HTMLInputElement>()
const sourceUrl = ref('')
const logoUrl = ref('')
const resultUrl = ref('')
const sourceMeta = ref<ImageMeta>()
const outputSize = ref<{ width: number; height: number }>()
const logoAspectRatio = ref(1)
const selectedPreset = ref<WatermarkPreset>('custom')
const watermarkKind = ref<WatermarkKind>('text')
const watermarkText = ref('watermark-js-plus')
const fontSize = ref(48)
const logoScale = ref(18)
const fontColor = ref('#ffffff')
const textStyleExpanded = ref(false)
const fontFamily = ref('Arial, sans-serif')
const fontWeight = ref('400')
const fontItalic = ref(false)
const textRendering = ref<TextRendering>('fill')
const strokeWidth = ref(2)
const letterSpacing = ref(0)
const multiLineEnabled = ref(false)
const textLineHeight = ref(1.25)
const textMaxWidth = ref(60)
const gradientEnabled = ref(false)
const gradientType = ref<GradientType>('linear')
const gradientStartColor = ref('#ffffff')
const gradientEndColor = ref('#409eff')
const gradientAngle = ref(0)
const imageFilterExpanded = ref(false)
const imageBrightness = ref(100)
const imageContrast = ref(100)
const imageSaturation = ref(100)
const imageGrayscale = ref(0)
const opacity = ref(62)
const rotation = ref(0)
const shadowEnabled = ref(false)
const shadowExpanded = ref(false)
const shadowColor = ref('#00000080')
const shadowBlur = ref(8)
const shadowOffsetX = ref(2)
const shadowOffsetY = ref(2)
const position = ref<WatermarkPosition>('bottom-end')
const precisePositionExpanded = ref(false)
const positionOffsetX = ref(0)
const positionOffsetY = ref(0)
const repeatPattern = ref<RepeatPattern>('grid')
const repeatSpacingX = ref(72)
const repeatSpacingY = ref(52)
const processing = ref(false)
const errorMessage = ref('')
const isDragging = ref(false)

const MAX_SOURCE_BYTES = 15 * 1024 * 1024
const MAX_LOGO_BYTES = 5 * 1024 * 1024
const MAX_OUTPUT_EDGE = 2400
let renderTimer: ReturnType<typeof setTimeout> | undefined
let renderRequest = 0
let sourceRequest = 0
let dragDepth = 0
let applyingPreset = false

const positions = computed(() => [
  { value: 'top-start' as const, label: copy.value.topStart, icon: TopLeft },
  { value: 'top' as const, label: copy.value.top, icon: Top },
  { value: 'top-end' as const, label: copy.value.topEnd, icon: TopRight },
  { value: 'left' as const, label: copy.value.left, icon: Back },
  { value: 'middle' as const, label: copy.value.middle, icon: Aim },
  { value: 'right' as const, label: copy.value.right, icon: Right },
  { value: 'bottom-start' as const, label: copy.value.bottomStart, icon: BottomLeft },
  { value: 'bottom' as const, label: copy.value.bottom, icon: Bottom },
  { value: 'bottom-end' as const, label: copy.value.bottomEnd, icon: BottomRight },
  { value: 'repeat' as const, label: copy.value.repeat, icon: Grid },
])

const presetOptions = computed(() => [
  { value: 'custom' as const, label: copy.value.customPreset },
  { value: 'copyright' as const, label: copy.value.copyrightPreset },
  { value: 'subtle' as const, label: copy.value.subtlePreset },
  { value: 'tiled' as const, label: copy.value.tiledPreset },
  { value: 'logo-corner' as const, label: copy.value.logoCornerPreset },
])

const fontFamilyOptions = computed(() => [
  { value: 'Arial, sans-serif', label: copy.value.sansSerifFont },
  { value: 'Georgia, serif', label: copy.value.serifFont },
  { value: '"Courier New", monospace', label: copy.value.monospaceFont },
])

const fontWeightOptions = computed(() => [
  { value: '400', label: copy.value.regularWeight },
  { value: '500', label: copy.value.mediumWeight },
  { value: '600', label: copy.value.semiboldWeight },
  { value: '700', label: copy.value.boldWeight },
])

const previewUrl = computed(() => resultUrl.value || sourceUrl.value)
const sizeValue = computed({
  get: () => (watermarkKind.value === 'text' ? fontSize.value : logoScale.value),
  set: value => {
    if (watermarkKind.value === 'text') {
      fontSize.value = value
    } else {
      logoScale.value = value
    }
  },
})
const sizeRange = computed(() =>
  watermarkKind.value === 'text' ? { min: 16, max: 160, suffix: 'px' } : { min: 6, max: 44, suffix: '%' },
)
const watermarkReady = computed(() =>
  watermarkKind.value === 'text' ? Boolean(watermarkText.value.trim()) : Boolean(logoUrl.value),
)
const canDownload = computed(() =>
  Boolean(sourceUrl.value && resultUrl.value && watermarkReady.value && !processing.value),
)
const sourceSizeLabel = computed(() => {
  if (!sourceMeta.value) {
    return ''
  }
  return `${sourceMeta.value.width} × ${sourceMeta.value.height} · ${formatBytes(sourceMeta.value.size)}`
})
const outputSizeLabel = computed(() => {
  if (!outputSize.value) {
    return ''
  }
  return `${outputSize.value.width} × ${outputSize.value.height} PNG`
})
const imageFilterValue = computed(() => {
  if (
    imageBrightness.value === 100 &&
    imageContrast.value === 100 &&
    imageSaturation.value === 100 &&
    imageGrayscale.value === 0
  ) {
    return 'none'
  }
  return [
    `brightness(${imageBrightness.value}%)`,
    `contrast(${imageContrast.value}%)`,
    `saturate(${imageSaturation.value}%)`,
    `grayscale(${imageGrayscale.value}%)`,
  ].join(' ')
})
const requirementMessage = computed(() => {
  if (!sourceUrl.value) {
    return ''
  }
  if (watermarkKind.value === 'text' && !watermarkText.value.trim()) {
    return copy.value.textRequired
  }
  if (watermarkKind.value === 'logo' && !logoUrl.value) {
    return copy.value.logoRequired
  }
  return ''
})

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`
  }
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image), { once: true })
    image.addEventListener('error', () => reject(new Error(copy.value.loadError)), { once: true })
    image.src = url
  })
}

function isSupportedImage(file: File, maxBytes: number) {
  return file.type.startsWith('image/') && file.size <= maxBytes
}

async function setSourceFile(file?: File) {
  if (!file || !isSupportedImage(file, MAX_SOURCE_BYTES)) {
    errorMessage.value = copy.value.sourceError
    return
  }

  const requestId = ++sourceRequest
  const nextUrl = URL.createObjectURL(file)
  errorMessage.value = ''

  try {
    const image = await loadImage(nextUrl)
    if (requestId !== sourceRequest) {
      URL.revokeObjectURL(nextUrl)
      return
    }

    const previousUrl = sourceUrl.value
    sourceMeta.value = {
      name: file.name || 'pasted-image.png',
      size: file.size,
      width: image.naturalWidth,
      height: image.naturalHeight,
    }
    outputSize.value = undefined
    resultUrl.value = ''
    sourceUrl.value = nextUrl
    if (previousUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previousUrl)
    }
  } catch {
    URL.revokeObjectURL(nextUrl)
    errorMessage.value = copy.value.loadError
  } finally {
    if (sourceInput.value) {
      sourceInput.value.value = ''
    }
  }
}

async function setLogoFile(file?: File) {
  if (!file || !isSupportedImage(file, MAX_LOGO_BYTES)) {
    errorMessage.value = copy.value.logoError
    return
  }

  const nextUrl = URL.createObjectURL(file)
  errorMessage.value = ''

  try {
    const image = await loadImage(nextUrl)
    const previousUrl = logoUrl.value
    logoAspectRatio.value = image.naturalWidth / Math.max(1, image.naturalHeight)
    logoUrl.value = nextUrl
    if (previousUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previousUrl)
    }
  } catch {
    URL.revokeObjectURL(nextUrl)
    errorMessage.value = copy.value.loadError
  } finally {
    if (logoInput.value) {
      logoInput.value.value = ''
    }
  }
}

function removeSource() {
  sourceRequest += 1
  renderRequest += 1
  if (sourceUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(sourceUrl.value)
  }
  sourceUrl.value = ''
  resultUrl.value = ''
  sourceMeta.value = undefined
  outputSize.value = undefined
  processing.value = false
  errorMessage.value = ''
}

function setDefaultOptions() {
  watermarkKind.value = 'text'
  watermarkText.value = 'watermark-js-plus'
  fontSize.value = 48
  logoScale.value = 18
  fontColor.value = '#ffffff'
  textStyleExpanded.value = false
  fontFamily.value = 'Arial, sans-serif'
  fontWeight.value = '400'
  fontItalic.value = false
  textRendering.value = 'fill'
  strokeWidth.value = 2
  letterSpacing.value = 0
  multiLineEnabled.value = false
  textLineHeight.value = 1.25
  textMaxWidth.value = 60
  gradientEnabled.value = false
  gradientType.value = 'linear'
  gradientStartColor.value = '#ffffff'
  gradientEndColor.value = '#409eff'
  gradientAngle.value = 0
  imageFilterExpanded.value = false
  imageBrightness.value = 100
  imageContrast.value = 100
  imageSaturation.value = 100
  imageGrayscale.value = 0
  opacity.value = 62
  rotation.value = 0
  shadowEnabled.value = false
  shadowExpanded.value = false
  shadowColor.value = '#00000080'
  shadowBlur.value = 8
  shadowOffsetX.value = 2
  shadowOffsetY.value = 2
  position.value = 'bottom-end'
  precisePositionExpanded.value = false
  positionOffsetX.value = 0
  positionOffsetY.value = 0
  repeatPattern.value = 'grid'
  repeatSpacingX.value = 72
  repeatSpacingY.value = 52
  errorMessage.value = ''
}

function resetOptions() {
  setDefaultOptions()
  selectedPreset.value = 'custom'
}

function applyPreset(preset: WatermarkPreset) {
  selectedPreset.value = preset
  if (preset === 'custom') {
    return
  }

  applyingPreset = true
  setDefaultOptions()
  selectedPreset.value = preset

  switch (preset) {
    case 'copyright':
      watermarkText.value = '© watermark-js-plus'
      fontSize.value = 46
      fontWeight.value = '600'
      opacity.value = 72
      shadowEnabled.value = true
      shadowExpanded.value = false
      break
    case 'subtle':
      fontSize.value = 34
      opacity.value = 30
      break
    case 'tiled':
      fontSize.value = 36
      opacity.value = 22
      rotation.value = -30
      position.value = 'repeat'
      repeatPattern.value = 'diagonal'
      repeatSpacingX.value = 88
      repeatSpacingY.value = 64
      break
    case 'logo-corner':
      watermarkKind.value = 'logo'
      logoScale.value = 16
      opacity.value = 72
      break
  }

  void nextTick(() => {
    applyingPreset = false
  })
}

function resetImageFilters() {
  imageBrightness.value = 100
  imageContrast.value = 100
  imageSaturation.value = 100
  imageGrayscale.value = 0
}

function getTextLayoutMetrics(pixelWidth: number) {
  const content = watermarkText.value.trim()
  const lines = content.split('\n')
  const weightFactor = Number(fontWeight.value) >= 600 ? 1.06 : 1
  const characterWidth = Math.max(1, (fontSize.value * 0.58 + letterSpacing.value) * weightFactor)
  const maximumWidth = pixelWidth * (multiLineEnabled.value ? textMaxWidth.value / 100 : 0.82)
  const charactersPerLine = Math.max(1, Math.floor(maximumWidth / characterWidth))
  const lineCount = multiLineEnabled.value
    ? lines.reduce((total, line) => total + Math.max(1, Math.ceil(line.length / charactersPerLine)), 0)
    : 1
  const measuredWidth = Math.max(fontSize.value * 2.2, ...lines.map(line => line.length * characterWidth))
  const textRowWidth = Math.min(maximumWidth, measuredWidth)
  const stylePadding = textRendering.value === 'stroke' ? strokeWidth.value * 2 : 0

  return {
    lineCount,
    textRowWidth,
    markWidth: textRowWidth + stylePadding,
    markHeight:
      (multiLineEnabled.value ? lineCount * fontSize.value * textLineHeight.value : fontSize.value * 1.25) +
      stylePadding,
  }
}

function getWatermarkMetrics(pixelWidth: number) {
  const textMetrics = getTextLayoutMetrics(pixelWidth)
  const markWidth = watermarkKind.value === 'text' ? textMetrics.markWidth : pixelWidth * (logoScale.value / 100)
  const markHeight =
    watermarkKind.value === 'text' ? textMetrics.markHeight : markWidth / Math.max(0.1, logoAspectRatio.value)
  const radians = -rotation.value * (Math.PI / 180)
  const cosine = Math.cos(radians)
  const sine = Math.sin(radians)
  const corners = [
    { x: 0, y: 0 },
    { x: markWidth * cosine, y: markWidth * sine },
    { x: -markHeight * sine, y: markHeight * cosine },
    { x: markWidth * cosine - markHeight * sine, y: markWidth * sine + markHeight * cosine },
  ]
  const contentMinX = Math.min(...corners.map(corner => corner.x))
  const contentMaxX = Math.max(...corners.map(corner => corner.x))
  const contentMinY = Math.min(...corners.map(corner => corner.y))
  const contentMaxY = Math.max(...corners.map(corner => corner.y))
  const minX = shadowEnabled.value
    ? Math.min(contentMinX, contentMinX + shadowOffsetX.value - shadowBlur.value)
    : contentMinX
  const maxX = shadowEnabled.value
    ? Math.max(contentMaxX, contentMaxX + shadowOffsetX.value + shadowBlur.value)
    : contentMaxX
  const minY = shadowEnabled.value
    ? Math.min(contentMinY, contentMinY + shadowOffsetY.value - shadowBlur.value)
    : contentMinY
  const maxY = shadowEnabled.value
    ? Math.max(contentMaxY, contentMaxY + shadowOffsetY.value + shadowBlur.value)
    : contentMaxY
  return {
    markWidth,
    markHeight,
    textRowWidth: textMetrics.textRowWidth,
    boundsWidth: maxX - minX,
    boundsHeight: maxY - minY,
    imageOriginOffsetX: (minX + maxX) / 2,
    imageOriginOffsetY: (minY + maxY) / 2,
  }
}

function createGradientStyle(
  metrics: ReturnType<typeof getWatermarkMetrics>,
  density: number,
): ImageWatermarkOptions['advancedStyle'] {
  if (watermarkKind.value !== 'text' || !gradientEnabled.value) {
    return undefined
  }

  const width = metrics.markWidth / density
  const height = metrics.markHeight / density
  const angle = gradientAngle.value * (Math.PI / 180)
  const radius = Math.max(width, height) / 2
  const colorStops = [
    { offset: 0, color: gradientStartColor.value },
    { offset: 1, color: gradientEndColor.value },
  ]

  switch (gradientType.value) {
    case 'radial':
      return {
        type: 'radial',
        params: {
          radial: { x0: 0, y0: 0, r0: 0, x1: 0, y1: 0, r1: radius },
        },
        colorStops,
      }
    case 'conic':
      return {
        type: 'conic',
        params: {
          conic: { startAngle: angle, x: 0, y: 0 },
        },
        colorStops,
      }
    default: {
      const x = Math.cos(angle) * (width / 2)
      const y = Math.sin(angle) * (height / 2)
      return {
        type: 'linear',
        params: {
          linear: { x0: -x, y0: -y, x1: x, y1: y },
        },
        colorStops,
      }
    }
  }
}

function getPosition(pixelWidth: number, pixelHeight: number, boundsWidth: number, boundsHeight: number) {
  const margin = Math.max(16, Math.min(pixelWidth, pixelHeight) * 0.035)
  const left = Math.min(pixelWidth / 2, margin + boundsWidth / 2)
  const right = Math.max(pixelWidth / 2, pixelWidth - margin - boundsWidth / 2)
  const top = Math.min(pixelHeight / 2, margin + boundsHeight / 2)
  const bottom = Math.max(pixelHeight / 2, pixelHeight - margin - boundsHeight / 2)
  const centerX = pixelWidth / 2
  const centerY = pixelHeight / 2
  const coordinates: Record<Exclude<WatermarkPosition, 'repeat'>, [number, number]> = {
    'top-start': [left, top],
    top: [centerX, top],
    'top-end': [right, top],
    left: [left, centerY],
    middle: [centerX, centerY],
    right: [right, centerY],
    'bottom-start': [left, bottom],
    bottom: [centerX, bottom],
    'bottom-end': [right, bottom],
  }
  return coordinates[position.value === 'repeat' ? 'middle' : position.value]
}

function createOptions(
  image: HTMLImageElement,
  pixelWidth: number,
  pixelHeight: number,
  density: number,
): Partial<ImageWatermarkOptions> {
  const metrics = getWatermarkMetrics(pixelWidth)
  const base = {
    dom: image,
    rotate: -rotation.value,
    globalAlpha: opacity.value / 100,
    fontColor: fontColor.value,
    fontSize: `${fontSize.value / density}px`,
    fontFamily: fontFamily.value,
    fontWeight: fontWeight.value,
    fontStyle: fontItalic.value ? 'italic' : '',
    letterSpacing: `${letterSpacing.value / density}px`,
    textType: textRendering.value,
    lineHeight: (fontSize.value * textLineHeight.value) / density,
    textAlign: 'center' as const,
    textBaseline: 'middle' as const,
    content: watermarkText.value.trim(),
    contentType:
      watermarkKind.value === 'text'
        ? multiLineEnabled.value
          ? ('multi-line-text' as const)
          : ('text' as const)
        : ('image' as const),
    image: watermarkKind.value === 'logo' ? logoUrl.value : undefined,
    imageWidth: watermarkKind.value === 'logo' ? metrics.markWidth / density : 0,
    imageHeight: 0,
    filter: watermarkKind.value === 'logo' ? imageFilterValue.value : 'none',
    advancedStyle: createGradientStyle(metrics, density),
    extraDrawFunc:
      watermarkKind.value === 'text' && textRendering.value === 'stroke'
        ? (context: CanvasRenderingContext2D) => {
            context.lineJoin = 'round'
            context.lineWidth = strokeWidth.value / density
          }
        : undefined,
    shadowStyle: shadowEnabled.value
      ? {
          shadowBlur: shadowBlur.value,
          shadowColor: shadowColor.value,
          shadowOffsetX: shadowOffsetX.value,
          shadowOffsetY: shadowOffsetY.value,
        }
      : undefined,
    crossOrigin: false,
  }

  if (position.value === 'repeat') {
    const tileWidth = Math.max(80, metrics.boundsWidth + repeatSpacingX.value)
    const tileHeight = Math.max(64, metrics.boundsHeight + repeatSpacingY.value)
    const cols = Math.ceil(pixelWidth / tileWidth) + 1
    const rows = Math.ceil(pixelHeight / tileHeight) + 1
    return {
      ...base,
      width: Math.ceil(tileWidth / density),
      height: Math.ceil(tileHeight / density),
      textRowMaxWidth: Math.ceil(metrics.textRowWidth / density),
      gridLayoutOptions: {
        cols,
        rows,
        gap: [0, 0],
        matrix:
          repeatPattern.value === 'diagonal'
            ? Array.from({ length: rows }, (_, rowIndex) =>
                Array.from({ length: cols }, (_, columnIndex) => ((rowIndex + columnIndex) % 2 === 0 ? 1 : 0)),
              )
            : undefined,
      },
    }
  }

  const [translateX, translateY] = getPosition(pixelWidth, pixelHeight, metrics.boundsWidth, metrics.boundsHeight)
  const preciseTranslateX = translateX + positionOffsetX.value
  const preciseTranslateY = translateY + positionOffsetY.value
  const imageTranslateX =
    watermarkKind.value === 'logo' ? preciseTranslateX - metrics.imageOriginOffsetX : preciseTranslateX
  const imageTranslateY =
    watermarkKind.value === 'logo' ? preciseTranslateY - metrics.imageOriginOffsetY : preciseTranslateY
  return {
    ...base,
    width: image.width,
    height: image.height,
    translateX: imageTranslateX / density,
    translateY: imageTranslateY / density,
    textRowMaxWidth: Math.ceil(metrics.textRowWidth) / density,
    gridLayoutOptions: {
      cols: 1,
      rows: 1,
      gap: [0, 0],
    },
  }
}

async function renderWatermark(requestId: number) {
  if (!sourceUrl.value || !watermarkReady.value) {
    resultUrl.value = ''
    outputSize.value = undefined
    processing.value = false
    return
  }

  try {
    const image = await loadImage(sourceUrl.value)
    if (requestId !== renderRequest) {
      return
    }

    const scale = Math.min(1, MAX_OUTPUT_EDGE / Math.max(image.naturalWidth, image.naturalHeight))
    const pixelWidth = Math.max(1, Math.round(image.naturalWidth * scale))
    const pixelHeight = Math.max(1, Math.round(image.naturalHeight * scale))
    const density = Math.max(1, window.devicePixelRatio || 1)
    image.width = Math.max(1, Math.round(pixelWidth / density))
    image.height = Math.max(1, Math.round(pixelHeight / density))

    const watermark = new ImageWatermark(createOptions(image, pixelWidth, pixelHeight, density))
    await watermark.create()

    if (requestId !== renderRequest) {
      return
    }

    resultUrl.value = image.src
    outputSize.value = {
      width: Math.round(image.width * density),
      height: Math.round(image.height * density),
    }
    errorMessage.value = ''
  } catch {
    if (requestId === renderRequest) {
      resultUrl.value = ''
      outputSize.value = undefined
      errorMessage.value = copy.value.renderError
    }
  } finally {
    if (requestId === renderRequest) {
      processing.value = false
    }
  }
}

function scheduleRender() {
  const requestId = ++renderRequest
  if (renderTimer) {
    clearTimeout(renderTimer)
  }

  if (!sourceUrl.value || !watermarkReady.value) {
    resultUrl.value = ''
    outputSize.value = undefined
    processing.value = false
    return
  }

  processing.value = true
  renderTimer = setTimeout(() => renderWatermark(requestId), 140)
}

function handleShadowToggle(enabled: boolean | string | number) {
  shadowExpanded.value = Boolean(enabled)
}

function handleSourceChange(event: Event) {
  const input = event.target as HTMLInputElement
  void setSourceFile(input.files?.[0])
}

function handleLogoChange(event: Event) {
  const input = event.target as HTMLInputElement
  void setLogoFile(input.files?.[0])
}

function openSourcePicker() {
  sourceInput.value?.click()
}

function openLogoPicker() {
  logoInput.value?.click()
}

function handleDragEnter(event: DragEvent) {
  event.preventDefault()
  dragDepth += 1
  isDragging.value = true
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault()
  dragDepth = Math.max(0, dragDepth - 1)
  if (dragDepth === 0) {
    isDragging.value = false
  }
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  dragDepth = 0
  isDragging.value = false
  void setSourceFile(event.dataTransfer?.files?.[0])
}

function handlePaste(event: ClipboardEvent) {
  const target = event.target as HTMLElement | null
  if (target?.matches('input, textarea, [contenteditable="true"]')) {
    return
  }
  const item = Array.from(event.clipboardData?.items ?? []).find(
    clipboardItem => clipboardItem.kind === 'file' && clipboardItem.type.startsWith('image/'),
  )
  const file = item?.getAsFile()
  if (!file) {
    return
  }
  event.preventDefault()
  void setSourceFile(file)
}

function downloadResult() {
  if (!canDownload.value || !sourceMeta.value) {
    return
  }
  const baseName = sourceMeta.value.name.replace(/\.[^.]+$/, '') || 'image'
  const anchor = document.createElement('a')
  anchor.href = resultUrl.value
  anchor.download = `${baseName}-watermarked.png`
  anchor.click()
}

watch([sourceUrl, logoUrl], scheduleRender, { flush: 'post' })

watch(
  [
    watermarkKind,
    watermarkText,
    fontSize,
    logoScale,
    fontColor,
    fontFamily,
    fontWeight,
    fontItalic,
    textRendering,
    strokeWidth,
    letterSpacing,
    multiLineEnabled,
    textLineHeight,
    textMaxWidth,
    gradientEnabled,
    gradientType,
    gradientStartColor,
    gradientEndColor,
    gradientAngle,
    imageBrightness,
    imageContrast,
    imageSaturation,
    imageGrayscale,
    opacity,
    rotation,
    shadowEnabled,
    shadowColor,
    shadowBlur,
    shadowOffsetX,
    shadowOffsetY,
    position,
    positionOffsetX,
    positionOffsetY,
    repeatPattern,
    repeatSpacingX,
    repeatSpacingY,
  ],
  () => {
    if (!applyingPreset && selectedPreset.value !== 'custom') {
      selectedPreset.value = 'custom'
    }
    scheduleRender()
  },
  { flush: 'post' },
)

onMounted(() => {
  window.addEventListener('paste', handlePaste)
})

onUnmounted(() => {
  window.removeEventListener('paste', handlePaste)
  if (renderTimer) {
    clearTimeout(renderTimer)
  }
  if (sourceUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(sourceUrl.value)
  }
  if (logoUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(logoUrl.value)
  }
})
</script>

<template>
  <div
    class="image-watermark-tool"
    :class="{ 'is-dragging': isDragging }"
    @dragenter="handleDragEnter"
    @dragover.prevent
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <input
      ref="sourceInput"
      class="visually-hidden"
      type="file"
      accept="image/jpeg,image/png,image/webp"
      @change="handleSourceChange"
    />
    <input ref="logoInput" class="visually-hidden" type="file" accept="image/*" @change="handleLogoChange" />

    <div class="privacy-bar">
      <span class="privacy-badge">
        <el-icon><Lock /></el-icon>
        {{ copy.localBadge }}
      </span>
      <span>{{ copy.localMessage }}</span>
    </div>

    <div class="workspace">
      <section class="preview-panel" :aria-label="copy.previewTitle">
        <header class="panel-header preview-header">
          <div>
            <span class="panel-eyebrow">{{ copy.previewTitle }}</span>
            <template v-if="sourceMeta">
              <strong class="file-name">{{ sourceMeta.name }}</strong>
              <span class="file-meta">{{ sourceSizeLabel }}</span>
            </template>
          </div>
          <div v-if="sourceUrl" class="source-actions">
            <el-button :icon="RefreshLeft" @click="openSourcePicker">{{ copy.replace }}</el-button>
            <el-button :icon="Delete" circle :aria-label="copy.remove" @click="removeSource" />
          </div>
        </header>

        <button v-if="!sourceUrl" class="upload-zone" type="button" @click="openSourcePicker">
          <span class="upload-icon" aria-hidden="true">
            <el-icon><UploadFilled /></el-icon>
          </span>
          <strong>{{ copy.uploadTitle }}</strong>
          <span>{{ copy.uploadBody }}</span>
          <small>{{ copy.uploadHint }}</small>
        </button>

        <div v-else class="preview-stage">
          <img :src="previewUrl" :alt="copy.previewTitle" />
          <div v-if="processing" class="rendering-state" role="status">
            <span class="rendering-spinner" aria-hidden="true"></span>
            {{ copy.rendering }}
          </div>
        </div>

        <footer v-if="sourceUrl" class="preview-footer">
          <span>
            <el-icon><Picture /></el-icon>
            {{ copy.original }} {{ sourceMeta?.width }} × {{ sourceMeta?.height }}
          </span>
          <span v-if="outputSizeLabel">
            <el-icon><CircleCheck /></el-icon>
            {{ copy.output }} {{ outputSizeLabel }}
          </span>
          <span v-else class="preview-output-placeholder" aria-hidden="true">&nbsp;</span>
        </footer>
      </section>

      <aside class="settings-panel" :aria-label="copy.settingsTitle">
        <header class="panel-header settings-header">
          <div>
            <span class="panel-eyebrow">{{ copy.settingsTitle }}</span>
            <strong>{{ watermarkKind === 'text' ? copy.textKind : copy.logoKind }}</strong>
          </div>
          <el-button text :icon="RefreshLeft" @click="resetOptions">{{ copy.reset }}</el-button>
        </header>

        <div class="settings-scroll">
          <div class="setting-group preset-setting">
            <label for="watermark-preset">{{ copy.presetLabel }}</label>
            <el-select
              id="watermark-preset"
              v-model="selectedPreset"
              :aria-label="copy.presetLabel"
              @change="applyPreset"
            >
              <el-option
                v-for="presetOption in presetOptions"
                :key="presetOption.value"
                :label="presetOption.label"
                :value="presetOption.value"
              />
            </el-select>
          </div>

          <fieldset class="setting-group">
            <legend>{{ copy.kindLabel }}</legend>
            <div class="kind-switch" role="radiogroup" :aria-label="copy.kindLabel">
              <button
                type="button"
                role="radio"
                :aria-checked="watermarkKind === 'text'"
                :class="{ active: watermarkKind === 'text' }"
                @click="watermarkKind = 'text'"
              >
                <el-icon><Document /></el-icon>
                {{ copy.textKind }}
              </button>
              <button
                type="button"
                role="radio"
                :aria-checked="watermarkKind === 'logo'"
                :class="{ active: watermarkKind === 'logo' }"
                @click="watermarkKind = 'logo'"
              >
                <el-icon><Picture /></el-icon>
                {{ copy.logoKind }}
              </button>
            </div>
          </fieldset>

          <div class="content-setting-stack">
            <div
              class="setting-group content-setting"
              :class="{ 'is-inactive': watermarkKind !== 'text' }"
              :aria-hidden="watermarkKind !== 'text'"
              :inert="watermarkKind !== 'text'"
            >
              <label for="watermark-copy">{{ copy.textLabel }}</label>
              <el-input
                id="watermark-copy"
                v-model="watermarkText"
                :type="multiLineEnabled ? 'textarea' : 'text'"
                :rows="multiLineEnabled ? 3 : 1"
                maxlength="160"
                show-word-limit
                :placeholder="copy.textPlaceholder"
              />
              <div class="color-row">
                <span>{{ copy.colorLabel }}</span>
                <div>
                  <el-color-picker v-model="fontColor" :aria-label="copy.colorLabel" :disabled="gradientEnabled" />
                  <code>{{ gradientEnabled ? copy.gradientActive : fontColor.toUpperCase() }}</code>
                </div>
              </div>
            </div>

            <div
              class="setting-group content-setting"
              :class="{ 'is-inactive': watermarkKind !== 'logo' }"
              :aria-hidden="watermarkKind !== 'logo'"
              :inert="watermarkKind !== 'logo'"
            >
              <label>{{ copy.logoLabel }}</label>
              <button class="logo-picker" type="button" @click="openLogoPicker">
                <span v-if="logoUrl" class="logo-thumbnail"><img :src="logoUrl" alt="" /></span>
                <span v-else class="logo-placeholder"
                  ><el-icon><Picture /></el-icon
                ></span>
                <span>
                  <strong>{{ logoUrl ? copy.replaceLogo : copy.chooseLogo }}</strong>
                  <small>{{ copy.logoHint }}</small>
                </span>
              </button>
            </div>
          </div>

          <div v-if="watermarkKind === 'text'" class="setting-group advanced-setting">
            <button
              class="advanced-heading-button"
              type="button"
              :class="{ expanded: textStyleExpanded }"
              :aria-label="textStyleExpanded ? copy.textStyleCollapseLabel : copy.textStyleExpandLabel"
              :aria-expanded="textStyleExpanded"
              aria-controls="text-style-details"
              @click="textStyleExpanded = !textStyleExpanded"
            >
              <span class="advanced-copy">
                <strong>{{ copy.textStyleLabel }}</strong>
                <small>{{ copy.textStyleHint }}</small>
              </span>
              <el-icon><ArrowDown /></el-icon>
            </button>

            <div
              id="text-style-details"
              class="advanced-details"
              :class="{ expanded: textStyleExpanded }"
              :aria-hidden="!textStyleExpanded"
              :inert="!textStyleExpanded"
            >
              <div class="advanced-details-inner">
                <div class="compact-fields">
                  <label class="compact-field" for="font-family">
                    <span>{{ copy.fontFamilyLabel }}</span>
                    <el-select id="font-family" v-model="fontFamily" :aria-label="copy.fontFamilyLabel">
                      <el-option
                        v-for="fontOption in fontFamilyOptions"
                        :key="fontOption.value"
                        :label="fontOption.label"
                        :value="fontOption.value"
                      />
                    </el-select>
                  </label>
                  <label class="compact-field" for="font-weight">
                    <span>{{ copy.fontWeightLabel }}</span>
                    <el-select id="font-weight" v-model="fontWeight" :aria-label="copy.fontWeightLabel">
                      <el-option
                        v-for="weightOption in fontWeightOptions"
                        :key="weightOption.value"
                        :label="weightOption.label"
                        :value="weightOption.value"
                      />
                    </el-select>
                  </label>
                </div>

                <div class="toggle-row">
                  <label for="font-italic">{{ copy.italicLabel }}</label>
                  <el-switch id="font-italic" v-model="fontItalic" :aria-label="copy.italicLabel" />
                </div>

                <div class="field-stack">
                  <span class="field-label">{{ copy.textRenderingLabel }}</span>
                  <div class="option-switch" role="radiogroup" :aria-label="copy.textRenderingLabel">
                    <button
                      type="button"
                      role="radio"
                      :aria-checked="textRendering === 'fill'"
                      :class="{ active: textRendering === 'fill' }"
                      @click="textRendering = 'fill'"
                    >
                      {{ copy.fillRendering }}
                    </button>
                    <button
                      type="button"
                      role="radio"
                      :aria-checked="textRendering === 'stroke'"
                      :class="{ active: textRendering === 'stroke' }"
                      @click="textRendering = 'stroke'"
                    >
                      {{ copy.strokeRendering }}
                    </button>
                  </div>
                </div>

                <div v-if="textRendering === 'stroke'" class="slider-control">
                  <div class="control-label">
                    <label for="stroke-width">{{ copy.strokeWidthLabel }}</label>
                    <output>{{ strokeWidth }}px</output>
                  </div>
                  <el-slider
                    id="stroke-width"
                    v-model="strokeWidth"
                    :aria-label="copy.strokeWidthLabel"
                    :min="1"
                    :max="12"
                    :show-tooltip="false"
                  />
                </div>

                <div class="slider-control">
                  <div class="control-label">
                    <label for="letter-spacing">{{ copy.letterSpacingLabel }}</label>
                    <output>{{ letterSpacing }}px</output>
                  </div>
                  <el-slider
                    id="letter-spacing"
                    v-model="letterSpacing"
                    :aria-label="copy.letterSpacingLabel"
                    :min="-4"
                    :max="24"
                    :show-tooltip="false"
                  />
                </div>

                <div class="toggle-row toggle-row-with-copy">
                  <label for="multi-line-text">
                    <strong>{{ copy.multiLineLabel }}</strong>
                    <small>{{ copy.multiLineHint }}</small>
                  </label>
                  <el-switch id="multi-line-text" v-model="multiLineEnabled" :aria-label="copy.multiLineLabel" />
                </div>

                <div v-if="multiLineEnabled" class="compact-sliders">
                  <div class="slider-control">
                    <div class="control-label">
                      <label for="text-line-height">{{ copy.lineHeightLabel }}</label>
                      <output>{{ textLineHeight.toFixed(2) }}</output>
                    </div>
                    <el-slider
                      id="text-line-height"
                      v-model="textLineHeight"
                      :aria-label="copy.lineHeightLabel"
                      :min="1"
                      :max="2"
                      :step="0.05"
                      :show-tooltip="false"
                    />
                  </div>
                  <div class="slider-control">
                    <div class="control-label">
                      <label for="text-max-width">{{ copy.textMaxWidthLabel }}</label>
                      <output>{{ textMaxWidth }}%</output>
                    </div>
                    <el-slider
                      id="text-max-width"
                      v-model="textMaxWidth"
                      :aria-label="copy.textMaxWidthLabel"
                      :min="20"
                      :max="90"
                      :show-tooltip="false"
                    />
                  </div>
                </div>

                <div class="gradient-setting">
                  <div class="toggle-row toggle-row-with-copy">
                    <label for="text-gradient">
                      <strong>{{ copy.gradientLabel }}</strong>
                      <small>{{ copy.gradientHint }}</small>
                    </label>
                    <el-switch id="text-gradient" v-model="gradientEnabled" :aria-label="copy.gradientToggleLabel" />
                  </div>

                  <div v-if="gradientEnabled" class="gradient-details">
                    <label class="compact-field" for="gradient-type">
                      <span>{{ copy.gradientTypeLabel }}</span>
                      <el-select id="gradient-type" v-model="gradientType" :aria-label="copy.gradientTypeLabel">
                        <el-option :label="copy.linearGradient" value="linear" />
                        <el-option :label="copy.radialGradient" value="radial" />
                        <el-option :label="copy.conicGradient" value="conic" />
                      </el-select>
                    </label>
                    <div class="compact-fields color-fields">
                      <div class="compact-field">
                        <span>{{ copy.gradientStartLabel }}</span>
                        <el-color-picker v-model="gradientStartColor" :aria-label="copy.gradientStartLabel" />
                      </div>
                      <div class="compact-field">
                        <span>{{ copy.gradientEndLabel }}</span>
                        <el-color-picker v-model="gradientEndColor" :aria-label="copy.gradientEndLabel" />
                      </div>
                    </div>
                    <div class="slider-control">
                      <div class="control-label">
                        <label for="gradient-angle">{{ copy.gradientAngleLabel }}</label>
                        <output>{{ gradientAngle }}°</output>
                      </div>
                      <el-slider
                        id="gradient-angle"
                        v-model="gradientAngle"
                        :aria-label="copy.gradientAngleLabel"
                        :min="0"
                        :max="360"
                        :show-tooltip="false"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="watermarkKind === 'logo'" class="setting-group advanced-setting">
            <button
              class="advanced-heading-button"
              type="button"
              :class="{ expanded: imageFilterExpanded }"
              :aria-label="imageFilterExpanded ? copy.imageFilterCollapseLabel : copy.imageFilterExpandLabel"
              :aria-expanded="imageFilterExpanded"
              aria-controls="image-filter-details"
              @click="imageFilterExpanded = !imageFilterExpanded"
            >
              <span class="advanced-copy">
                <strong>{{ copy.imageFilterLabel }}</strong>
                <small>{{ copy.imageFilterHint }}</small>
              </span>
              <el-icon><ArrowDown /></el-icon>
            </button>

            <div
              id="image-filter-details"
              class="advanced-details"
              :class="{ expanded: imageFilterExpanded }"
              :aria-hidden="!imageFilterExpanded"
              :inert="!imageFilterExpanded"
            >
              <div class="advanced-details-inner">
                <el-button text size="small" :icon="RefreshLeft" @click="resetImageFilters">
                  {{ copy.resetFilters }}
                </el-button>
                <div class="slider-control">
                  <div class="control-label">
                    <label for="image-brightness">{{ copy.brightnessLabel }}</label>
                    <output>{{ imageBrightness }}%</output>
                  </div>
                  <el-slider
                    id="image-brightness"
                    v-model="imageBrightness"
                    :aria-label="copy.brightnessLabel"
                    :min="0"
                    :max="200"
                    :show-tooltip="false"
                  />
                </div>
                <div class="slider-control">
                  <div class="control-label">
                    <label for="image-contrast">{{ copy.contrastLabel }}</label>
                    <output>{{ imageContrast }}%</output>
                  </div>
                  <el-slider
                    id="image-contrast"
                    v-model="imageContrast"
                    :aria-label="copy.contrastLabel"
                    :min="0"
                    :max="200"
                    :show-tooltip="false"
                  />
                </div>
                <div class="slider-control">
                  <div class="control-label">
                    <label for="image-saturation">{{ copy.saturationLabel }}</label>
                    <output>{{ imageSaturation }}%</output>
                  </div>
                  <el-slider
                    id="image-saturation"
                    v-model="imageSaturation"
                    :aria-label="copy.saturationLabel"
                    :min="0"
                    :max="200"
                    :show-tooltip="false"
                  />
                </div>
                <div class="slider-control">
                  <div class="control-label">
                    <label for="image-grayscale">{{ copy.grayscaleLabel }}</label>
                    <output>{{ imageGrayscale }}%</output>
                  </div>
                  <el-slider
                    id="image-grayscale"
                    v-model="imageGrayscale"
                    :aria-label="copy.grayscaleLabel"
                    :min="0"
                    :max="100"
                    :show-tooltip="false"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="setting-group slider-stack">
            <div class="slider-control">
              <div class="control-label">
                <label for="watermark-size">{{ copy.sizeLabel }}</label>
                <output>{{ sizeValue }}{{ sizeRange.suffix }}</output>
              </div>
              <el-slider
                id="watermark-size"
                v-model="sizeValue"
                :aria-label="copy.sizeLabel"
                :min="sizeRange.min"
                :max="sizeRange.max"
                :show-tooltip="false"
              />
            </div>
            <div class="slider-control">
              <div class="control-label">
                <label for="watermark-opacity">{{ copy.opacityLabel }}</label>
                <output>{{ opacity }}%</output>
              </div>
              <el-slider
                id="watermark-opacity"
                v-model="opacity"
                :aria-label="copy.opacityLabel"
                :min="5"
                :max="100"
                :show-tooltip="false"
              />
            </div>
            <div class="slider-control">
              <div class="control-label">
                <label for="watermark-rotation">{{ copy.rotationLabel }}</label>
                <output>{{ rotation }}°</output>
              </div>
              <el-slider
                id="watermark-rotation"
                v-model="rotation"
                :aria-label="copy.rotationLabel"
                :min="-180"
                :max="180"
                :step="1"
                :show-tooltip="false"
              />
            </div>
          </div>

          <div class="setting-group shadow-setting">
            <div class="shadow-heading">
              <label class="shadow-copy" for="watermark-shadow">
                <strong>{{ copy.shadowLabel }}</strong>
                <small v-if="shadowEnabled && !shadowExpanded" class="shadow-summary">
                  {{ shadowColor.toUpperCase() }} · {{ shadowBlur }}px · {{ shadowOffsetX }}, {{ shadowOffsetY }}px
                </small>
                <small v-else>{{ copy.shadowHint }}</small>
              </label>
              <div class="shadow-actions">
                <el-switch
                  id="watermark-shadow"
                  v-model="shadowEnabled"
                  :aria-label="copy.shadowToggleLabel"
                  @change="handleShadowToggle"
                />
                <button
                  v-if="shadowEnabled"
                  class="shadow-expand"
                  type="button"
                  :class="{ expanded: shadowExpanded }"
                  :aria-label="shadowExpanded ? copy.shadowCollapseLabel : copy.shadowExpandLabel"
                  :aria-expanded="shadowExpanded"
                  aria-controls="shadow-settings-details"
                  @click="shadowExpanded = !shadowExpanded"
                >
                  <el-icon><ArrowDown /></el-icon>
                </button>
              </div>
            </div>

            <div
              id="shadow-settings-details"
              class="shadow-details"
              :class="{ expanded: shadowEnabled && shadowExpanded }"
              :aria-hidden="!(shadowEnabled && shadowExpanded)"
              :inert="!(shadowEnabled && shadowExpanded)"
            >
              <div class="shadow-details-inner">
                <div class="color-row">
                  <span>{{ copy.shadowColorLabel }}</span>
                  <div>
                    <el-color-picker
                      v-model="shadowColor"
                      show-alpha
                      color-format="hex"
                      :aria-label="copy.shadowColorLabel"
                    />
                    <code>{{ shadowColor.toUpperCase() }}</code>
                  </div>
                </div>

                <div class="slider-control">
                  <div class="control-label">
                    <label for="shadow-blur">{{ copy.shadowBlurLabel }}</label>
                    <output>{{ shadowBlur }}px</output>
                  </div>
                  <el-slider
                    id="shadow-blur"
                    v-model="shadowBlur"
                    :aria-label="copy.shadowBlurLabel"
                    :min="0"
                    :max="40"
                    :show-tooltip="false"
                  />
                </div>

                <div class="shadow-offsets">
                  <div class="slider-control">
                    <div class="control-label">
                      <label for="shadow-offset-x">{{ copy.shadowOffsetXLabel }}</label>
                      <output>{{ shadowOffsetX }}px</output>
                    </div>
                    <el-slider
                      id="shadow-offset-x"
                      v-model="shadowOffsetX"
                      :aria-label="copy.shadowOffsetXLabel"
                      :min="-40"
                      :max="40"
                      :show-tooltip="false"
                    />
                  </div>
                  <div class="slider-control">
                    <div class="control-label">
                      <label for="shadow-offset-y">{{ copy.shadowOffsetYLabel }}</label>
                      <output>{{ shadowOffsetY }}px</output>
                    </div>
                    <el-slider
                      id="shadow-offset-y"
                      v-model="shadowOffsetY"
                      :aria-label="copy.shadowOffsetYLabel"
                      :min="-40"
                      :max="40"
                      :show-tooltip="false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <fieldset class="setting-group">
            <legend>{{ copy.positionLabel }}</legend>
            <div class="position-grid">
              <button
                v-for="item in positions"
                :key="item.value"
                type="button"
                :class="{ active: position === item.value, repeat: item.value === 'repeat' }"
                :aria-label="item.label"
                :aria-pressed="position === item.value"
                :title="item.label"
                @click="position = item.value"
              >
                <el-icon><component :is="item.icon" /></el-icon>
                <span v-if="item.value === 'repeat'">{{ item.label }}</span>
              </button>
            </div>

            <div v-if="position !== 'repeat'" class="precise-position">
              <button
                class="advanced-heading-button compact"
                type="button"
                :class="{ expanded: precisePositionExpanded }"
                :aria-label="
                  precisePositionExpanded ? copy.precisePositionCollapseLabel : copy.precisePositionExpandLabel
                "
                :aria-expanded="precisePositionExpanded"
                aria-controls="precise-position-details"
                @click="precisePositionExpanded = !precisePositionExpanded"
              >
                <span class="advanced-copy">
                  <strong>{{ copy.precisePositionLabel }}</strong>
                  <small>{{ copy.precisePositionHint }}</small>
                </span>
                <el-icon><ArrowDown /></el-icon>
              </button>
              <div
                id="precise-position-details"
                class="advanced-details"
                :class="{ expanded: precisePositionExpanded }"
                :aria-hidden="!precisePositionExpanded"
                :inert="!precisePositionExpanded"
              >
                <div class="advanced-details-inner compact-number-fields">
                  <label class="compact-field" for="position-offset-x">
                    <span>{{ copy.positionOffsetXLabel }}</span>
                    <el-input-number
                      id="position-offset-x"
                      v-model="positionOffsetX"
                      :aria-label="copy.positionOffsetXLabel"
                      :min="-500"
                      :max="500"
                      controls-position="right"
                    />
                  </label>
                  <label class="compact-field" for="position-offset-y">
                    <span>{{ copy.positionOffsetYLabel }}</span>
                    <el-input-number
                      id="position-offset-y"
                      v-model="positionOffsetY"
                      :aria-label="copy.positionOffsetYLabel"
                      :min="-500"
                      :max="500"
                      controls-position="right"
                    />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>

          <div v-if="position === 'repeat'" class="setting-group repeat-spacing">
            <div class="field-stack">
              <span class="field-label">{{ copy.repeatPatternLabel }}</span>
              <div class="option-switch" role="radiogroup" :aria-label="copy.repeatPatternLabel">
                <button
                  type="button"
                  role="radio"
                  :aria-checked="repeatPattern === 'grid'"
                  :class="{ active: repeatPattern === 'grid' }"
                  @click="repeatPattern = 'grid'"
                >
                  {{ copy.gridPattern }}
                </button>
                <button
                  type="button"
                  role="radio"
                  :aria-checked="repeatPattern === 'diagonal'"
                  :class="{ active: repeatPattern === 'diagonal' }"
                  @click="repeatPattern = 'diagonal'"
                >
                  {{ copy.diagonalPattern }}
                </button>
              </div>
            </div>
            <div class="compact-number-fields">
              <label class="compact-field" for="repeat-spacing-x">
                <span>{{ copy.horizontalSpacingLabel }}</span>
                <el-input-number
                  id="repeat-spacing-x"
                  v-model="repeatSpacingX"
                  :aria-label="copy.horizontalSpacingLabel"
                  :min="0"
                  :max="400"
                  controls-position="right"
                />
              </label>
              <label class="compact-field" for="repeat-spacing-y">
                <span>{{ copy.verticalSpacingLabel }}</span>
                <el-input-number
                  id="repeat-spacing-y"
                  v-model="repeatSpacingY"
                  :aria-label="copy.verticalSpacingLabel"
                  :min="0"
                  :max="400"
                  controls-position="right"
                />
              </label>
            </div>
          </div>
        </div>

        <div class="export-area">
          <div class="export-status" aria-live="polite">
            <p v-if="errorMessage || requirementMessage" class="form-message" role="alert">
              {{ errorMessage || requirementMessage }}
            </p>
            <p v-else-if="processing" class="processing-message">{{ copy.rendering }}</p>
            <p v-else-if="canDownload" class="ready-message">
              <el-icon><CircleCheck /></el-icon>
              {{ copy.ready }}
            </p>
            <p v-else class="status-placeholder" aria-hidden="true">&nbsp;</p>
          </div>
          <el-button
            class="download-button"
            type="primary"
            size="large"
            :icon="Download"
            :loading="processing"
            :disabled="!canDownload"
            @click="downloadResult"
          >
            {{ copy.download }}
          </el-button>
          <small>{{ copy.downloadHint }}</small>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.image-watermark-tool {
  --tool-space-xs: 4px;
  --tool-space-sm: 8px;
  --tool-space-md: 12px;
  --tool-space-lg: 16px;
  --tool-space-xl: 24px;
  --tool-space-2xl: 32px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  color: var(--vp-c-text-1);
  margin-top: 24px;
  overflow: hidden;
  width: 100%;
}

.image-watermark-tool.is-dragging {
  border-color: var(--vp-c-brand-1);
}

.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.privacy-bar {
  align-items: center;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  display: flex;
  font-size: 13px;
  gap: var(--tool-space-md);
  min-height: 44px;
  padding: var(--tool-space-sm) var(--tool-space-lg);
}

.privacy-badge {
  align-items: center;
  color: var(--vp-c-brand-1);
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 650;
  gap: 6px;
}

.workspace {
  display: grid;
  grid-template-columns: minmax(0, 1.65fr) minmax(320px, 0.85fr);
  min-height: 620px;
}

.preview-panel,
.settings-panel {
  min-width: 0;
}

.preview-panel {
  background: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
}

.settings-panel {
  background: var(--vp-c-bg);
  border-left: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
}

.panel-header {
  align-items: center;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  gap: var(--tool-space-lg);
  justify-content: space-between;
  min-height: 72px;
  padding: var(--tool-space-md) var(--tool-space-lg);
}

.panel-header > div:first-child {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.panel-eyebrow {
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.file-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-meta {
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.source-actions {
  display: flex;
  flex: 0 0 auto;
  gap: var(--tool-space-sm);
}

.upload-zone {
  align-items: center;
  align-self: center;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin: clamp(24px, 6vw, 64px);
  min-height: 360px;
  padding: var(--tool-space-2xl);
  text-align: center;
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    transform 160ms ease;
  width: calc(100% - clamp(48px, 12vw, 128px));
}

.upload-zone:hover,
.upload-zone:focus-visible,
.is-dragging .upload-zone {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
  outline: none;
  transform: translateY(-2px);
}

.upload-zone strong {
  color: var(--vp-c-text-1);
  font-size: 18px;
  margin-top: var(--tool-space-lg);
}

.upload-zone > span:not(.upload-icon) {
  font-size: 14px;
  margin-top: var(--tool-space-sm);
}

.upload-zone small {
  color: var(--vp-c-text-3);
  margin-top: var(--tool-space-md);
}

.upload-icon {
  align-items: center;
  background: var(--vp-c-brand-soft);
  border-radius: 50%;
  color: var(--vp-c-brand-1);
  display: inline-flex;
  font-size: 30px;
  height: 64px;
  justify-content: center;
  width: 64px;
}

.preview-stage {
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  min-height: 460px;
  overflow: hidden;
  padding: clamp(16px, 3vw, 32px);
  position: relative;
}

.preview-stage img {
  box-shadow: 0 10px 30px rgb(36 46 66 / 14%);
  display: block;
  max-height: 520px;
  max-width: 100%;
  object-fit: contain;
}

.dark .preview-stage img {
  box-shadow: 0 12px 32px rgb(0 0 0 / 32%);
}

.rendering-state {
  align-items: center;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  box-shadow: var(--vp-shadow-2);
  color: var(--vp-c-text-2);
  display: flex;
  font-size: 13px;
  gap: var(--tool-space-sm);
  left: 50%;
  padding: 8px 12px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.rendering-spinner {
  animation: spin 700ms linear infinite;
  border: 2px solid var(--vp-c-divider);
  border-radius: 50%;
  border-top-color: var(--vp-c-brand-1);
  height: 14px;
  width: 14px;
}

.preview-footer {
  align-items: center;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  gap: var(--tool-space-lg);
  min-height: 44px;
  padding: var(--tool-space-sm) var(--tool-space-lg);
}

.preview-footer span,
.ready-message {
  align-items: center;
  display: inline-flex;
  gap: 6px;
}

.preview-output-placeholder {
  min-height: 18px;
  visibility: hidden;
}

.settings-header strong {
  font-size: 17px;
}

.settings-scroll {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0;
}

.settings-scroll > :last-child {
  border-bottom: 0;
}

.setting-group {
  border: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: var(--tool-space-md);
  margin: 0;
  min-width: 0;
  padding: var(--tool-space-lg);
}

.setting-group > label,
.setting-group > legend,
.color-row > span,
.control-label label {
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 650;
}

.setting-group > legend {
  padding: 0;
}

.content-setting-stack {
  border-bottom: 1px solid var(--vp-c-divider);
  display: grid;
}

.content-setting {
  border-bottom: 0;
  grid-area: 1 / 1;
}

.content-setting.is-inactive {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

.kind-switch {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  display: grid;
  gap: var(--tool-space-xs);
  grid-template-columns: 1fr 1fr;
  padding: var(--tool-space-xs);
}

.kind-switch button {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  gap: var(--tool-space-sm);
  justify-content: center;
  min-height: 40px;
}

.kind-switch button:hover,
.kind-switch button:focus-visible {
  color: var(--vp-c-brand-1);
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.kind-switch button.active {
  background: var(--vp-c-bg);
  box-shadow: 0 1px 3px rgb(36 46 66 / 10%);
  color: var(--vp-c-brand-1);
}

.color-row,
.control-label {
  align-items: center;
  display: flex;
  gap: var(--tool-space-lg);
  justify-content: space-between;
}

.color-row > div {
  align-items: center;
  display: flex;
  gap: var(--tool-space-sm);
}

.color-row code {
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 12px;
  padding: 0;
}

.logo-picker {
  align-items: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  display: grid;
  font: inherit;
  gap: var(--tool-space-md);
  grid-template-columns: 52px 1fr;
  min-height: 68px;
  padding: var(--tool-space-sm);
  text-align: left;
  width: 100%;
}

.logo-picker:hover,
.logo-picker:focus-visible {
  border-color: var(--vp-c-brand-1);
  outline: none;
}

.logo-picker > span:last-child {
  display: grid;
  gap: var(--tool-space-xs);
}

.logo-picker small {
  color: var(--vp-c-text-2);
}

.logo-thumbnail,
.logo-placeholder {
  align-items: center;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  display: flex;
  height: 52px;
  justify-content: center;
  overflow: hidden;
  width: 52px;
}

.logo-thumbnail img {
  display: block;
  max-height: 44px;
  max-width: 44px;
  object-fit: contain;
}

.logo-placeholder {
  color: var(--vp-c-text-3);
  font-size: 22px;
}

.slider-stack {
  gap: var(--tool-space-lg);
}

.slider-control {
  display: grid;
  gap: var(--tool-space-sm);
}

.preset-setting .el-select,
.compact-field .el-select,
.compact-field .el-input-number {
  width: 100%;
}

.advanced-setting {
  gap: 0;
}

.advanced-heading-button {
  align-items: center;
  background: transparent;
  border: 0;
  color: var(--vp-c-text-1);
  cursor: pointer;
  display: flex;
  font: inherit;
  gap: var(--tool-space-lg);
  justify-content: space-between;
  padding: 0;
  text-align: left;
  width: 100%;
}

.advanced-heading-button:hover,
.advanced-heading-button:focus-visible {
  color: var(--vp-c-brand-1);
  outline: none;
}

.advanced-heading-button > .el-icon {
  flex: 0 0 auto;
  font-size: 16px;
  transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
}

.advanced-heading-button.expanded > .el-icon {
  transform: rotate(180deg);
}

.advanced-copy {
  display: grid;
  gap: var(--tool-space-xs);
}

.advanced-copy strong,
.field-label,
.compact-field > span,
.toggle-row > label {
  font-size: 13px;
  font-weight: 650;
}

.advanced-copy small,
.toggle-row-with-copy small {
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.45;
}

.advanced-details {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 180ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 140ms ease;
}

.advanced-details.expanded {
  grid-template-rows: 1fr;
  opacity: 1;
}

.advanced-details-inner {
  display: grid;
  gap: var(--tool-space-lg);
  min-height: 0;
  overflow: hidden;
}

.advanced-details.expanded > .advanced-details-inner {
  padding-top: var(--tool-space-lg);
}

.compact-fields,
.compact-number-fields {
  display: grid;
  gap: var(--tool-space-md);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.compact-field,
.field-stack {
  display: grid;
  gap: var(--tool-space-sm);
  min-width: 0;
}

.toggle-row {
  align-items: center;
  display: flex;
  gap: var(--tool-space-lg);
  justify-content: space-between;
}

.toggle-row-with-copy > label {
  display: grid;
  gap: var(--tool-space-xs);
}

.option-switch {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  display: grid;
  gap: var(--tool-space-xs);
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: var(--tool-space-xs);
}

.option-switch button {
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  min-height: 36px;
}

.option-switch button:hover,
.option-switch button:focus-visible {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  outline: none;
}

.option-switch button.active {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
  color: var(--vp-c-brand-1);
}

.compact-sliders,
.gradient-details {
  display: grid;
  gap: var(--tool-space-lg);
}

.gradient-setting {
  border-top: 1px solid var(--vp-c-divider);
  display: grid;
  gap: var(--tool-space-lg);
  padding-top: var(--tool-space-lg);
}

.color-fields .el-color-picker {
  justify-self: start;
}

.precise-position {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: var(--tool-space-md);
}

.advanced-heading-button.compact .advanced-copy small {
  font-weight: 400;
}

.shadow-setting {
  gap: 0;
}

.shadow-heading {
  align-items: center;
  display: flex;
  gap: var(--tool-space-lg);
  justify-content: space-between;
}

.shadow-copy {
  cursor: pointer;
  display: grid;
  gap: var(--tool-space-xs);
}

.shadow-copy strong {
  font-size: 13px;
}

.shadow-copy small {
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.45;
}

.shadow-copy .shadow-summary {
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.shadow-actions {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  gap: var(--tool-space-xs);
}

.shadow-expand {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  height: 40px;
  justify-content: center;
  padding: 0;
  width: 40px;
}

.shadow-expand:hover,
.shadow-expand:focus-visible {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  outline: none;
}

.shadow-expand .el-icon {
  transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
}

.shadow-expand.expanded .el-icon {
  transform: rotate(180deg);
}

.shadow-details {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 180ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 140ms ease;
}

.shadow-details.expanded {
  grid-template-rows: 1fr;
  opacity: 1;
}

.shadow-details-inner {
  display: grid;
  gap: var(--tool-space-lg);
  min-height: 0;
  overflow: hidden;
}

.shadow-details.expanded .shadow-details-inner {
  padding-top: var(--tool-space-lg);
}

.shadow-offsets {
  display: grid;
  gap: var(--tool-space-md);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.control-label output {
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}

.position-grid {
  display: grid;
  gap: var(--tool-space-sm);
  grid-template-columns: repeat(3, minmax(44px, 1fr));
}

.position-grid button {
  align-items: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid transparent;
  border-radius: 7px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  font: inherit;
  font-size: 16px;
  gap: var(--tool-space-sm);
  justify-content: center;
  min-height: 44px;
}

.position-grid button:hover,
.position-grid button:focus-visible {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  outline: none;
}

.position-grid button.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.position-grid .repeat {
  font-size: 13px;
  grid-column: 1 / -1;
}

.repeat-spacing {
  animation: reveal 180ms cubic-bezier(0.22, 1, 0.36, 1);
  gap: var(--tool-space-lg);
}

.export-area {
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  display: grid;
  flex: 0 0 auto;
  gap: var(--tool-space-sm);
  padding: var(--tool-space-lg);
}

.export-status {
  min-height: 24px;
}

.export-status p {
  align-items: center;
  display: flex;
  font-size: 12px;
  line-height: 1.45;
  min-height: 24px;
  margin: 0;
}

.export-area > small {
  color: var(--vp-c-text-3);
  text-align: center;
}

.form-message {
  color: var(--vp-c-danger-1);
}

.processing-message {
  color: var(--vp-c-text-2);
}

.status-placeholder {
  visibility: hidden;
}

.ready-message {
  color: var(--vp-c-brand-1);
}

.download-button {
  min-height: 44px;
  width: 100%;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .upload-zone,
  .repeat-spacing,
  .shadow-details,
  .advanced-details,
  .advanced-heading-button > .el-icon,
  .shadow-expand .el-icon {
    animation: none;
    transition: none;
  }
}

@media (min-width: 961px) {
  .workspace {
    height: clamp(640px, calc(100vh - 160px), 760px);
    min-height: 640px;
  }

  .panel-header {
    height: 76px;
    min-height: 76px;
  }

  .preview-header > div:first-child {
    column-gap: var(--tool-space-sm);
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .preview-header .panel-eyebrow {
    grid-column: 1 / -1;
  }

  .preview-header .file-meta {
    align-self: center;
    white-space: nowrap;
  }

  .preview-panel,
  .settings-panel {
    min-height: 0;
    overflow: hidden;
  }

  .settings-scroll {
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-color: var(--vp-c-divider) transparent;
    scrollbar-gutter: stable;
    scrollbar-width: thin;
  }

  .settings-scroll::-webkit-scrollbar {
    width: 8px;
  }

  .settings-scroll::-webkit-scrollbar-thumb {
    background: var(--vp-c-divider);
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 999px;
  }

  .settings-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
}

@media (max-width: 960px) {
  .workspace {
    grid-template-columns: 1fr;
  }

  .settings-panel {
    border-left: 0;
    border-top: 1px solid var(--vp-c-divider);
  }

  .preview-stage {
    min-height: 380px;
  }
}

@media (max-width: 640px) {
  .privacy-bar {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--tool-space-xs);
  }

  .panel-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .preview-header {
    min-height: 96px;
  }

  .source-actions {
    width: 100%;
  }

  .source-actions .el-button:first-child {
    flex: 1;
  }

  .upload-zone {
    margin: var(--tool-space-lg);
    min-height: 300px;
    padding: var(--tool-space-xl) var(--tool-space-lg);
    width: calc(100% - 32px);
  }

  .preview-stage {
    min-height: 280px;
    padding: var(--tool-space-lg);
  }

  .preview-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--tool-space-xs);
  }

  .shadow-offsets {
    grid-template-columns: 1fr;
  }

  .compact-fields,
  .compact-number-fields {
    grid-template-columns: 1fr;
  }
}
</style>
