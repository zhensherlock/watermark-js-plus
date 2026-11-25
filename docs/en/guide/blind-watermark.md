---
layout: doc
description: Create low-opacity blind watermarks and reveal them from screenshots or images with the BlindWatermark API.
---
# Blind Watermark

<script setup lang="ts">
import { ElAffix, ElMessage, ElSpace } from 'element-plus';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { getCurrentInstance } from 'vue';
import dayjs from 'dayjs';
import { useData } from 'vitepress';
import { useAppStore } from '../../.vitepress/stores/app';

const appStore = useAppStore();
const { isDark } = useData();
const app = getCurrentInstance();

const handleAddTextBlindWatermark = () => {
  appStore.createWatermark({
    content: 'hello my watermark',
    fontColor: isDark.value ? '#fff' : '#000',
    width: 200,
    height: 200,
    onSuccess: () => {
      ElMessage({
        appendTo: '#app',
        message: 'The text blind watermark added successfully!',
        type: 'success'
      }, app?.appContext);
    }
  }, 'blind')
};
const handleUpdateTextBlindWatermark = () => {
  appStore.changeWatermark({
    content: 'update my text blind watermark at ' + dayjs().format('HH:mm:ss'),
    fontColor: isDark.value ? '#fff' : '#000'
  });
};
const handleRemoveTextBlindWatermark = () => {
  appStore.removeWatermark();
};

const handleAddMultiLineTextBlindWatermark = () => {
  appStore.createWatermark({
    contentType: 'multi-line-text',
    content: 'hello my multiline blind watermark',
    fontColor: isDark.value ? '#fff' : '#000',
    fontSize: '30px',
    width: 200,
    height: 200,
    onSuccess: () => {
      ElMessage({
        appendTo: '#app',
        message: 'The multiline text blind watermark added successfully!',
        type: 'success'
      }, app?.appContext);
    }
  }, 'blind')
};
const handleRemoveMultiLineTextBlindWatermark = () => {
  appStore.removeWatermark();
};

const handleAddImageBlindWatermark = () => {
  appStore.createWatermark({
    contentType: 'image',
    image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
    imageWidth: 200,
    // imageHeight: 20,
    width: 300,
    height: 300,
    onSuccess: () => {
      ElMessage({
        appendTo: '#app',
        message: 'The image blind watermark added successfully!',
        type: 'success'
      }, app?.appContext);
    }
  }, 'blind')
};
const handleRemoveImageBlindWatermark = () => {
  appStore.removeWatermark();
};

const handleAddRichTextBlindWatermark = () => {
  appStore.createWatermark({
    contentType: 'rich-text',
    content: '<div><span style="color: #f00">good</span> watermark</div>',
    width: 300,
    height: 300,
    onSuccess: () => {
      ElMessage({
        appendTo: '#app',
        message: 'The rich text blind watermark added successfully!',
        type: 'success'
      }, app?.appContext);
    }
  }, 'blind')
};
const handleRemoveRichTextBlindWatermark = () => {
  appStore.removeWatermark();
};

</script>

<el-backtop></el-backtop>

`BlindWatermark` inherits the content, layout, and lifecycle capabilities of `Watermark`, but always uses `globalAlpha: 0.005` and `mode: 'blind'`. See [BlindWatermark options](/config/blind) for the exact enforced values.

## Text Blind Watermark

<div class="text-blind-watermark">

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new BlindWatermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
👉 Add parameters for dark background：`fontColor: '#fff'`
<el-affix target=".text-blind-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="Add Text Blind Watermark" @click="handleAddTextBlindWatermark"></VPButton>
    <VPButton text="Update Text Blind Watermark" @click="handleUpdateTextBlindWatermark"></VPButton>
    <VPButton text="Remove Text Blind Watermark" @click="handleRemoveTextBlindWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## Multiline Text Blind Watermark

<div class="multiline-text-blind-watermark">

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new BlindWatermark({
  contentType: 'multi-line-text',
  content: 'hello my multiline blind watermark',
  fontSize: '30px',
  width: 200,
  height: 200,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
👉 Add parameters for dark background：`fontColor: '#fff'`
<el-affix target=".multiline-text-blind-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="Add Multiline Text Blind Watermark" @click="handleAddMultiLineTextBlindWatermark"></VPButton>
    <VPButton text="Remove Multiline Text Blind Watermark" @click="handleRemoveMultiLineTextBlindWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## Image Blind Watermark

<div class="image-blind-watermark">

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new BlindWatermark({
  contentType: 'image',
  image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
  width: 300,
  height: 300,
  imageWidth: 100, // image width
  // imageHeight: 20, // image height
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<el-affix target=".image-blind-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="Add Image Blind Watermark" @click="handleAddImageBlindWatermark"></VPButton>
    <VPButton text="Remove Image Blind Watermark" @click="handleRemoveImageBlindWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## Rich Text Blind Watermark

<div class="rich-text-blind-watermark">

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new BlindWatermark({
  contentType: 'rich-text',
  content: '<div><span style="color: #f00">good</span> watermark</div>',
  width: 300,
  height: 300,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<el-affix target=".rich-text-blind-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="Add RichText Blind Watermark" @click="handleAddRichTextBlindWatermark"></VPButton>
    <VPButton text="Remove Rich Text Blind Watermark" @click="handleRemoveRichTextBlindWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## Decode Blind Watermark

For the easiest workflow, open the [Blind Watermark Decoder](/tools/blind-watermark-decoder) to upload or paste an image, adjust the decode options, and preview the result.

Use `BlindWatermark.decode` when you need to integrate decoding into your own application. See [decode options](/config/blind-decode) for all available parameters.

The decoder loads the source image into a Canvas, repeatedly applies the selected composite operation and fill color, then returns the enhanced image as a PNG Data URL.

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

BlindWatermark.decode({
  compositeOperation: 'overlay',
  compositeTimes: 4,
  url: uploadFile.url, // image url
  onSuccess: (imageBase64) => {
    // success callback
  }
})
```
