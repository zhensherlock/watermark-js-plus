---
layout: doc
---
# 图片水印

<script setup lang="ts">
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

## 文本水印

<div class="text-card">

```html
<img class="text-watermark-image">
```

```js
import { ImageWatermark } from 'watermark-js-plus' // import watermark plugin

const imgDom = document.querySelector('.text-watermark-image');

const watermark = new ImageWatermark({
  content: 'my text watermark',
  width: imgDom.width,
  height: imgDom.height,
  dom: imgDom,
  rotate: 0,
  translatePlacement: 'bottom-end',
  fontColor: '#fff',
  globalAlpha: 0.5,
  fontSize: '30px'
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
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
<img class="image-watermark-image">
```

```js
import { ImageWatermark } from 'watermark-js-plus' // import watermark plugin

const imgDom = document.querySelector('.image-watermark-image');

const watermark = new ImageWatermark({
  contentType: 'image',
  image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
  imageWidth: 200,
  width: imgDom.width,
  height: imgDom.height,
  dom: imgDom,
  rotate: 0,
  translatePlacement: 'bottom-end'
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
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

