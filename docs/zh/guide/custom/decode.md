---
layout: doc
---
# 解析配置

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Plus, Warning } from '@element-plus/icons-vue'; 
import { BlindWatermark } from '../../../../src';

const imageUrl = ref('');
const theme = ref('light');
const compositeOperation = ref('overlay');
const compositeTimes = ref(4);
const fillColor = ref('#000');
const resultImageUrl = ref('');

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

onMounted(() => {
});

const handleChangeImageSuccess = (uploadFile) => {
  imageUrl.value = uploadFile.url;
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
  BlindWatermark.decode({
    fillColor: fillColor.value,
    compositeTimes: compositeTimes.value,
    compositeOperation: compositeOperation.value,
    url: imageUrl.value,
    onSuccess: (imageBase64) => {
      resultImageUrl.value = imageBase64;
    }
  });
};
</script>

<div>
  <div class="title">原图</div>
  <el-space>
    <el-upload
      style="display: inline-block"
      list-type="picture-card"
      accept="image/*"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleChangeImageSuccess"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>
    <el-image
      v-if="imageUrl"
      style="width: 148px; height: 148px"
      :src="imageUrl"
      :preview-src-list="[imageUrl]"
    />
  </el-space>
  <div class="title">参数</div>

  <el-descriptions :column="1" border>
    <el-descriptions-item label="Theme">
      <el-radio-group v-model="theme" @change="handleChangeTheme">
        <el-radio-button label="Light" value="light" />
        <el-radio-button label="Dark" value="dark" />
      </el-radio-group>
    </el-descriptions-item>
    <el-descriptions-item label="CompositeOperation">
      <el-select style="width: 400px" v-model="compositeOperation" filterable placeholder="please input composite operation" @change="handleChangeCompositeOperation">
        <el-option v-for="item in compositeOperations" :key="item" :label="item" :value="item" />
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item label="CompositeTimes">
      <el-input-number v-model="compositeTimes" @change="handleChangeCompositeTimes" />
    </el-descriptions-item>
    <el-descriptions-item label="FillColor">
      <el-color-picker v-model="fillColor" @change="handleChangeFillColor" />
    </el-descriptions-item>
  </el-descriptions>

  <div class="title">结果</div>
  <el-image
    style="width: 400px; height: 400px"
    :src="resultImageUrl"
    :preview-src-list="[resultImageUrl]"
    fit="cover"
  />
</div>

<el-backtop></el-backtop>

<style scoped>
.title {
  color: var(--el-text-color-primary);
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}
</style>
