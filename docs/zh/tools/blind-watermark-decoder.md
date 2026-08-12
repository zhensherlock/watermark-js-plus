---
layout: doc
aside: false
pageClass: blind-watermark-decoder-page
description: 上传或粘贴图片，在浏览器中调整解码参数并显现其中的暗水印。
---
# 暗水印解码器

上传或粘贴一张包含暗水印的图片，然后调整参数以显现水印内容。

**相关内容：** [暗水印指南](/zh/guide/blind-watermark) · [解码参数](/zh/config/blind-decode)

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';
import { genFileId } from 'element-plus';
import type { UploadInstance, UploadProps, UploadRawFile, UploadUserFile } from 'element-plus';
import { BlindWatermark } from '../../../src';

const upload = ref<UploadInstance>();
const fileList = ref<UploadUserFile[]>([]);
const imageUrl = ref('');
const previewImageUrl = ref('');
const previewVisible = ref(false);
const theme = ref('light');
const compositeOperation = ref('overlay');
const compositeTimes = ref(4);
const fillColor = ref('#000');
const resultImageUrl = ref('');
const recognizedText = ref('');
const recognitionConfidence = ref(0);
const recognitionProgress = ref(0);
const recognitionCompleted = ref(false);
const recognizing = ref(false);
const recognitionError = ref('');
const copied = ref(false);
const watermarkCorrectionAngle = ref(45);

let decodeRequest = 0;
let recognitionRequest = 0;
let ocrWorker: import('tesseract.js').Worker | undefined;

const compositeOperations = [
  'source-over',
  'source-in',
  'source-out',
  'source-atop',
  'destination-over',
  'destination-in',
  'destination-out',
  'destination-atop',
  'lighter',
  'copy',
  'xor',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity'
];

const handleChangeImageSuccess: UploadProps['onChange'] = (uploadFile) => {
  const url = uploadFile.url;
  if (!url) {
    return;
  }
  updateImageUrl(url);
};

const replaceUploadFile = (file: UploadRawFile) => {
  previewImageUrl.value = '';
  previewVisible.value = false;
  upload.value?.clearFiles();
  file.uid = genFileId();
  upload.value?.handleStart(file);
};

const handleExceed: UploadProps['onExceed'] = (files) => {
  replaceUploadFile(files[0] as UploadRawFile);
};

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  previewImageUrl.value = uploadFile.url ?? '';
  previewVisible.value = Boolean(previewImageUrl.value);
};

const handleRemove: UploadProps['onRemove'] = () => {
  decodeRequest += 1;
  imageUrl.value = '';
  previewImageUrl.value = '';
  previewVisible.value = false;
  resultImageUrl.value = '';
  resetRecognition();
};

const updateImageUrl = (url: string) => {
  if (imageUrl.value !== url && imageUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(imageUrl.value);
  }
  imageUrl.value = url;
  handleDecode();
};

const handleChangeTheme = () => {
  if (theme.value === 'light') {
    compositeOperation.value = 'overlay';
    compositeTimes.value = 4;
    fillColor.value = '#000';
  } else {
    compositeOperation.value = 'overlay';
    compositeTimes.value = 3;
    fillColor.value = '#fff';
  }
  handleDecode();
};

const handleChangeCompositeOperation = () => {
  handleDecode();
};

const handleChangeCompositeTimes = () => {
  handleDecode();
};

const handleChangeFillColor = () => {
  handleDecode();
};

const handleDecode = () => {
  const requestId = ++decodeRequest;
  resultImageUrl.value = '';
  resetRecognition();
  BlindWatermark.decode({
    fillColor: fillColor.value,
    compositeTimes: compositeTimes.value,
    compositeOperation: compositeOperation.value,
    url: imageUrl.value,
    onSuccess: (imageBase64) => {
      if (requestId !== decodeRequest) {
        return;
      }
      resultImageUrl.value = imageBase64;
    }
  });
};

