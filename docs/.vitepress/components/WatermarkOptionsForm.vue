<template>
  <div class="watermark-options-form">
    <section class="primary-section">
      <div class="section-heading prominent">
        <div>
          <strong>{{ t('Content & canvas', '内容与画布') }}</strong>
          <span class="section-description">{{
            t('Set what is rendered and the size of each watermark tile.', '设置水印内容与单个水印单元的尺寸。')
          }}</span>
        </div>
      </div>

      <div class="field-grid">
        <label class="control-field full-width">
          <span>{{ t('Content type', '内容类型') }}</span>
          <el-select v-model="form.data.contentType" :placeholder="t('Select a content type', '请选择内容类型')">
            <el-option :label="t('Single-line text', '单行文字')" value="text" />
            <el-option :label="t('Multi-line text', '多行文字')" value="multi-line-text" />
            <el-option :label="t('Image', '图片')" value="image" />
            <el-option :label="t('Rich text', '富文本')" value="rich-text" />
          </el-select>
        </label>

        <label v-if="form.data.contentType !== 'image'" class="control-field full-width">
          <span>{{ t('Watermark content', '水印内容') }}</span>
          <el-input
            v-model="form.data.content"
            :rows="form.data.contentType === 'text' ? 2 : 4"
            type="textarea"
            :placeholder="t('Enter watermark content', '请输入水印内容')"
          />
        </label>

        <template v-if="form.data.contentType === 'image'">
          <div class="control-field full-width">
            <span>{{ t('Watermark image', '水印图片') }}</span>
            <el-upload
              ref="uploadImage"
              list-type="picture-card"
              accept="image/*"
              :auto-upload="false"
              :limit="1"
              :show-file-list="true"
              :on-exceed="handleExceedImage"
              :on-change="handleChangeImage"
              class="upload-image"
            >
              <span class="upload-trigger">
                <el-icon><Plus /></el-icon>
                <small>{{ t('Choose image', '选择图片') }}</small>
              </span>
            </el-upload>
          </div>
          <label class="control-field">
            <span>{{ t('Image width', '图片宽度') }}</span>
            <el-input-number v-model="form.data.imageWidth" :min="0" controls-position="right" />
          </label>
          <label class="control-field">
            <span>{{ t('Image height', '图片高度') }}</span>
            <el-input-number v-model="form.data.imageHeight" :min="0" controls-position="right" />
          </label>
        </template>

        <template v-if="form.data.contentType === 'rich-text'">
          <label class="control-field">
            <span>{{ t('Rich text width', '富文本宽度') }}</span>
            <el-input-number v-model="form.data.richTextWidth" :min="0" controls-position="right" />
          </label>
          <label class="control-field">
            <span>{{ t('Rich text height', '富文本高度') }}</span>
            <el-input-number v-model="form.data.richTextHeight" :min="0" controls-position="right" />
          </label>
        </template>

        <div class="subsection-label full-width">
          <span>{{ t('Tile geometry', '单元几何') }}</span>
        </div>
        <label class="control-field">
          <span>{{ t('Width', '宽度') }}</span>
          <el-input-number v-model="form.data.width" :min="1" controls-position="right" />
        </label>
        <label class="control-field">
          <span>{{ t('Height', '高度') }}</span>
          <el-input-number v-model="form.data.height" :min="1" controls-position="right" />
        </label>
        <label class="control-field full-width">
          <span class="label-with-value">
            {{ t('Rotation', '旋转角度') }}
            <output>{{ form.data.rotate }}°</output>
          </span>
          <el-slider v-model="form.data.rotate" :min="-180" :max="180" :show-tooltip="false" />
        </label>
      </div>
    </section>

    <el-collapse v-model="activeSections" class="options-collapse">
      <el-collapse-item name="appearance">
        <template #title>
          <div class="section-heading">
            <div>
              <div class="section-title-row">
                <strong>{{ t('Appearance', '外观') }}</strong>
                <span
                  class="section-status"
                  :class="{ 'is-active': form.style.enabled }"
                  :aria-hidden="!form.style.enabled"
                >
                  {{ t('On', '已启用') }}
                </span>
              </div>
              <span class="section-description">{{
                t('Typography, opacity, color, and text flow.', '调整字体、透明度、颜色与文字排版。')
              }}</span>
            </div>
          </div>
        </template>
        <div class="section-body">
          <div class="enable-row">
            <label for="enable-style">
              <strong>{{ t('Use custom appearance', '启用自定义外观') }}</strong>
              <small>{{ t('Otherwise the library defaults are used.', '关闭时使用类库默认样式。') }}</small>
            </label>
            <el-switch id="enable-style" v-model="form.style.enabled" />
          </div>

          <div class="field-grid" :class="{ 'is-disabled': !form.style.enabled }">
            <label class="control-field">
              <span>{{ t('Opacity', '透明度') }}</span>
              <el-input-number
                v-model="form.data.globalAlpha"
                :disabled="!form.style.enabled"
                :min="0"
                :max="1"
                :precision="2"
                :step="0.1"
                controls-position="right"
              />
            </label>
            <label class="control-field">
              <span>{{ t('Rendering', '绘制方式') }}</span>
              <el-select v-model="form.data.textType" :disabled="!form.style.enabled">
                <el-option :label="t('Fill', '填充')" value="fill" />
                <el-option :label="t('Outline', '描边')" value="stroke" />
              </el-select>
            </label>

            <div class="control-field full-width">
              <span>{{ t('Text color', '文字颜色') }}</span>
              <div class="color-control">
                <el-color-picker v-model="form.data.fontColor" :disabled="!form.style.enabled" show-alpha />
                <el-input v-model="form.data.fontColor" :disabled="!form.style.enabled" />
              </div>
            </div>

            <div class="subsection-label full-width">
              <span>{{ t('Typography', '文字样式') }}</span>
            </div>
            <label class="control-field">
              <span>{{ t('Font size', '字号') }}</span>
              <el-input v-model="form.data.fontSize" :disabled="!form.style.enabled" placeholder="20px" />
            </label>
            <label class="control-field">
              <span>{{ t('Line height', '行高') }}</span>
              <el-input-number
                v-model="form.data.lineHeight"
                :disabled="!form.style.enabled"
                :min="0"
                controls-position="right"
              />
            </label>
            <label class="control-field full-width">
              <span>{{ t('Font family', '字体') }}</span>
              <el-input v-model="form.data.fontFamily" :disabled="!form.style.enabled" placeholder="sans-serif" />
            </label>
            <label class="control-field">
              <span>{{ t('Font weight', '字重') }}</span>
              <el-input v-model="form.data.fontWeight" :disabled="!form.style.enabled" placeholder="normal" />
            </label>
            <label class="control-field">
              <span>{{ t('Font style', '字体样式') }}</span>
              <el-input v-model="form.data.fontStyle" :disabled="!form.style.enabled" placeholder="normal" />
            </label>
            <label class="control-field full-width">
              <span>{{ t('Font variant', '字体变体') }}</span>
              <el-input v-model="form.data.fontVariant" :disabled="!form.style.enabled" placeholder="normal" />
            </label>

            <div class="subsection-label full-width">
              <span>{{ t('Text flow', '文字排版') }}</span>
            </div>
            <label class="control-field">
              <span>{{ t('Text align', '文字对齐') }}</span>
              <el-select v-model="form.data.textAlign" :disabled="!form.style.enabled" clearable>
                <el-option label="center" value="center" />
                <el-option label="end" value="end" />
                <el-option label="left" value="left" />
                <el-option label="right" value="right" />
                <el-option label="start" value="start" />
              </el-select>
            </label>
            <label class="control-field">
              <span>{{ t('Text baseline', '文字基线') }}</span>
              <el-select v-model="form.data.textBaseline" :disabled="!form.style.enabled" clearable>
                <el-option label="alphabetic" value="alphabetic" />
                <el-option label="hanging" value="hanging" />
                <el-option label="ideographic" value="ideographic" />
                <el-option label="top" value="top" />
                <el-option label="bottom" value="bottom" />
                <el-option label="middle" value="middle" />
              </el-select>
            </label>
            <label class="control-field">
              <span>{{ t('Letter spacing', '字符间距') }}</span>
              <el-input v-model="form.data.letterSpacing" :disabled="!form.style.enabled" placeholder="0px" />
            </label>
            <label class="control-field">
              <span>{{ t('Word spacing', '单词间距') }}</span>
              <el-input v-model="form.data.wordSpacing" :disabled="!form.style.enabled" placeholder="0px" />
            </label>
            <label class="control-field full-width">
              <span>{{ t('Text row max width', '文本行最大宽度') }}</span>
              <el-input-number
                v-model="form.data.textRowMaxWidth"
                :disabled="!form.style.enabled"
                :min="0"
                controls-position="right"
              />
            </label>
            <label class="control-field full-width">
              <span>{{ t('Canvas filters', '画布滤镜') }}</span>
              <el-select
                v-model="filterValue"
                :disabled="!form.style.enabled"
                multiple
                filterable
                allow-create
                :reserve-keyword="false"
                :placeholder="t('Select or enter CSS filters', '选择或输入 CSS 滤镜')"
                @change="handleFilterChange"
              >
                <el-option v-for="item in filterOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </label>
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item name="position">
        <template #title>
          <div class="section-heading">
            <div>
              <div class="section-title-row">
                <strong>{{ t('Position & tiling', '定位与平铺') }}</strong>
                <span
                  class="section-status"
                  :class="{ 'is-active': form.position.enabled }"
                  :aria-hidden="!form.position.enabled"
                >
                  {{ t('On', '已启用') }}
                </span>
              </div>
              <span class="section-description">{{
                t('Control anchoring, offsets, repetition, and stacking.', '控制锚点、偏移、背景重复与层级。')
              }}</span>
            </div>
          </div>
        </template>
        <div class="section-body">
          <div class="enable-row">
            <label for="enable-position">
              <strong>{{ t('Use custom positioning', '启用自定义定位') }}</strong>
              <small>{{ t('Override the default centered, repeated layout.', '覆盖默认的居中平铺设置。') }}</small>
            </label>
            <el-switch id="enable-position" v-model="form.position.enabled" />
          </div>

          <div class="field-grid" :class="{ 'is-disabled': !form.position.enabled }">
            <label class="control-field full-width">
              <span>{{ t('Anchor point', '水印锚点') }}</span>
              <el-select v-model="form.data.translatePlacement" :disabled="!form.position.enabled">
                <el-option :label="t('Center', '居中')" value="middle" />
                <el-option :label="t('Top center', '顶部居中')" value="top" />
                <el-option :label="t('Top left', '左上')" value="top-start" />
                <el-option :label="t('Top right', '右上')" value="top-end" />
                <el-option :label="t('Bottom center', '底部居中')" value="bottom" />
                <el-option :label="t('Bottom left', '左下')" value="bottom-start" />
                <el-option :label="t('Bottom right', '右下')" value="bottom-end" />
                <el-option :label="t('Left center', '左侧居中')" value="left" />
                <el-option :label="t('Right center', '右侧居中')" value="right" />
              </el-select>
            </label>
            <label class="control-field">
              <span>{{ t('Horizontal offset', '水平偏移') }}</span>
              <el-input-number
                v-model="form.data.translateX"
                :disabled="!form.position.enabled"
                controls-position="right"
              />
            </label>
            <label class="control-field">
              <span>{{ t('Vertical offset', '垂直偏移') }}</span>
              <el-input-number
                v-model="form.data.translateY"
                :disabled="!form.position.enabled"
                controls-position="right"
              />
            </label>
            <label class="control-field">
              <span>{{ t('Background position', '背景位置') }}</span>
              <el-input v-model="form.data.backgroundPosition" :disabled="!form.position.enabled" placeholder="0 0" />
            </label>
            <label class="control-field">
              <span>{{ t('Background repeat', '背景重复') }}</span>
              <el-select v-model="form.data.backgroundRepeat" :disabled="!form.position.enabled">
                <el-option label="repeat" value="repeat" />
                <el-option label="repeat-x" value="repeat-x" />
                <el-option label="repeat-y" value="repeat-y" />
                <el-option label="no-repeat" value="no-repeat" />
              </el-select>
            </label>
            <label class="control-field">
              <span>{{ t('Parent selector', '父元素选择器') }}</span>
              <el-input v-model="form.data.parent" :disabled="!form.position.enabled" placeholder="body" />
            </label>
            <label class="control-field">
              <span>z-index</span>
              <el-input-number
                v-model="form.data.zIndex"
                :disabled="!form.position.enabled"
                controls-position="right"
              />
            </label>
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item name="shadow">
        <template #title>
          <div class="section-heading">
            <div>
              <div class="section-title-row">
                <strong>{{ t('Shadow', '阴影') }}</strong>
                <span
                  class="section-status"
                  :class="{ 'is-active': form.shadow.enabled }"
                  :aria-hidden="!form.shadow.enabled"
                >
                  {{ t('On', '已启用') }}
                </span>
              </div>
              <span class="section-description">{{
                t('Improve contrast against detailed backgrounds.', '增强水印在复杂背景上的辨识度。')
              }}</span>
            </div>
          </div>
        </template>
        <div class="section-body">
          <div class="enable-row">
            <label for="enable-shadow">
              <strong>{{ t('Use shadow', '启用阴影') }}</strong>
              <small>{{ t('Add a canvas shadow to text or images.', '为文字或图片增加画布阴影。') }}</small>
            </label>
            <el-switch id="enable-shadow" v-model="form.shadow.enabled" />
          </div>
          <div class="field-grid" :class="{ 'is-disabled': !form.shadow.enabled }">
            <div class="control-field full-width">
              <span>{{ t('Shadow color', '阴影颜色') }}</span>
              <div class="color-control">
                <el-color-picker
                  v-model="form.data.shadowStyle.shadowColor"
                  :disabled="!form.shadow.enabled"
                  show-alpha
                />
                <el-input v-model="form.data.shadowStyle.shadowColor" :disabled="!form.shadow.enabled" />
              </div>
            </div>
            <label class="control-field full-width">
              <span>{{ t('Blur', '模糊半径') }}</span>
              <el-input-number
                v-model="form.data.shadowStyle.shadowBlur"
                :disabled="!form.shadow.enabled"
                :min="0"
                controls-position="right"
              />
            </label>
            <label class="control-field">
              <span>{{ t('Horizontal offset', '水平偏移') }}</span>
              <el-input-number
                v-model="form.data.shadowStyle.shadowOffsetX"
                :disabled="!form.shadow.enabled"
                controls-position="right"
              />
            </label>
            <label class="control-field">
              <span>{{ t('Vertical offset', '垂直偏移') }}</span>
              <el-input-number
                v-model="form.data.shadowStyle.shadowOffsetY"
                :disabled="!form.shadow.enabled"
                controls-position="right"
              />
            </label>
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item name="advanced">
        <template #title>
          <div class="section-heading">
            <div>
              <div class="section-title-row">
                <strong>{{ t('Advanced fill', '高级填充') }}</strong>
                <span
                  class="section-status"
                  :class="{ 'is-active': form.advancedStyle.enabled }"
                  :aria-hidden="!form.advancedStyle.enabled"
                >
                  {{ t('On', '已启用') }}
                </span>
              </div>
              <span class="section-description">{{
                t('Build gradients or use an image pattern.', '使用渐变或图片图案填充水印。')
              }}</span>
            </div>
          </div>
        </template>
        <div class="section-body">
          <div class="enable-row">
            <label for="enable-advanced-style">
              <strong>{{ t('Use advanced fill', '启用高级填充') }}</strong>
              <small>{{ t('Replace the solid text color with a canvas fill.', '使用画布填充替代纯色文字。') }}</small>
            </label>
            <el-switch id="enable-advanced-style" v-model="form.advancedStyle.enabled" />
          </div>
          <div class="field-grid" :class="{ 'is-disabled': !form.advancedStyle.enabled }">
            <label class="control-field full-width">
              <span>{{ t('Fill type', '填充类型') }}</span>
              <el-select v-model="form.data.advancedStyle.type" :disabled="!form.advancedStyle.enabled">
                <el-option :label="t('Linear gradient', '线性渐变')" value="linear" />
                <el-option :label="t('Radial gradient', '径向渐变')" value="radial" />
                <el-option :label="t('Conic gradient', '锥形渐变')" value="conic" />
                <el-option :label="t('Image pattern', '图片图案')" value="pattern" />
              </el-select>
            </label>

            <template v-if="form.data.advancedStyle.type === 'linear'">
              <label v-for="key in linearKeys" :key="key" class="control-field">
                <span>Linear {{ key.toUpperCase() }}</span>
                <el-input-number
                  v-model="form.data.advancedStyle.params.linear[key]"
                  :disabled="!form.advancedStyle.enabled"
                  controls-position="right"
                />
              </label>
            </template>

            <template v-else-if="form.data.advancedStyle.type === 'radial'">
              <label v-for="key in radialKeys" :key="key" class="control-field">
                <span>Radial {{ key.toUpperCase() }}</span>
                <el-input-number
                  v-model="form.data.advancedStyle.params.radial[key]"
                  :disabled="!form.advancedStyle.enabled"
                  controls-position="right"
                />
              </label>
            </template>

            <template v-else-if="form.data.advancedStyle.type === 'conic'">
              <label v-for="key in conicKeys" :key="key" class="control-field">
                <span>Conic {{ key }}</span>
                <el-input-number
                  v-model="form.data.advancedStyle.params.conic[key]"
                  :disabled="!form.advancedStyle.enabled"
                  controls-position="right"
                />
              </label>
            </template>

            <template v-else>
              <div class="control-field">
                <span>{{ t('Pattern image', '图案图片') }}</span>
                <el-upload
                  ref="uploadPatternImage"
                  list-type="picture-card"
                  accept="image/*"
                  :auto-upload="false"
                  :limit="1"
                  :show-file-list="true"
                  :on-exceed="handleExceedPatternImage"
                  :on-change="handleChangePatternImage"
                  :disabled="!form.advancedStyle.enabled"
                  class="upload-image"
                >
                  <span class="upload-trigger">
                    <el-icon><Plus /></el-icon>
                    <small>{{ t('Choose image', '选择图片') }}</small>
                  </span>
                </el-upload>
              </div>
              <label class="control-field">
                <span>{{ t('Repetition', '重复方式') }}</span>
                <el-select
                  v-model="form.data.advancedStyle.params.pattern.repetition"
                  :disabled="!form.advancedStyle.enabled"
                >
                  <el-option label="repeat" value="repeat" />
                  <el-option label="repeat-x" value="repeat-x" />
                  <el-option label="repeat-y" value="repeat-y" />
                  <el-option label="no-repeat" value="no-repeat" />
                </el-select>
              </label>
            </template>
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item name="protection">
        <template #title>
          <div class="section-heading">
            <div>
              <div class="section-title-row">
                <strong>{{ t('Protection & behavior', '保护与行为') }}</strong>
                <span
                  class="section-status"
                  :class="{ 'is-active': form.extra.enabled }"
                  :aria-hidden="!form.extra.enabled"
                >
                  {{ t('On', '已启用') }}
                </span>
              </div>
              <span class="section-description">{{
                t('Mutation recovery, diagnostics, and motion.', '设置 DOM 恢复、调试辅助与动态效果。')
              }}</span>
            </div>
          </div>
        </template>
        <div class="section-body">
          <div class="enable-row">
            <label for="enable-protection">
              <strong>{{ t('Customize behavior', '自定义保护行为') }}</strong>
              <small>{{ t('Expose runtime protection and diagnostics options.', '配置运行时保护与调试选项。') }}</small>
            </label>
            <el-switch id="enable-protection" v-model="form.extra.enabled" />
          </div>
          <div class="toggle-list" :class="{ 'is-disabled': !form.extra.enabled }">
            <label>
              <span>
                <strong>{{ t('Mutation observer', 'DOM 变更监听') }}</strong>
                <small>{{ t('Restore the watermark after DOM changes.', '在 DOM 被修改后自动恢复水印。') }}</small>
              </span>
              <el-switch v-model="form.data.mutationObserve" :disabled="!form.extra.enabled" />
            </label>
            <label>
              <span>
                <strong>{{ t('Protection monitor', '保护监控') }}</strong>
                <small>{{ t('Enable the library protection monitor.', '启用类库的保护监控能力。') }}</small>
              </span>
              <el-switch v-model="form.data.monitorProtection" :disabled="!form.extra.enabled" />
            </label>
            <label>
              <span>
                <strong>{{ t('Auxiliary line', '辅助线') }}</strong>
                <small>{{ t('Show canvas diagnostics while tuning.', '调试参数时显示画布辅助线。') }}</small>
              </span>
              <el-switch v-model="form.data.auxiliaryLine" :disabled="!form.extra.enabled" />
            </label>
            <label>
              <span>
                <strong>{{ t('Moving watermark', '动态移动') }}</strong>
                <small>{{ t('Animate the repeated watermark background.', '让平铺水印背景持续移动。') }}</small>
              </span>
              <el-switch v-model="form.data.movable" :disabled="!form.extra.enabled" />
            </label>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { useData } from 'vitepress'
