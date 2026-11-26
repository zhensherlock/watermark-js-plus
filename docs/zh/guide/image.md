---
layout: doc
description: 使用 ImageWatermark API 将文本或图片水印直接绘制到浏览器中的现有图片。
---
# 图片水印

<script setup lang="ts">
import { ElAffix, ElSpace } from 'element-plus';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { onMounted, ref } from 'vue';
import { ImageWatermark } from '../../../src';
import imageSrc from '../../public/image.png';

let textWatermark = null;
let textWatermarkImgDom = null;
const textWatermarkIsFirst = ref(true);
let imageWatermark = null;
let imageWatermarkImgDom = null;
const imageWatermarkIsFirst = ref(true);

onMounted(() => {
  // text watermark
  textWatermarkImgDom = document.querySelector('.text-watermark-image');
  textWatermarkImgDom.addEventListener('load', () => {
    if (!textWatermarkIsFirst.value) {
      return
    }
    textWatermark = new ImageWatermark({
      content: 'my text watermark',
      width: textWatermarkImgDom.width,
      height: textWatermarkImgDom.height,
      dom: textWatermarkImgDom,
      rotate: 0,
      translatePlacement: 'bottom-end',
      fontColor: '#fff',
      globalAlpha: 0.5,
      fontSize: '30px'
    });
    textWatermarkIsFirst.value = false
  })

  // image watermark
  imageWatermarkImgDom = document.querySelector('.image-watermark-image');
  imageWatermarkImgDom.addEventListener('load', () => {
    if (!imageWatermarkIsFirst.value) {
      return
    }
    imageWatermark = new ImageWatermark({
      contentType: 'image',
      image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
      imageWidth: 200,
      width: imageWatermarkImgDom.width,
      height: imageWatermarkImgDom.height,
      dom: imageWatermarkImgDom,
      rotate: 0,
      translatePlacement: 'bottom-end'
    });
    imageWatermarkIsFirst.value = false
  });
});

const handleAddTextWatermark = () => {
  textWatermark.create();
};
const handleRemoveTextWatermark = () => {
  textWatermark.destroy();
};

const handleAddImageWatermark = () => {
  imageWatermark.create();
};
const handleRemoveImageWatermark = () => {
  imageWatermark.destroy();
};
</script>

<el-backtop></el-backtop>

精确的 API 说明参见 [ImageWatermark 配置项](/zh/config/#image-watermark-options)及 [Watermark 方法](/zh/config/function)中的适用方法。

如果水印图片加载失败，`create()` 返回的 Promise 会被拒绝，且不会修改目标图片。请捕获错误后重试，或改用其他水印图片。

## 文本水印

<div class="text-card">

```html
<img class="text-watermark-image" src="https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/402413381-a24bd4a5-c4e0-45d6-b8ce-94e99e29a111-dowV4C.png" crossorigin="anonymous">
```

```js
import { ImageWatermark } from 'watermark-js-plus' // import watermark plugin

const imgDom = document.querySelector('.text-watermark-image');
await imgDom.decode()

const watermark = new ImageWatermark({
  content: 'my text watermark',
  width: imgDom.width,
  height: imgDom.height,
  dom: imgDom,
  rotate: 0,
  translatePlacement: 'bottom-end',
  fontColor: '#fff',
  globalAlpha: 0.5,
  fontSize: '30px',
  crossOrigin: true
})

await watermark.create() // 添加水印

watermark.destroy() // 删除水印
```

<div>
  <img class="text-watermark-image" :src="imageSrc">
</div>
<el-affix target=".text-card" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="Add Text Watermark" @click="handleAddTextWatermark"></VPButton>
    <VPButton text="Remove Text Watermark" @click="handleRemoveTextWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## 图片水印

<div class="image-card">

```html
<img class="image-watermark-image" src="https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/402413381-a24bd4a5-c4e0-45d6-b8ce-94e99e29a111-dowV4C.png" crossorigin="anonymous">
```

```js
import { ImageWatermark } from 'watermark-js-plus' // import watermark plugin

const imgDom = document.querySelector('.image-watermark-image');
await imgDom.decode()

const watermark = new ImageWatermark({
  contentType: 'image',
  image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
  imageWidth: 200,
  width: imgDom.width,
  height: imgDom.height,
  dom: imgDom,
  rotate: 0,
  translatePlacement: 'bottom-end',
  crossOrigin: true
})

await watermark.create() // 添加水印

watermark.destroy() // 删除水印
```

<div>
  <img class="image-watermark-image" :src="imageSrc">
</div>
<el-affix target=".image-card" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="Add Image Watermark" @click="handleAddImageWatermark"></VPButton>
    <VPButton text="Remove Image Watermark" @click="handleRemoveImageWatermark"></VPButton>
  </el-space>
</el-affix>
</div>