const resetRecognition = () => {
  recognitionRequest += 1;
  recognizedText.value = '';
  recognitionConfidence.value = 0;
  recognitionProgress.value = 0;
  recognitionCompleted.value = false;
  recognitionError.value = '';
  copied.value = false;
};

const prepareImageForOcr = (url: string, correctionAngle: number): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => {
      const maxDimension = 2400;
      const radians = correctionAngle * (Math.PI / 180);
      const absoluteCosine = Math.abs(Math.cos(radians));
      const absoluteSine = Math.abs(Math.sin(radians));
      const projectedWidth = image.width * absoluteCosine + image.height * absoluteSine;
      const projectedHeight = image.width * absoluteSine + image.height * absoluteCosine;
      const scale = Math.min(2, maxDimension / Math.max(projectedWidth, projectedHeight));
      const scaledWidth = image.width * scale;
      const scaledHeight = image.height * scale;
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.ceil(projectedWidth * scale));
      canvas.height = Math.max(1, Math.ceil(projectedHeight * scale));
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) {
        reject(new Error('无法为文字识别预处理图片。'));
        return;
      }
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(radians);
      context.drawImage(image, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
      context.resetTransform();
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      for (let index = 0; index < pixels.length; index += 4) {
        const grayscale = pixels[index] * 0.299 + pixels[index + 1] * 0.587 + pixels[index + 2] * 0.114;
        const contrasted = Math.max(0, Math.min(255, (grayscale - 128) * 1.4 + 128));
        pixels[index] = contrasted;
        pixels[index + 1] = contrasted;
        pixels[index + 2] = contrasted;
      }
      context.putImageData(imageData, 0, 0);

      const radius = 12;
      const threshold = 4;
      const stride = canvas.width + 1;
      const integral = new Uint32Array((canvas.width + 1) * (canvas.height + 1));
      for (let y = 1; y <= canvas.height; y += 1) {
        let rowTotal = 0;
        for (let x = 1; x <= canvas.width; x += 1) {
          rowTotal += pixels[((y - 1) * canvas.width + x - 1) * 4];
          integral[y * stride + x] = integral[(y - 1) * stride + x] + rowTotal;
        }
      }
      for (let y = 0; y < canvas.height; y += 1) {
        const top = Math.max(0, y - radius);
        const bottom = Math.min(canvas.height - 1, y + radius);
        for (let x = 0; x < canvas.width; x += 1) {
          const left = Math.max(0, x - radius);
          const right = Math.min(canvas.width - 1, x + radius);
          const area = (right - left + 1) * (bottom - top + 1);
          const localTotal =
            integral[(bottom + 1) * stride + right + 1] -
            integral[top * stride + right + 1] -
            integral[(bottom + 1) * stride + left] +
            integral[top * stride + left];
          const index = (y * canvas.width + x) * 4;
          const value = pixels[index] < localTotal / area - threshold ? 0 : 255;
          pixels[index] = value;
          pixels[index + 1] = value;
          pixels[index + 2] = value;
        }
      }
      context.putImageData(imageData, 0, 0);
      resolve(canvas);
    });
    image.addEventListener('error', () => reject(new Error('无法加载解码后的图片。')));
    image.src = url;
  });
};

const updateRecognitionProgress = (status: string, progress: number) => {
  const normalizedStatus = status.toLocaleLowerCase();
  let range: [number, number] | undefined;
  if (normalizedStatus.includes('loading tesseract core')) {
    range = [0, 10];
  } else if (normalizedStatus.includes('initializing tesseract')) {
    range = [10, 20];
  } else if (normalizedStatus.includes('loading language')) {
    range = [20, 40];
  } else if (normalizedStatus.includes('initializing api')) {
    range = [40, 50];
  } else if (normalizedStatus.includes('recognizing text')) {
    range = [50, 99];
  }
  if (!range) {
    return;
  }
  const nextProgress = Math.round(range[0] + progress * (range[1] - range[0]));
  recognitionProgress.value = Math.max(recognitionProgress.value, nextProgress);
};

