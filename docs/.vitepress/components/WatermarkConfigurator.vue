<script setup lang="ts">
import { Check, CopyDocument, Hide, RefreshLeft, View } from '@element-plus/icons-vue'
import cloneDeep from 'lodash/cloneDeep'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { Watermark } from '../../../src'
import type { WatermarkOptions } from '../../../src'
import WatermarkOptionsForm from './WatermarkOptionsForm.vue'

const { lang } = useData()
const t = (en: string, zh: string) => (lang.value.startsWith('zh') ? zh : en)

const initialOptions: Partial<WatermarkOptions> = {
  width: 200,
  height: 200,
  rotate: 45,
  contentType: 'text',
  content: 'watermark-js-plus',
}

const copy = computed(() => ({
  live: t('Live preview', '实时预览'),
  workspace: t('Preview workspace', '预览工作区'),
  previewTab: t('Preview', '预览'),
  codeTab: t('Code', '代码'),
  previewHint: t('Changes are rendered here automatically.', '参数变化会自动呈现在这里。'),
  previewOn: t('Preview on', '预览已开启'),
  previewOff: t('Preview off', '预览已关闭'),
  showPreview: t('Show watermark preview', '显示水印预览'),
  hidePreview: t('Hide watermark preview', '隐藏水印预览'),
  settings: t('Configuration', '参数配置'),
  settingsHint: t('Start with content, then refine only what you need.', '先设置内容，再按需调整细节。'),
  reset: t('Reset', '重置'),
  codeHint: t('Ready to paste into your project.', '可直接复制到项目中使用。'),
  copyCode: t('Copy code', '复制代码'),
  copied: t('Copied', '已复制'),
  local: t('Rendered locally in your browser', '仅在当前浏览器本地渲染'),
  mockKicker: t('PROJECT BRIEF · 2026', '项目简报 · 2026'),
  mockTitle: t('Release readiness review', '版本发布准备评审'),
  mockBody: t(
    'A focused preview surface makes density, contrast, and repetition easy to judge before the configuration reaches production.',
    '在配置进入生产环境前，通过独立预览区快速判断水印的密度、对比度与重复效果。',
  ),
  mockStatus: t('Status', '状态'),
  mockStatusValue: t('Ready for review', '等待评审'),
  mockOwner: t('Owner', '负责人'),
  mockOwnerValue: t('Platform team', '平台团队'),
  mockUpdated: t('Updated', '更新时间'),
  mockUpdatedValue: t('Today, 10:32', '今天 10:32'),
}))

const outputOptions = ref<Partial<WatermarkOptions>>(cloneDeep(initialOptions))
const formKey = ref(0)
const previewElement = ref<HTMLElement>()
const previewEnabled = ref(true)
const activeWorkspaceView = ref<'preview' | 'code'>('preview')
const copied = ref(false)
let previewWatermark: Watermark | undefined
let copyTimer: ReturnType<typeof setTimeout> | undefined

const serializedOptions = computed(() => {
  const json = JSON.stringify(
    outputOptions.value,
    (_key, value) => {
      if (typeof Element !== 'undefined' && value instanceof Element) {
        return './watermark.png'
      }
      return value
    },
    2,
  )
  return json.replace(/^(\s*)"([A-Za-z_$][\w$]*)":/gm, '$1$2:')
})

const generatedCode = computed(
  () => `import { Watermark } from 'watermark-js-plus'

const watermark = new Watermark(${serializedOptions.value})

watermark.create()

// ${t('Remove it later when needed', '需要移除时调用')}
watermark.destroy()`,
)

async function renderPreview() {
  if (!previewElement.value || !previewEnabled.value) {
    return
  }

  if (outputOptions.value.contentType === 'image' && !outputOptions.value.image?.trim()) {
    previewWatermark?.destroy()
    previewWatermark = undefined
    return
  }

  const runtimeOptions: Partial<WatermarkOptions> = {
    ...outputOptions.value,
    parent: previewElement.value,
    mutationObserve: false,
    monitorProtection: false,
  }

  if (!previewWatermark) {
    previewWatermark = new Watermark(runtimeOptions)
    await previewWatermark.create()
    return
  }

  await previewWatermark.changeOptions(runtimeOptions)
}

