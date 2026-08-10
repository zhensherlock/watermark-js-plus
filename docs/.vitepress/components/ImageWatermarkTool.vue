<script setup lang="ts">
import {
  Aim,
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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { ImageWatermark } from '../../../src'
import type { ImageWatermarkOptions } from '../../../src'

type Locale = 'en' | 'zh'
type WatermarkKind = 'text' | 'logo'
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
    sizeLabel: 'Size',
    opacityLabel: 'Opacity',
    rotationLabel: 'Rotation',
    positionLabel: 'Position',
    spacingLabel: 'Repeat spacing',
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
    sizeLabel: '大小',
    opacityLabel: '透明度',
    rotationLabel: '旋转角度',
    positionLabel: '水印位置',
    spacingLabel: '重复间距',
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
const watermarkKind = ref<WatermarkKind>('text')
const watermarkText = ref('watermark-js-plus')
const fontSize = ref(48)
const logoScale = ref(18)
const fontColor = ref('#ffffff')
const opacity = ref(62)
const rotation = ref(0)
const position = ref<WatermarkPosition>('bottom-end')
const repeatSpacing = ref(72)
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

function resetOptions() {
  watermarkKind.value = 'text'
  watermarkText.value = 'watermark-js-plus'
  fontSize.value = 48
  logoScale.value = 18
  fontColor.value = '#ffffff'
  opacity.value = 62
  rotation.value = 0
  position.value = 'bottom-end'
  repeatSpacing.value = 72
  errorMessage.value = ''
}

function getWatermarkMetrics(pixelWidth: number) {
  const markWidth =
    watermarkKind.value === 'text'
      ? Math.min(
          pixelWidth * 0.82,
          Math.max(fontSize.value * 2.2, watermarkText.value.trim().length * fontSize.value * 0.58),
        )
      : pixelWidth * (logoScale.value / 100)
  const markHeight =
    watermarkKind.value === 'text' ? fontSize.value * 1.25 : markWidth / Math.max(0.1, logoAspectRatio.value)
  const radians = rotation.value * (Math.PI / 180)
  return {
    markWidth,
    markHeight,
    boundsWidth: Math.abs(Math.cos(radians)) * markWidth + Math.abs(Math.sin(radians)) * markHeight,
    boundsHeight: Math.abs(Math.sin(radians)) * markWidth + Math.abs(Math.cos(radians)) * markHeight,
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
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center' as const,
    textBaseline: 'middle' as const,
    content: watermarkText.value.trim(),
    contentType: watermarkKind.value === 'text' ? ('text' as const) : ('image' as const),
    image: watermarkKind.value === 'logo' ? logoUrl.value : undefined,
    imageWidth: watermarkKind.value === 'logo' ? metrics.markWidth / density : 0,
    imageHeight: 0,
    crossOrigin: false,
  }

  if (position.value === 'repeat') {
    const tileWidth = Math.max(80, metrics.boundsWidth + repeatSpacing.value)
    const tileHeight = Math.max(64, metrics.boundsHeight + repeatSpacing.value * 0.72)
    return {
      ...base,
      width: Math.ceil(tileWidth / density),
      height: Math.ceil(tileHeight / density),
      textRowMaxWidth: Math.ceil(metrics.markWidth / density),
      gridLayoutOptions: {
        cols: Math.ceil(pixelWidth / tileWidth) + 1,
        rows: Math.ceil(pixelHeight / tileHeight) + 1,
        gap: [0, 0],
      },
    }
  }

  const [translateX, translateY] = getPosition(pixelWidth, pixelHeight, metrics.boundsWidth, metrics.boundsHeight)
  return {
    ...base,
    width: image.width,
    height: image.height,
    translateX: translateX / density,
    translateY: translateY / density,
    textRowMaxWidth: Math.ceil(pixelWidth * 0.82) / density,
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

watch(
  [
    sourceUrl,
    logoUrl,
    watermarkKind,
    watermarkText,
    fontSize,
    logoScale,
    fontColor,
    opacity,
    rotation,
    position,
    repeatSpacing,
  ],
  scheduleRender,
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
                maxlength="80"
                show-word-limit
                :placeholder="copy.textPlaceholder"
              />
              <div class="color-row">
                <span>{{ copy.colorLabel }}</span>
                <div>
                  <el-color-picker v-model="fontColor" :aria-label="copy.colorLabel" />
                  <code>{{ fontColor.toUpperCase() }}</code>
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

          <div class="setting-group slider-stack">
            <div class="slider-control">
              <div class="control-label">
                <label for="watermark-size">{{ copy.sizeLabel }}</label>
                <output>{{ sizeValue }}{{ sizeRange.suffix }}</output>
              </div>
              <el-slider
                id="watermark-size"
                v-model="sizeValue"
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
              <el-slider id="watermark-opacity" v-model="opacity" :min="5" :max="100" :show-tooltip="false" />
            </div>
            <div class="slider-control">
              <div class="control-label">
                <label for="watermark-rotation">{{ copy.rotationLabel }}</label>
                <output>{{ rotation }}°</output>
              </div>
              <el-slider
                id="watermark-rotation"
                v-model="rotation"
                :min="-180"
                :max="180"
                :step="1"
                :show-tooltip="false"
              />
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
          </fieldset>

          <div v-if="position === 'repeat'" class="setting-group slider-control repeat-spacing">
            <div class="control-label">
              <label for="repeat-spacing">{{ copy.spacingLabel }}</label>
              <output>{{ repeatSpacing }}px</output>
            </div>
            <el-slider id="repeat-spacing" v-model="repeatSpacing" :min="16" :max="200" :show-tooltip="false" />
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
}

.export-area {
  background: var(--vp-c-bg);
  display: grid;
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
  .repeat-spacing {
    animation: none;
    transition: none;
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
}
</style>