const getOcrWorker = async () => {
  if (ocrWorker) {
    return ocrWorker;
  }
  const { createWorker, OEM, PSM } = await import('tesseract.js');
  ocrWorker = await createWorker(['chi_sim', 'eng'], OEM.LSTM_ONLY, {
    logger: ({ status, progress }) => {
      updateRecognitionProgress(status, progress);
    }
  });
  await ocrWorker.setParameters({
    tessedit_pageseg_mode: PSM.SPARSE_TEXT,
    preserve_interword_spaces: '1'
  });
  return ocrWorker;
};

const normalizeRecognizedLine = (text: string) => {
  return text.normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
};

const extractWatermarkText = (text: string, blocks: import('tesseract.js').Block[] | null) => {
  const seen = new Set<string>();
  const uniqueLines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => {
      const key = line.toLocaleLowerCase();
      if (!key || seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    })
  const repeatedLines = new Map<string, { count: number; text: string }>();
  text.split(/\r?\n/).forEach((line) => {
    const normalized = normalizeRecognizedLine(line);
    if (!normalized) {
      return;
    }
    const key = normalized.toLocaleLowerCase();
    const current = repeatedLines.get(key);
    repeatedLines.set(key, { count: (current?.count ?? 0) + 1, text: current?.text ?? normalized });
  });
  const repeated = Array.from(repeatedLines.values())
    .filter((line) => line.count >= 2)
    .sort((left, right) => {
      const leftScore = left.count * left.text.replace(/\s/g, '').length;
      const rightScore = right.count * right.text.replace(/\s/g, '').length;
      return rightScore - leftScore;
    })[0];

  const recognizedLines = (blocks ?? [])
    .flatMap((block) => block.paragraphs)
    .flatMap((paragraph) => paragraph.lines)
    .map((line) => ({
      ...line.bbox,
      confidence: line.confidence,
      text: normalizeRecognizedLine(line.text)
    }))
    .filter((line) => line.confidence >= 70 && line.text.length >= 2);
  const fragmentSupport = new Map<string, { count: number; confidence: number }>();
  recognizedLines.forEach((line) => {
    const key = line.text.toLocaleLowerCase().replace(/\s/g, '');
    const current = fragmentSupport.get(key);
    fragmentSupport.set(key, {
      count: (current?.count ?? 0) + 1,
      confidence: (current?.confidence ?? 0) + line.confidence
    });
  });

  const reconstructed = recognizedLines.flatMap((start) => {
    const candidates: string[] = [];
    const parts = [start.text];
    let current = start;
    for (let index = 0; index < 4; index += 1) {
      const center = (current.x0 + current.x1) / 2;
      const width = current.x1 - current.x0;
      const height = current.y1 - current.y0;
      const next = recognizedLines
        .filter((line) => {
          const gap = line.y0 - current.y1;
          const nextCenter = (line.x0 + line.x1) / 2;
          const nextWidth = line.x1 - line.x0;
          return (
            gap >= -2 &&
            gap <= Math.max(15, height * 0.6) &&
            Math.abs(nextCenter - center) <= Math.max(35, Math.max(width, nextWidth) * 0.25)
          );
        })
        .sort((left, right) => {
          const leftDistance = Math.abs((left.x0 + left.x1) / 2 - center);
          const rightDistance = Math.abs((right.x0 + right.x1) / 2 - center);
          return leftDistance - rightDistance;
        })[0];
      if (!next) {
        break;
      }
      parts.push(next.text);
      current = next;
      candidates.push(parts.join(''));
    }
    return candidates;
  });
  const bestReconstructed = Array.from(new Set(reconstructed))
    .map((candidate) => {
      const compact = candidate.toLocaleLowerCase().replace(/\s/g, '');
      let score = 0;
      fragmentSupport.forEach((support, fragment) => {
        if (compact.includes(fragment)) {
          score += fragment.length * support.count * (support.confidence / support.count / 100);
        }
      });
      return { score, text: candidate };
    })
    .sort((left, right) => right.score - left.score)[0];
  const repeatedScore = repeated
    ? repeated.count * repeated.text.replace(/\s/g, '').length
    : 0;
  if (bestReconstructed && bestReconstructed.score > repeatedScore) {
    return bestReconstructed.text;
  }
  return repeated?.text ?? uniqueLines.join('\n');
};