import cloneDeep from 'lodash/cloneDeep'
import pick from 'lodash/pick'
import defaultsDeep from 'lodash/defaultsDeep'
import {
  defaultConfig,
  basicOptionKeys,
  positionOptionKeys,
  richTextOptionKeys,
  imageOptionKeys,
  styleOptionKeys,
  shadowOptionKeys,
  advancedStyleOptionKeys,
  extraOptionKeys,
} from './config'
import { Plus } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
import type { UploadFile, UploadInstance, UploadRawFile } from 'element-plus'
import { loadImage } from '../../../src/utils'
import type { WatermarkOptions } from '../../../src'

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['change'])
const { lang } = useData()
const t = (en: string, zh: string) => (lang.value.startsWith('zh') ? zh : en)
const hasAnyOption = (keys: string[]) => keys.some(key => Object.hasOwnProperty.call(props.options, key))

const form = reactive({
  data: defaultsDeep(cloneDeep(props.options), cloneDeep(defaultConfig)) as WatermarkOptions,
  position: {
    enabled: hasAnyOption(positionOptionKeys),
  },
  style: {
    enabled: hasAnyOption(styleOptionKeys),
  },
  shadow: {
    enabled: hasAnyOption(shadowOptionKeys),
  },
  advancedStyle: {
    enabled: hasAnyOption(advancedStyleOptionKeys),
  },
  extra: {
    enabled: hasAnyOption(extraOptionKeys),
  },
})