function handleOptionsChange(options: Partial<WatermarkOptions>) {
  outputOptions.value = options
  void renderPreview()
}

function togglePreview() {
  if (previewEnabled.value) {
    void renderPreview()
  } else {
    previewWatermark?.destroy()
    previewWatermark = undefined
  }
}

function handlePreviewToggle() {
  previewEnabled.value = !previewEnabled.value
  togglePreview()
}

async function resetOptions() {
  previewWatermark?.destroy()
  previewWatermark = undefined
  outputOptions.value = cloneDeep(initialOptions)
  formKey.value += 1
  previewEnabled.value = true
  await nextTick()
  await renderPreview()
}

async function copyGeneratedCode() {
  try {
    await navigator.clipboard.writeText(generatedCode.value)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = generatedCode.value
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }

  copied.value = true
  if (copyTimer) {
    clearTimeout(copyTimer)
  }
  copyTimer = setTimeout(() => {
    copied.value = false
  }, 1800)
}

onMounted(() => {
  void renderPreview()
})

onBeforeUnmount(() => {
  previewWatermark?.destroy()
  if (copyTimer) {
    clearTimeout(copyTimer)
  }
})
</script>

<template>
  <div class="watermark-configurator">
    <div class="tool-status">
      <span class="live-badge">
        <span aria-hidden="true"></span>
        {{ copy.live }}
      </span>
      <span>{{ copy.local }}</span>
    </div>

    <div class="workbench">
      <div class="preview-rail">
        <div class="preview-column">
          <header class="panel-header workspace-header">
            <div class="workspace-heading">
              <div class="workspace-tabs" role="tablist" :aria-label="copy.workspace">
                <button
                  id="workspace-preview-tab"
                  class="workspace-tab"
                  :class="{ 'is-active': activeWorkspaceView === 'preview' }"
                  type="button"
                  role="tab"
                  :aria-selected="activeWorkspaceView === 'preview'"
                  aria-controls="workspace-preview-panel"
                  @click="activeWorkspaceView = 'preview'"
                >
                  {{ copy.previewTab }}
                </button>
                <button
                  id="workspace-code-tab"
                  class="workspace-tab"
                  :class="{ 'is-active': activeWorkspaceView === 'code' }"
                  type="button"
                  role="tab"
                  :aria-selected="activeWorkspaceView === 'code'"
                  aria-controls="workspace-code-panel"
                  @click="activeWorkspaceView = 'code'"
                >
                  {{ copy.codeTab }}
                </button>
              </div>
              <strong>{{ activeWorkspaceView === 'preview' ? copy.previewHint : copy.codeHint }}</strong>
            </div>

            <el-button
              v-if="activeWorkspaceView === 'preview'"
              text
              :icon="previewEnabled ? Hide : View"
              :aria-label="previewEnabled ? copy.hidePreview : copy.showPreview"
              @click="handlePreviewToggle"
            >
              {{ previewEnabled ? copy.previewOn : copy.previewOff }}
            </el-button>
            <el-button
              v-else
              :type="copied ? 'success' : 'primary'"
              :icon="copied ? Check : CopyDocument"
              aria-live="polite"
              @click="copyGeneratedCode"
            >
              {{ copied ? copy.copied : copy.copyCode }}
            </el-button>
          </header>

          <section
            v-show="activeWorkspaceView === 'preview'"
            id="workspace-preview-panel"
            class="preview-panel workspace-view"
            role="tabpanel"
            aria-labelledby="workspace-preview-tab"
          >
            <div class="preview-stage">
              <article ref="previewElement" class="preview-document">
                <div class="document-content">
                  <span class="document-kicker">{{ copy.mockKicker }}</span>
                  <h2>{{ copy.mockTitle }}</h2>
                  <p>{{ copy.mockBody }}</p>

                  <dl class="document-meta">
                    <div>
                      <dt>{{ copy.mockStatus }}</dt>
                      <dd>{{ copy.mockStatusValue }}</dd>
                    </div>
                    <div>
                      <dt>{{ copy.mockOwner }}</dt>
                      <dd>{{ copy.mockOwnerValue }}</dd>
                    </div>
                    <div>
                      <dt>{{ copy.mockUpdated }}</dt>
                      <dd>{{ copy.mockUpdatedValue }}</dd>
                    </div>
                  </dl>

                  <div class="document-lines" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section
            v-show="activeWorkspaceView === 'code'"
            id="workspace-code-panel"
            class="code-panel workspace-view"
            role="tabpanel"
            aria-labelledby="workspace-code-tab"
          >
            <pre><code>{{ generatedCode }}</code></pre>
          </section>
        </div>
      </div>

      <aside class="settings-panel" :aria-label="copy.settings">
        <header class="panel-header settings-header">
          <div>
            <span class="panel-eyebrow">{{ copy.settings }}</span>
            <strong>{{ copy.settingsHint }}</strong>
          </div>
          <el-button text :icon="RefreshLeft" @click="resetOptions">{{ copy.reset }}</el-button>
        </header>
        <WatermarkOptionsForm :key="formKey" :options="initialOptions" @change="handleOptionsChange" />
      </aside>
    </div>
  </div>