const handleRecognizeText = async () => {
  if (!resultImageUrl.value || recognizing.value) {
    return;
  }
  const requestId = ++recognitionRequest;
  recognizing.value = true;
  recognitionCompleted.value = false;
  recognitionError.value = '';
  recognitionProgress.value = 0;
  copied.value = false;
  try {
    const canvas = await prepareImageForOcr(resultImageUrl.value, watermarkCorrectionAngle.value);
    const worker = await getOcrWorker();
    const { data } = await worker.recognize(canvas, {}, { blocks: true });
    if (requestId !== recognitionRequest) {
      return;
    }
    recognizedText.value = extractWatermarkText(data.text, data.blocks);
    recognitionConfidence.value = Math.round(data.confidence);
    recognitionProgress.value = 100;
    recognitionCompleted.value = true;
  } catch (error) {
    if (requestId === recognitionRequest) {
      recognitionError.value = error instanceof Error ? error.message : '文字识别失败，请重试。';
    }
  } finally {
    recognizing.value = false;
  }
};

const handleCopyText = async () => {
  try {
    await navigator.clipboard.writeText(recognizedText.value);
    copied.value = true;
  } catch {
    recognitionError.value = '无法复制识别结果，请手动复制。';
  }
};

const handleClearRecognition = () => {
  resetRecognition();
};

const handlePaste = (event: ClipboardEvent) => {
  const imageItem = Array.from(event.clipboardData?.items ?? []).find(
    (item) => item.kind === 'file' && item.type.startsWith('image/')
  );
  const imageFile = imageItem?.getAsFile();
  if (!imageFile) {
    return;
  }
  event.preventDefault();
  replaceUploadFile(imageFile as UploadRawFile);
};

onMounted(() => {
  window.addEventListener('paste', handlePaste);
});

onUnmounted(() => {
  window.removeEventListener('paste', handlePaste);
  ocrWorker?.terminate();
  ocrWorker = undefined;
});
</script>