const activeSections = ref([])
const linearKeys = ['x0', 'y0', 'x1', 'y1'] as const
const radialKeys = ['x0', 'y0', 'r0', 'x1', 'y1', 'r1'] as const
const conicKeys = ['x', 'y', 'startAngle'] as const

const filterValue = ref<string[]>([])

const filterOptions = computed(() => [
  {
    value: 'blur(2px)',
    label: t('Blur — blur(2px)', '高斯模糊 — blur(2px)'),
  },
  {
    value: 'brightness(30%)',
    label: t('Brightness — brightness(30%)', '调节亮度 — brightness(30%)'),
  },
  {
    value: 'contrast(30%)',
    label: t('Contrast — contrast(30%)', '调节对比度 — contrast(30%)'),
  },
  {
    value: 'grayscale(100%)',
    label: t('Grayscale — grayscale(100%)', '灰阶 — grayscale(100%)'),
  },
  {
    value: 'hue-rotate(100deg)',
    label: t('Hue rotation — hue-rotate(100deg)', '色彩旋转 — hue-rotate(100deg)'),
  },
  {
    value: 'invert(100%)',
    label: t('Invert — invert(100%)', '反色图像 — invert(100%)'),
  },
  {
    value: 'opacity(50%)',
    label: t('Opacity — opacity(50%)', '调节透明度 — opacity(50%)'),
  },
  {
    value: 'saturate(10%)',
    label: t('Saturation — saturate(10%)', '调节饱和度 — saturate(10%)'),
  },
  {
    value: 'sepia(100%)',
    label: t('Sepia — sepia(100%)', '深褐色处理 — sepia(100%)'),
  },
  {
    value: 'drop-shadow(0px 0px 10px crimson)',
    label: t('Drop shadow — drop-shadow(0px 0px 10px crimson)', '阴影 — drop-shadow(0px 0px 10px crimson)'),
  },
])