</template>

<style scoped>
.watermark-configurator {
  --tool-space-xs: 4px;
  --tool-space-sm: 8px;
  --tool-space-md: 12px;
  --tool-space-lg: 16px;
  --tool-space-xl: 24px;
  --tool-space-2xl: 32px;
  --tool-panel-header-height: 88px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  color: var(--vp-c-text-1);
  margin-top: var(--tool-space-xl);
  width: 100%;
}

.tool-status {
  align-items: center;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  border-radius: 16px 16px 0 0;
  color: var(--vp-c-text-2);
  display: flex;
  font-size: 13px;
  gap: var(--tool-space-md);
  min-height: 44px;
  padding: var(--tool-space-sm) var(--tool-space-lg);
}

.live-badge {
  align-items: center;
  color: var(--vp-c-brand-1);
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 650;
  gap: 7px;
}

.live-badge > span {
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  box-shadow: 0 0 0 4px color-mix(in oklch, var(--vp-c-brand-1) 12%, transparent);
  height: 7px;
  width: 7px;
}

.workbench {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(340px, 0.82fr);
}

.preview-rail,
.settings-panel {
  min-width: 0;
}

.preview-rail {
  background: var(--vp-c-bg-soft);
  border-radius: 0 0 0 16px;
}

.preview-column {
  align-self: start;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: min(720px, calc(100vh - var(--vp-nav-height)));
  overflow: hidden;
  position: sticky;
  top: var(--vp-nav-height);
}

.settings-panel {
  background: var(--vp-c-bg);
  border-left: 1px solid var(--vp-c-divider);
  border-radius: 0 0 16px 0;
  display: flex;
  flex-direction: column;
  overflow: clip;
}

.panel-header {
  align-items: center;
  border-bottom: 1px solid var(--vp-c-divider);
  box-sizing: border-box;
  display: flex;
  gap: var(--tool-space-lg);
  height: var(--tool-panel-header-height);
  justify-content: space-between;
  padding: var(--tool-space-md) var(--tool-space-xl);
}

.panel-header > div {
  display: grid;
  gap: var(--tool-space-xs);
  min-width: 0;
}

.panel-header strong {
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
}

.panel-eyebrow {
  color: var(--vp-c-text-2);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.4;
  text-transform: uppercase;
}

.workspace-header {
  flex: 0 0 var(--tool-panel-header-height);
}

.workspace-heading {
  align-content: center;
}

.workspace-tabs {
  align-items: center;
  border-bottom: 1px solid var(--vp-c-divider);
  display: inline-flex;
  gap: var(--tool-space-lg);
  width: fit-content;
}

.workspace-tab {
  appearance: none;
  background: transparent;
  border: 0;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  min-height: 32px;
  padding: var(--tool-space-xs) 2px var(--tool-space-sm);
  position: relative;
  transition: color 160ms ease-out;
}

.workspace-tab::after {
  background: var(--vp-c-brand-1);
  bottom: -1px;
  content: '';
  height: 2px;
  left: 0;
  position: absolute;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 160ms ease-out;
  width: 100%;
}

.workspace-tab:hover:not(.is-active) {
  color: var(--vp-c-text-1);
}

