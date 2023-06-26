---
layout: doc
---
# Image

<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { onMounted, ref } from 'vue';
import { ImageWatermark } from '../../src';
import imageSrc from '../public/image.png';

let watermark = null;
let imgDom = null;
const isFirst = ref(true);

onMounted(() => {
  imgDom = document.querySelector('.image');
  imgDom.addEventListener('load', () => {
    if (!isFirst.value) {
      return
    }
    watermark = new ImageWatermark({
      // content: 'my watermark',
      contentType: 'image',
      image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
      imageWidth: 200,
      width: imgDom.width,
      height: imgDom.height,
      dom: imgDom,
      rotate: 0,
      lineHeight: 50,
      translatePlacement: 'bottom-end',
      shadowStyle: {
        "shadowBlur": 10,
        "shadowColor": "#FFFFFFFF",
        "shadowOffsetX": 0,
        "shadowOffsetY": 0
      }
    });
    isFirst.value = false
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