const handleFilterChange = (value: string[]) => {
  form.data.filter = value.length ? value.join(' ') : 'none'
}

const uploadPatternImage = ref<UploadInstance>()
const uploadImage = ref<UploadInstance>()

let eventTimer: ReturnType<typeof setTimeout> | undefined

const handleChangeForm = (newValue: typeof form) => {
  const outputData = {
    ...pick(newValue.data, basicOptionKeys),
    ...(newValue.data.contentType === 'rich-text' ? pick(newValue.data, richTextOptionKeys) : null),
    ...(newValue.data.contentType === 'image' ? pick(newValue.data, imageOptionKeys) : null),
    ...(newValue.position.enabled ? pick(newValue.data, positionOptionKeys) : null),
    ...(newValue.style.enabled ? pick(newValue.data, styleOptionKeys) : null),
    ...(newValue.shadow.enabled ? pick(newValue.data, shadowOptionKeys) : null),
    ...(newValue.advancedStyle.enabled ? pick(newValue.data, advancedStyleOptionKeys) : null),
    ...(newValue.extra.enabled ? pick(newValue.data, extraOptionKeys) : null),
  }

  if (eventTimer) {
    clearTimeout(eventTimer)
  }
  eventTimer = setTimeout(() => {
    emit('change', outputData)
  }, 100)
}

