<template>
  <div>
    <el-descriptions title="Basic" :column="2" border>
      <el-descriptions-item label="Width">
        <el-input-number v-model="form.data.width" :min="1" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Height">
        <el-input-number v-model="form.data.height" :min="1" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Rotate">
        <el-input-number v-model="form.data.rotate" :max="360" @input="handleChange" />
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="Content" :column="2" border>
      <el-descriptions-item label="Content Type" :span="2">
        <el-select v-model="form.data.contentType" placeholder="please select content type" @change="handleChange">
          <el-option label="text" value="text" />
          <el-option label="multi-line-text" value="multi-line-text" />
          <el-option label="image" value="image" />
          <el-option label="rich-text" value="rich-text" />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="Content" :span="2">
        <el-input v-model="form.data.content" :rows="3" type="textarea" placeholder="please input content" @input="handleChange" />
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="Position" :column="2" border>
      <template #title>
        <el-checkbox v-model="form.position.enabled" @change="handleChangePositionEnabled">Position</el-checkbox>
      </template>
      <el-descriptions-item label="Translate Placement" :span="2">
        <el-select v-model="form.data.translatePlacement" :disabled="!form.position.enabled" placeholder="please select translate placement" @change="handleChange">
          <el-option label="middle" value="middle" />
          <el-option label="top" value="top" />
          <el-option label="top-start" value="top-start" />
          <el-option label="top-end" value="top-end" />
          <el-option label="bottom" value="bottom" />
          <el-option label="bottom-start" value="bottom-start" />
          <el-option label="bottom-end" value="bottom-end" />
          <el-option label="left" value="left" />
          <el-option label="right" value="right" />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="Translate X">
        <el-input-number v-model="form.data.translateX" :disabled="!form.position.enabled" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Translate Y">
        <el-input-number v-model="form.data.translateY" :disabled="!form.position.enabled" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Background Position">
        <el-input v-model="form.data.backgroundPosition" :disabled="!form.position.enabled" placeholder="please input background position" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Background Repeat">
        <el-select v-model="form.data.backgroundRepeat" :disabled="!form.position.enabled" placeholder="please select background repeat" @change="handleChange">
          <el-option label="repeat" value="repeat" />
          <el-option label="repeat-x" value="repeat-x" />
          <el-option label="repeat-y" value="repeat-y" />
          <el-option label="no-repeat" value="no-repeat" />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="Parent">
        <el-input v-model="form.data.parent" :disabled="!form.position.enabled" placeholder="please input parent" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Z-Index">
        <el-input-number v-model="form.data.zIndex" :disabled="!form.position.enabled" @input="handleChange" />
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="Rich Text" :column="2" border>
      <template #title>
        <el-checkbox v-model="form.richText.enabled" @change="handleChangeRichTextEnabled">Rich Text</el-checkbox>
      </template>
      <el-descriptions-item label="Rich Text Width">
        <el-input-number v-model="form.data.richTextWidth" :disabled="!form.richText.enabled" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Rich Text Height">
        <el-input-number v-model="form.data.richTextHeight" :disabled="!form.richText.enabled" @input="handleChange" />
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="Image" :column="2" border>
      <template #title>
        <el-checkbox v-model="form.image.enabled" @change="handleChangeImageEnabled">Image</el-checkbox>
      </template>
      <el-descriptions-item label="Image" :span="2">
        <el-upload
          ref="uploadImage"
          list-type="picture-card"
          accept="image/*"
          :auto-upload="false"
          :limit="1"
          :show-file-list="true"
          :on-exceed="handleExceedImage"
          :on-change="handleChangeImage"
          :disabled="!form.image.enabled"
          class="upload-image"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-descriptions-item>
      <el-descriptions-item label="Image Width">
        <el-input-number v-model="form.data.imageWidth" :disabled="!form.image.enabled" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Image Height">
        <el-input-number v-model="form.data.imageHeight" :disabled="!form.image.enabled" @input="handleChange" />
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="Style" :column="2" border>
      <template #title>
        <el-checkbox v-model="form.style.enabled" @change="handleChangeStyleEnabled">Style</el-checkbox>
      </template>
      <el-descriptions-item label="Global Alpha">
        <el-input-number v-model="form.data.globalAlpha" :disabled="!form.style.enabled" :max="1" :precision="2" :step="0.1" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Mode">
        <el-select v-model="form.data.mode" :disabled="!form.style.enabled" placeholder="please select mode" @change="handleChange">
          <el-option label="default" value="default" />
          <el-option label="blind" value="blind" />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="Text Type">
        <el-select v-model="form.data.textType" :disabled="!form.style.enabled" placeholder="please select text type" @change="handleChange">
          <el-option label="fill" value="fill" />
          <el-option label="stroke" value="stroke" />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="Line Height">
        <el-input-number v-model="form.data.lineHeight" :disabled="!form.style.enabled" @change="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Font Size">
        <el-input v-model="form.data.fontSize" :disabled="!form.style.enabled" placeholder="please input font size" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Font Family">
        <el-input v-model="form.data.fontFamily" :disabled="!form.style.enabled" placeholder="please input font family" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Font Style">
        <el-input v-model="form.data.fontStyle" :disabled="!form.style.enabled" placeholder="please input font style" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Font Variant">
        <el-input v-model="form.data.fontVariant" :disabled="!form.style.enabled" placeholder="please input font variant" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Font Color">
        <el-input v-model="form.data.fontColor" :disabled="!form.style.enabled" placeholder="please input font color" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Font Weight">
        <el-input v-model="form.data.fontWeight" :disabled="!form.style.enabled" placeholder="please input font weight" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Text Align">
        <el-select v-model="form.data.textAlign" :disabled="!form.style.enabled" placeholder="please select text align" @change="handleChange">
          <el-option label="center" value="center" />
          <el-option label="end" value="end" />
          <el-option label="left" value="left" />
          <el-option label="right" value="right" />
          <el-option label="start" value="start" />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="Text Baseline">
        <el-select v-model="form.data.textBaseline" :disabled="!form.style.enabled" placeholder="please select text baseline" @change="handleChange">
          <el-option label="alphabetic" value="alphabetic" />
          <el-option label="hanging" value="hanging" />
          <el-option label="ideographic" value="ideographic" />
          <el-option label="top" value="top" />
          <el-option label="bottom" value="bottom" />
          <el-option label="middle" value="middle" />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="Filter">
        <el-input v-model="form.data.filter" :disabled="!form.style.enabled" placeholder="please input filter" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="TextRowMaxWidth">
        <el-input-number v-model="form.data.textRowMaxWidth" :disabled="!form.style.enabled" @input="handleChange" />
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="Shadow" :column="2" border v-if="form.data.shadowStyle">
      <template #title>
        <el-checkbox v-model="form.shadow.enabled" @change="handleChangeShadowEnabled">Shadow</el-checkbox>
      </template>
      <el-descriptions-item label="Shadow Blur">
        <el-input-number v-model="form.data.shadowStyle.shadowBlur" :disabled="!form.shadow.enabled" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Shadow Color">
        <el-input v-model="form.data.shadowStyle.shadowColor" :disabled="!form.shadow.enabled" placeholder="please input shadow color" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Shadow OffsetX">
        <el-input-number v-model="form.data.shadowStyle.shadowOffsetX" :disabled="!form.shadow.enabled" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Shadow OffsetY">
        <el-input-number v-model="form.data.shadowStyle.shadowOffsetY" :disabled="!form.shadow.enabled" @input="handleChange" />
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="Advanced Style" :column="2" border v-if="form.data.shadowStyle">
      <template #title>
        <el-checkbox v-model="form.advancedStyle.enabled" @change="handleChangeAdvancedStyleEnabled">Advanced Style</el-checkbox>
      </template>
      <el-descriptions-item label="Type" :span="2">
        <el-select v-model="form.data.advancedStyle.type" :disabled="!form.advancedStyle.enabled" placeholder="please select type" @change="handleChange">
          <el-option label="linear" value="linear" />
          <el-option label="radial" value="radial" />
          <el-option label="conic" value="conic" />
          <el-option label="pattern" value="pattern" />
        </el-select>
      </el-descriptions-item>
      <template v-if="form.data.advancedStyle.type === 'linear'">
        <el-descriptions-item label="Linear X0">
          <el-input-number v-model="form.data.advancedStyle.params.linear.x0" :disabled="!form.advancedStyle.enabled" @input="handleChange" />
        </el-descriptions-item>
        <el-descriptions-item label="Linear Y0">
          <el-input-number v-model="form.data.advancedStyle.params.linear.y0" :disabled="!form.advancedStyle.enabled" @input="handleChange" />
        </el-descriptions-item>
        <el-descriptions-item label="Linear X1">
          <el-input-number v-model="form.data.advancedStyle.params.linear.x1" :disabled="!form.advancedStyle.enabled" @input="handleChange" />
        </el-descriptions-item>
        <el-descriptions-item label="Linear Y1">
          <el-input-number v-model="form.data.advancedStyle.params.linear.y1" :disabled="!form.advancedStyle.enabled" @input="handleChange" />
        </el-descriptions-item>
      </template>
      <template v-else-if="form.data.advancedStyle.type === 'radial'">
        <el-descriptions-item label="Radial X0">
          <el-input-number v-model="form.data.advancedStyle.params.radial.x0" :disabled="!form.advancedStyle.enabled" @input="handleChange" />
        </el-descriptions-item>
        <el-descriptions-item label="Radial Y0">
          <el-input-number v-model="form.data.advancedStyle.params.radial.y0" :disabled="!form.advancedStyle.enabled" @input="handleChange" />
        </el-descriptions-item>
        <el-descriptions-item label="Radial R0">
          <el-input-number v-model="form.data.advancedStyle.params.radial.r0" :disabled="!form.advancedStyle.enabled" @input="handleChange" />
        </el-descriptions-item>
        <el-descriptions-item label="Radial X1">
          <el-input-number v-model="form.data.advancedStyle.params.radial.x1" :disabled="!form.advancedStyle.enabled" @input="handleChange" />
        </el-descriptions-item>
        <el-descriptions-item label="Radial Y1">
          <el-input-number v-model="form.data.advancedStyle.params.radial.y1" :disabled="!form.advancedStyle.enabled" @input="handleChange" />
        </el-descriptions-item>
        <el-descriptions-item label="Radial R1">
          <el-input-number v-model="form.data.advancedStyle.params.radial.r1" :disabled="!form.advancedStyle.enabled" @input="handleChange" />
        </el-descriptions-item>
      </template>
      <template v-if="form.data.advancedStyle.type === 'conic'">
        <el-descriptions-item label="Conic X">
          <el-input-number v-model="form.data.advancedStyle.params.conic.x" :disabled="!form.advancedStyle.enabled" @input="handleChange" />
        </el-descriptions-item>
        <el-descriptions-item label="Conic Y">
          <el-input-number v-model="form.data.advancedStyle.params.conic.y" :disabled="!form.advancedStyle.enabled" @input="handleChange" />
        </el-descriptions-item>
        <el-descriptions-item label="Conic StartAngle">
          <el-input-number v-model="form.data.advancedStyle.params.conic.startAngle" :disabled="!form.advancedStyle.enabled" @input="handleChange" />
        </el-descriptions-item>
      </template>
      <template v-if="form.data.advancedStyle.type === 'pattern'">
        <el-descriptions-item label="Image">
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
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-descriptions-item>
        <el-descriptions-item label="Repetition">
          <el-select v-model="form.data.advancedStyle.params.pattern.repetition" :disabled="!form.advancedStyle.enabled" placeholder="please select repetition" @change="handleChange">
            <el-option label="repeat" value="repeat" />
            <el-option label="repeat-x" value="repeat-x" />
            <el-option label="repeat-y" value="repeat-y" />
            <el-option label="no-repeat" value="no-repeat" />
          </el-select>
        </el-descriptions-item>
      </template>
    </el-descriptions>

    <el-descriptions title="Extra" :column="2" border>
      <template #title>
        <el-checkbox v-model="form.extra.enabled" @change="handleChangeExtraEnabled">Extra</el-checkbox>
      </template>
      <el-descriptions-item label="Mutation Observe">
        <el-switch v-model="form.data.mutationObserve" :disabled="!form.extra.enabled" active-text="Open" inactive-text="Close" @input="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Unique">
        <el-switch v-model="form.data.unique" :disabled="!form.extra.enabled" active-text="Yes" inactive-text="No" @change="handleChange" />
      </el-descriptions-item>
      <el-descriptions-item label="Auxiliary Line">
        <el-switch v-model="form.data.auxiliaryLine" :disabled="!form.extra.enabled" active-text="Yes" inactive-text="No" @change="handleChange" />
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, watch, ref } from 'vue'
import { cloneDeep, pick, defaultsDeep } from 'lodash'
import {
  defaultConfig,
  basicOptionKeys,
  positionOptionKeys,
  richTextOptionKeys,
  imageOptionKeys,
  styleOptionKeys,
  shadowOptionKeys,
  advancedStyleOptionKeys,
  extraOptionKeys
} from './config'
import { Plus } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
import type { UploadFile, UploadInstance, UploadRawFile } from 'element-plus'
import { loadImage } from '../../src/utils'
import { WatermarkOptions } from '../../src/types'