.workspace-tab.is-active {
  color: var(--vp-c-brand-1);
}

.workspace-tab.is-active::after {
  transform: scaleX(1);
}

.workspace-tab:focus-visible {
  border-radius: 3px;
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.workspace-view {
  flex: 1;
  min-height: 0;
}

.preview-panel {
  display: flex;
  flex-direction: column;
}

.preview-stage {
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  min-height: 0;
  overflow: hidden;
  padding: clamp(20px, 4vh, 40px);
}

.preview-document {
  background:
    linear-gradient(color-mix(in oklch, var(--vp-c-divider) 44%, transparent) 1px, transparent 1px), var(--vp-c-bg);
  background-size: 100% 32px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 18px 48px rgb(35 48 74 / 12%);
  box-sizing: border-box;
  height: min(390px, 100%);
  min-height: 0;
  overflow: hidden;
  position: relative;
  width: min(100%, 640px);
}

.dark .preview-document {
  box-shadow: 0 18px 52px rgb(0 0 0 / 30%);
}

.document-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--tool-space-lg);
  height: 100%;
  min-height: 0;
  padding: clamp(28px, 5vw, 56px);
  position: relative;
  z-index: 0;
}

.document-kicker {
  color: var(--vp-c-brand-1);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.preview-document h2 {
  border: 0;
  color: var(--vp-c-text-1);
  font-size: 28px;
  letter-spacing: -0.025em;
  line-height: 1.15;
  margin: 0;
  padding: 0;
}

.preview-document p {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.65;
  margin: 0;
  max-width: 62ch;
}

.document-meta {
  border-bottom: 1px solid var(--vp-c-divider);
  border-top: 1px solid var(--vp-c-divider);
  display: grid;
  gap: var(--tool-space-lg);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: var(--tool-space-sm) 0 0;
  padding: var(--tool-space-lg) 0;
}

.document-meta div {
  display: grid;
  gap: var(--tool-space-xs);
}

.document-meta dt {
  color: var(--vp-c-text-3);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.document-meta dd {
  color: var(--vp-c-text-1);
  font-size: 12px;
  font-weight: 600;
  margin: 0;
}

.document-lines {
  display: grid;
  gap: var(--tool-space-sm);
  margin-top: auto;
}

.document-lines span {
  background: color-mix(in oklch, var(--vp-c-text-3) 24%, transparent);
  height: 5px;
}

.document-lines span:nth-child(2) {
  width: 92%;
}

.document-lines span:nth-child(3) {
  width: 76%;
}

.document-lines span:nth-child(4) {
  width: 44%;
}

.code-panel {
  background: color-mix(in oklch, var(--vp-c-bg) 88%, var(--vp-c-brand-soft));
  display: flex;
}

.code-panel pre {
  background: transparent;
  border-radius: 0;
  flex: 1;
  margin: 0;
  overflow: auto;
  padding: var(--tool-space-xl);
}

.code-panel code {
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 12px;
  line-height: 1.65;
  padding: 0;
}

@media (max-width: 960px) {
  .workbench {
    grid-template-columns: 1fr;
  }

  .preview-rail {
    border-radius: 0;
  }

  .preview-column {
    height: auto;
    position: static;
  }

  .settings-panel {
    border-left: 0;
    border-radius: 0 0 16px 16px;
    border-top: 1px solid var(--vp-c-divider);
  }
}

@media (max-width: 560px) {
  .tool-status {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--tool-space-xs);
    padding: var(--tool-space-md) var(--tool-space-lg);
  }

  .panel-header {
    align-items: flex-start;
    padding: var(--tool-space-md) var(--tool-space-lg);
  }

  .panel-header > .el-button {
    flex: 0 0 auto;
  }

  .preview-stage {
    min-height: 360px;
    padding: var(--tool-space-lg);
  }

  .preview-document,
  .document-content {
    height: auto;
    min-height: 328px;
  }

  .code-panel pre {
    max-height: 420px;
  }

  .document-content {
    padding: var(--tool-space-xl);
  }

  .preview-document h2 {
    font-size: 22px;
  }

  .document-meta {
    gap: var(--tool-space-md);
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .watermark-configurator *,
  .watermark-configurator *::before,
  .watermark-configurator *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