watch(form, handleChangeForm, { deep: true })

const handleChangePatternImage = (uploadFile: UploadFile) => {
  if (uploadFile.url) {
    loadImage(uploadFile.url).then(image => {
      form.data.advancedStyle!.params!.pattern!.image = image
    })
  }
}

const handleExceedPatternImage = (files: File[]) => {
  uploadPatternImage.value?.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadPatternImage.value?.handleStart(file)
}

const handleChangeImage = (uploadFile: UploadFile) => {
  if (uploadFile.url) {
    form.data.image = uploadFile.url
  }
}

const handleExceedImage = (files: File[]) => {
  uploadImage.value?.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadImage.value?.handleStart(file)
}
</script>

<style scoped>
.watermark-options-form {
  --form-space-xs: 4px;
  --form-space-sm: 8px;
  --form-space-md: 12px;
  --form-space-lg: 16px;
  --form-space-xl: 24px;
  color: var(--vp-c-text-1);
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
}

.primary-section {
  display: grid;
  flex: 1;
  gap: var(--form-space-xl);
  padding: var(--form-space-xl);
}

.section-heading {
  align-items: center;
  display: flex;
  gap: var(--form-space-md);
  justify-content: space-between;
  min-width: 0;
  text-align: left;
  width: 100%;
}

