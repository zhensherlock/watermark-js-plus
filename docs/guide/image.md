---
layout: doc
---
# Image

<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { onMounted } from 'vue';
import { ImageWatermark } from '../../src';
import imageSrc from '../public/image.png';

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
  <img class="image" :src="imageSrc" >
</div>
<el-space style="margin-top: 10px;">
  <VPButton text="Add Watermark" @click="handleAddWatermark"></VPButton>
  <VPButton text="Remove Watermark" @click="handleRemoveWatermark"></VPButton>
</el-space>