const props = defineProps({
  options: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['change'])

const form = reactive({
  data: {} as WatermarkOptions,
  position: {
    enabled: false
  },
  richText: {
    enabled: false
  },
  image: {
    enabled: false
  },
  style: {
    enabled: false
  },
  shadow: {
    enabled: false
  },
  advancedStyle: {
    enabled: false
  },
  extra: {
    enabled: false
  }
})

const uploadPatternImage = ref<UploadInstance>()
const uploadImage = ref<UploadInstance>()

onMounted(() => {
  form.data = reactive(
    defaultsDeep(
      cloneDeep(props.options),
      defaultConfig
    )
  )
  watch(form, handleChangeForm, {
    deep: true
  })
})

let eventFlag: NodeJS.Timeout

const handleChangeForm = (newVal: any) => {
  const outputData = {
    ...pick(newVal.data, basicOptionKeys),
    ...(newVal.position.enabled ? pick(newVal.data, positionOptionKeys) : null),
    ...(newVal.richText.enabled ? pick(newVal.data, richTextOptionKeys) : null),
    ...(newVal.image.enabled ? pick(newVal.data, imageOptionKeys) : null),
    ...(newVal.style.enabled ? pick(newVal.data, styleOptionKeys) : null),
    ...(newVal.shadow.enabled ? pick(newVal.data, shadowOptionKeys) : null),
    ...(newVal.advancedStyle.enabled ? pick(newVal.data, advancedStyleOptionKeys) : null),
    ...(newVal.extra.enabled ? pick(newVal.data, extraOptionKeys) : null)
  }
  // console.log(newVal)
  if (eventFlag) {
    clearTimeout(eventFlag)
  }
  eventFlag = setTimeout(() => {
    emit('change', outputData)
  }, 100)
}

const handleChange = () => {
}

const handleChangePositionEnabled = () => {
}

const handleChangeRichTextEnabled = () => {
}

const handleChangeImageEnabled = () => {
}

const handleChangeStyleEnabled = () => {
}

const handleChangeShadowEnabled = () => {
  if (form.shadow.enabled) {
  }
}

const handleChangeAdvancedStyleEnabled = () => {
}

const handleChangeExtraEnabled = () => {
}

const handleChangePatternImage = (uploadFile: UploadFile) => {
  if (uploadFile.url) {
    loadImage(uploadFile.url).then((res) => {
      form.data!.advancedStyle!.params!.pattern!.image = res
    })
  }
}

const handleExceedPatternImage = (files: File[]) => {
  uploadPatternImage.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadPatternImage.value!.handleStart(file)
}

const handleChangeImage = (uploadFile: UploadFile) => {
  if (uploadFile.url) {
    form.data!.image = uploadFile.url
  }
}

const handleExceedImage = (files: File[]) => {
  uploadImage.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadImage.value!.handleStart(file)
}
</script>

<style scoped>
:deep(table) {
  display: table;
  margin: 0;
}
.el-descriptions :deep(.el-descriptions__header) {
  margin-top: 10px;
  margin-bottom: 10px;
}

.upload-image :deep(ul) {
  padding-left: 0;
}

.upload-image :deep(.el-upload--picture-card) {
  --el-upload-picture-card-size: 60px;
}

.upload-image :deep(.el-upload-list--picture-card) {
  --el-upload-list-picture-card-size: 60px;
}
</style>