.section-heading > div {
  display: grid;
  gap: var(--form-space-xs);
  min-width: 0;
}

.section-heading strong {
  color: var(--vp-c-text-1);
  font-size: 14px;
  line-height: 1.3;
}

.section-description {
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.45;
}

.section-heading.prominent strong {
  font-size: 16px;
}

.section-title-row {
  align-items: center;
  display: flex;
  gap: var(--form-space-sm);
  min-width: 0;
}

.section-status {
  align-items: center;
  color: var(--vp-c-brand-1);
  display: inline-flex;
  font-size: 10px;
  font-weight: 650;
  gap: 5px;
  line-height: 16px;
  opacity: 0;
  transition: opacity 140ms ease;
  white-space: nowrap;
}

.section-status::before {
  background: currentColor;
  border-radius: 50%;
  content: '';
  height: 5px;
  width: 5px;
}

.section-status.is-active {
  opacity: 1;
}

.field-grid {
  display: grid;
  gap: var(--form-space-lg) var(--form-space-md);
  grid-template-columns: repeat(2, minmax(0, 1fr));
  transition: opacity 160ms ease;
}

.field-grid.is-disabled,
.toggle-list.is-disabled {
  opacity: 0.58;
}

.full-width {
  grid-column: 1 / -1;
}

.control-field {
  display: grid;
  gap: var(--form-space-sm);
  margin: 0;
  min-width: 0;
}