<div class="decoder-workbench">
  <div class="decoder-main">
    <div class="decoder-input-column">
      <section class="decoder-section upload-section" aria-labelledby="decode-image-title">
        <div class="section-header">
          <span class="section-index">01</span>
          <div>
            <h2 id="decode-image-title" class="section-title">原图</h2>
            <p class="section-description">拖入、选择或粘贴一张待解码图片。</p>
          </div>
        </div>
        <el-upload
          ref="upload"
          v-model:file-list="fileList"
          class="decode-uploader"
          :class="{ 'has-file': fileList.length }"
          drag
          list-type="picture-card"
          accept="image/*"
          :auto-upload="false"
          :limit="1"
          :on-change="handleChangeImageSuccess"
          :on-exceed="handleExceed"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
        >
          <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
          <div class="el-upload__text">
            将图片拖到此处或<em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">仅支持图片 · 也可按 Ctrl+V 或 Cmd+V 粘贴上传</div>
          </template>
        </el-upload>
        <el-dialog v-model="previewVisible">
          <img class="preview-dialog-image" :src="previewImageUrl" alt="图片预览" />
        </el-dialog>
      </section>
      <section class="decoder-section" aria-labelledby="decode-options-title">
        <div class="section-header">
          <span class="section-index">02</span>
          <div>
            <h2 id="decode-options-title" class="section-title">解码参数</h2>
            <p class="section-description">修改参数后，右侧结果会自动刷新。</p>
          </div>
        </div>
        <div class="decode-form">
          <div class="control-field control-field--wide">
            <div class="control-label">
              <span>图片背景</span>
              <code>theme</code>
            </div>
            <el-radio-group v-model="theme" aria-label="图片背景" @change="handleChangeTheme">
              <el-radio-button label="浅色" value="light" />
              <el-radio-button label="深色" value="dark" />
            </el-radio-group>
          </div>
          <div class="control-field control-field--wide">
            <div class="control-label">
              <span>合成模式</span>
              <code>compositeOperation</code>
            </div>
            <el-select
              v-model="compositeOperation"
              aria-label="合成模式"
              filterable
              placeholder="请选择合成模式"
              @change="handleChangeCompositeOperation"
            >
              <el-option v-for="item in compositeOperations" :key="item" :label="item" :value="item" />
            </el-select>
          </div>
          <div class="control-field">
            <div class="control-label">
              <span>合成次数</span>
              <code>compositeTimes</code>
            </div>
            <el-input-number
              v-model="compositeTimes"
              aria-label="合成次数"
              @change="handleChangeCompositeTimes"
            />
          </div>
          <div class="control-field">
            <div class="control-label">
              <span>填充颜色</span>
              <code>fillColor</code>
            </div>
            <div class="color-control">
              <el-color-picker
                v-model="fillColor"
                aria-label="填充颜色"
                :clearable="false"
                @change="handleChangeFillColor"
              />
              <span>{{ fillColor }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="decoder-section decoder-result-section" aria-labelledby="decode-result-title">
      <div class="section-header">
        <span class="section-index">03</span>
        <div>
          <h2 id="decode-result-title" class="section-title">解码结果</h2>
          <p class="section-description">点击结果可查看原始尺寸。</p>
        </div>
      </div>
      <div class="decoded-stage">
        <el-image
          v-if="resultImageUrl"
          class="decoded-image"
          :src="resultImageUrl"
          :preview-src-list="[resultImageUrl]"
          alt="解码后的图片"
          fit="contain"
        />
        <el-empty v-else description="上传图片后即可查看解码结果" />
      </div>
    </section>
  </div>
  <section class="decoder-section recognition-section" aria-labelledby="recognition-title">
    <div class="section-header">
      <span class="section-index">04</span>
      <div>
        <h2 id="recognition-title" class="section-title">识别水印文字</h2>
        <p class="section-description">将解码结果校正角度后，在浏览器本地运行 OCR。</p>
      </div>
    </div>
    <div class="recognition-layout">
      <div class="recognition-controls">
        <p class="recognition-tip">
          将解码图片旋转至水印文字水平，可以让 OCR 忽略倾斜后的原图文字，优先识别水印。默认 45° 校正对应本库的默认水印旋转角度。
        </p>
        <div class="recognition-options">
          <span>水印校正角度</span>
          <el-input-number
            v-model="watermarkCorrectionAngle"
            aria-label="水印校正角度"
            :min="-180"
            :max="180"
            @change="resetRecognition"
          />
        </div>
        <p class="recognition-tip">识别过程仅在浏览器本地运行，首次使用时需要下载中英文 OCR 模型。</p>
        <el-button
          type="primary"
          :disabled="!resultImageUrl || recognizing"
          :loading="recognizing"
          @click="handleRecognizeText"
        >
          识别文字
        </el-button>
      </div>
      <div class="recognition-output" aria-live="polite">
        <el-progress
          v-if="recognizing"
          class="recognition-progress"
          :percentage="recognitionProgress"
          :status="recognitionProgress === 100 ? 'success' : undefined"
        />
        <el-alert
          v-if="recognitionError"
          class="recognition-alert"
          :title="recognitionError"
          type="error"
          :closable="false"
          show-icon
        />
        <div v-if="recognizedText" class="recognition-result">
          <el-input v-model="recognizedText" type="textarea" :rows="6" aria-label="识别出的水印文字" />
          <div class="recognition-meta">置信度：{{ recognitionConfidence }}%</div>
          <el-space>
            <el-button @click="handleCopyText">{{ copied ? '已复制' : '复制文字' }}</el-button>
            <el-button @click="handleClearRecognition">清空</el-button>
          </el-space>
        </div>
        <el-empty
          v-else-if="recognitionCompleted"
          description="未识别到文字，请调整解码参数后重新识别。"
        />
        <div v-else-if="!recognizing && !recognitionError" class="recognition-placeholder">
          完成解码后，可从这里启动 OCR 并查看识别结果。
        </div>
      </div>
    </div>
  </section>
</div>

<el-backtop></el-backtop>

<style scoped>
.decoder-workbench {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  margin-top: 28px;
  overflow: hidden;
}
.decoder-main {
  display: grid;
  grid-template-columns: minmax(340px, 0.82fr) minmax(0, 1.18fr);
}
.decoder-input-column,
.decoder-result-section {
  min-width: 0;
}
.decoder-result-section {
  border-left: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
}
.decoder-section {
  padding: 24px;
}
.decoder-input-column .decoder-section + .decoder-section,
.recognition-section {
  border-top: 1px solid var(--vp-c-divider);
}
.section-header {
  align-items: flex-start;
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}
.section-index {
  color: var(--el-color-primary);
  flex: 0 0 auto;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  line-height: 24px;
}
.section-title {
  border: 0;
  color: var(--el-text-color-primary);
  font-size: 16px;
  font-weight: 650;
  line-height: 24px;
  margin: 0;
  padding: 0;
}
.section-description {
  color: var(--el-text-color-secondary);
  font-size: 13px;
  line-height: 20px;
  margin: 2px 0 0;
}
.decode-uploader {
  display: block;
  width: 100%;
}
.decode-uploader :deep(.el-upload-list--picture-card) {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  list-style: none;
  margin: 0;
  padding-left: 0;
}
.decode-uploader :deep(.el-upload--picture-card) {
  background: transparent;
  border: 0;
  height: 200px;
  margin: 0;
  width: 100%;
}
.decode-uploader.has-file :deep(.el-upload--picture-card) {
  display: none;
}
.decode-uploader :deep(.el-upload-dragger) {
  height: 200px;
  padding: 40px 16px;
  width: 100%;
}
.decode-uploader :deep(.el-upload-list__item) {
  background: var(--vp-c-bg-soft);
  height: 200px;
  margin: 0;
  width: 100%;
}
.decode-uploader :deep(.el-upload-list__item-thumbnail) {
  display: block;
  margin: 0;
  object-fit: contain;
}
.decode-uploader :deep(.el-upload__tip) {
  color: var(--el-text-color-secondary);
  line-height: 20px;
  margin-top: 8px;
}
.preview-dialog-image {
  display: block;
  max-height: 70vh;
  object-fit: contain;
  width: 100%;
}
.decode-form {
  display: grid;
  gap: 18px 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.control-field {
  min-width: 0;
}
.control-field--wide {
  grid-column: 1 / -1;
}
.control-label {
  align-items: center;
  color: var(--el-text-color-primary);
  display: flex;
  font-size: 13px;
  font-weight: 600;
  gap: 8px;
  justify-content: space-between;
  line-height: 20px;
  margin-bottom: 7px;
}
.control-label code {
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  color: var(--el-text-color-secondary);
  font-size: 11px;
  font-weight: 500;
  padding: 1px 5px;
}
.control-field:not(.control-field--wide) .control-label {
  align-items: flex-start;
  flex-direction: column;
  gap: 2px;
}
.control-field :deep(.el-select),
.control-field :deep(.el-input-number) {
  width: 100%;
}
.color-control {
  align-items: center;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  box-sizing: border-box;
  color: var(--el-text-color-regular);
  display: flex;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  gap: 0;
  height: 32px;
  padding: 0;
  transition: border-color var(--el-transition-duration-fast);
}
.color-control:focus-within {
  border-color: var(--el-color-primary);
}
.color-control > span {
  flex: 1;
  padding: 0 10px;
}
.color-control :deep(.el-color-picker) {
  display: flex;
  flex: 0 0 48px;
  height: 30px;
  width: 48px;
}
.color-control :deep(.el-color-picker__trigger) {
  border: 0;
  border-radius: calc(var(--el-border-radius-base) - 1px) 0 0
    calc(var(--el-border-radius-base) - 1px);
  border-right: 1px solid var(--el-border-color);
  height: 30px;
  justify-content: flex-start;
  padding: 5px 6px;
  transition:
    background-color var(--el-transition-duration-fast),
    border-color var(--el-transition-duration-fast);
  width: 48px;
}
.color-control :deep(.el-color-picker__color) {
  flex: 0 0 20px;
  height: 20px;
  position: static;
  width: 20px;
}
.color-control :deep(.el-color-picker__color-inner) {
  height: 100%;
  position: static;
  width: 100%;
}
.color-control :deep(.el-color-picker__icon) {
  color: var(--el-text-color-secondary);
  font-size: 10px;
  position: absolute;
  right: 5px;
}
.color-control :deep(.el-color-picker:hover .el-color-picker__trigger) {
  background: var(--el-fill-color-light);
  border-right-color: var(--el-border-color-hover);
}
.color-control :deep(.el-color-picker:focus-visible .el-color-picker__trigger) {
  outline: none;
}
.decoded-stage {
  align-items: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  display: flex;
  flex: 1;
  justify-content: center;
  min-height: 518px;
  overflow: hidden;
  padding: 16px;
}
.decoded-image {
  display: block;
  flex: 1;
  height: auto;
  min-height: 486px;
  width: 100%;
}
.recognition-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
}
.recognition-controls {
  padding-right: 28px;
}
.recognition-output {
  border-left: 1px solid var(--vp-c-divider);
  min-height: 190px;
  padding-left: 28px;
}
.recognition-tip,
.recognition-meta {
  color: var(--el-text-color-secondary);
}
.recognition-tip {
  margin: 0 0 12px;
}
.recognition-options {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
}
.recognition-progress,
.recognition-alert,
.recognition-result {
  margin-bottom: 16px;
}
.recognition-meta {
  font-size: 14px;
  margin: 8px 0 12px;
}
.recognition-placeholder {
  align-items: center;
  color: var(--el-text-color-secondary);
  display: flex;
  font-size: 13px;
  justify-content: center;
  line-height: 22px;
  min-height: 190px;
  text-align: center;
}
@media (max-width: 960px) {
  .decoder-main {
    grid-template-columns: 1fr;
  }
  .decoder-result-section {
    border-left: 0;
    border-top: 1px solid var(--vp-c-divider);
  }
  .decoded-stage {
    min-height: 420px;
  }
  .decoded-image {
    min-height: 388px;
  }
}
@media (max-width: 640px) {
  .decoder-workbench {
    border-left: 0;
    border-radius: 0;
    border-right: 0;
    margin-left: -24px;
    margin-right: -24px;
  }
  .decoder-section {
    padding: 20px 24px;
  }
  .decode-form,
  .recognition-layout {
    grid-template-columns: 1fr;
  }
  .control-field--wide {
    grid-column: auto;
  }
  .recognition-controls {
    padding-right: 0;
  }
  .recognition-output {
    border-left: 0;
    border-top: 1px solid var(--vp-c-divider);
    margin-top: 24px;
    min-height: 160px;
    padding-left: 0;
    padding-top: 24px;
  }
  .recognition-placeholder {
    min-height: 120px;
  }
  .decoded-stage {
    min-height: 320px;
  }
  .decoded-image {
    min-height: 288px;
  }
}
</style>
