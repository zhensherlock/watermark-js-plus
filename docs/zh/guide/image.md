---
layout: doc
---
# 图片水印

<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { onMounted, ref } from 'vue';
import { ImageWatermark } from '../../../src';
import imageSrc from '../../public/image.png';

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
      translatePlacement: 'bottom-end'
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
```html
<img class="image">
```

```js
import { ImageWatermark } from 'watermark-js-plus' // 引入水印插件

const imgDom = document.querySelector('.image');

const watermark = new ImageWatermark({
  // content: 'my watermark',
  contentType: 'image',
  image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
  imageWidth: 200,
  width: imgDom.width,
  height: imgDom.height,
  dom: imgDom,
  rotate: 0,
  translatePlacement: 'bottom-end'
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<div>
  <img class="image" :src="imageSrc">
</div>
<el-space style="margin-top: 10px;">
  <VPButton text="添加水印" @click="handleAddWatermark"></VPButton>
  <VPButton text="删除水印" @click="handleRemoveWatermark"></VPButton>
</el-space>