.control-field > span,
.subsection-label span {
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 650;
  line-height: 1.4;
}

.label-with-value {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.label-with-value output {
  color: var(--vp-c-brand-1);
  font-variant-numeric: tabular-nums;
}

.subsection-label {
  align-items: center;
  display: flex;
  gap: var(--form-space-md);
  padding-top: var(--form-space-sm);
}

.subsection-label::after {
  background: var(--vp-c-divider);
  content: '';
  flex: 1;
  height: 1px;
}

.color-control {
  align-items: center;
  display: grid;
  gap: var(--form-space-sm);
  grid-template-columns: auto 1fr;
}

.options-collapse {
  border-bottom: 0;
  border-top: 1px solid var(--vp-c-divider);
  flex: 0 0 auto;
}

.options-collapse :deep(.el-collapse-item:last-child .el-collapse-item__header),
.options-collapse :deep(.el-collapse-item:last-child .el-collapse-item__wrap) {
  border-bottom: 0;
}

.options-collapse :deep(.el-collapse-item__header) {
  height: auto;
  line-height: normal;
  min-height: 78px;
  padding: var(--form-space-md) var(--form-space-xl);
}

.options-collapse :deep(.el-collapse-item__arrow) {
  color: var(--vp-c-text-2);
  margin-left: var(--form-space-md);
}

.options-collapse :deep(.el-collapse-item__wrap) {
  background: var(--vp-c-bg-soft);
}

.options-collapse :deep(.el-collapse-item__content) {
  padding: 0;
}

.section-body {
  display: grid;
  gap: var(--form-space-xl);
  padding: var(--form-space-xl);
}

.enable-row,
.toggle-list > label {
  align-items: center;
  display: flex;
  gap: var(--form-space-xl);
  justify-content: space-between;
}

.enable-row > label,
.toggle-list > label > span {
  display: grid;
  gap: var(--form-space-xs);
}

.enable-row strong,
.toggle-list strong {
  color: var(--vp-c-text-1);
  font-size: 13px;
}

.enable-row small,
.toggle-list small {
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.45;
}

.toggle-list {
  display: grid;
  gap: 0;
}

.toggle-list > label {
  border-top: 1px solid var(--vp-c-divider);
  min-height: 64px;
  padding: var(--form-space-md) 0;
}

.upload-trigger {
  align-items: center;
  color: var(--vp-c-text-2);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.upload-trigger small {
  font-size: 11px;
}

.upload-image :deep(ul) {
  padding-left: 0;
}

.upload-image :deep(.el-upload--picture-card),
.upload-image :deep(.el-upload-list--picture-card) {
  --el-upload-picture-card-size: 88px;
}

.control-field :deep(.el-input-number),
.control-field :deep(.el-select) {
  width: 100%;
}

.control-field :deep(.el-input-number.is-controls-right .el-input-number__increase) {
  bottom: 50%;
  height: auto;
  top: 1px;
}

.control-field :deep(.el-input-number.is-controls-right .el-input-number__decrease) {
  bottom: 1px;
  height: auto;
  top: 50%;
}

@media (max-width: 520px) {
  .primary-section,
  .section-body {
    padding: var(--form-space-lg);
  }

  .options-collapse :deep(.el-collapse-item__header) {
    padding: var(--form-space-md) var(--form-space-lg);
  }

  .field-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: auto;
  }

  .section-description {
    display: none;
  }
}
</style>
