---
layout: doc
---
# 图片水印

<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { onMounted } from 'vue';
import { ImageWatermark } from '../../../src';

let watermark = null;
let imgDom = null;
onMounted(() => {
  imgDom = document.querySelector('.image');
  watermark = new ImageWatermark({
    content: 'my watermark',
    width: 100,
    height: 100,
    dom: imgDom
  });
});

const handleAddWatermark = () => {
  watermark.create();
};
const handleRemoveWatermark = () => {
  watermark.destroy();
};
</script>
<div>
  <img class="image" src="/watermark-js-plus/public/image.png" >
</div>
<el-space style="margin-top: 10px;">
  <VPButton text="添加水印" @click="handleAddWatermark"></VPButton>
  <VPButton text="删除水印" @click="handleRemoveWatermark"></VPButton>
</el-space>
