---
layout: doc
---
# Watemark

<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { ref, getCurrentInstance } from 'vue';
import { Watermark } from '../../src';
import { useData } from 'vitepress';

const { isDark } = useData();
const decodeBlindImage = ref('');
const app = getCurrentInstance();

// text watermark
const textWatermark = new Watermark({
  content: 'hello my text watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: 'The text watermark added successfully!',
      type: 'success'
    });
  }
});
const handleAddTextWatermark = () => {
  if (isDark.value) {
    textWatermark.options.fontColor = '#fff'
  }
  textWatermark.create();
};
const handleRemoveTextWatermark = () => {
  textWatermark.destroy();
};

// multiline text watermark
const multiLineTextWatermark = new Watermark({
  contentType: 'multi-line-text',
  content: 'hello my multi text watermark',
  fontSize: 30,
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: 'The multi text watermark added successfully!',
      type: 'success'
    });
  }
});
const handleAddMultiLineTextWatermark = () => {
  if (isDark.value) {
    multiLineTextWatermark.options.fontColor = '#fff'
  }
  multiLineTextWatermark.create();
};
const handleRemoveMultiLineTextWatermark = () => {
  multiLineTextWatermark.destroy();
};

// image watermark
const imageWatermark = new Watermark({
  contentType: 'image',
  image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
  imageWidth: 200,
  // imageHeight: 20,
  width: 300,
  height: 300,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: 'The image watermark added successfully!',
      type: 'success'
    });
  }
});
const handleAddImageWatermark = () => {
  imageWatermark.create();
};
const handleRemoveImageWatermark = () => {
  imageWatermark.destroy();
};

// rich text watermark
const richTextWatermark = new Watermark({
  contentType: 'rich-text',
  content: '<div style="background: #ccc;">The watermark is so <span style="color: #f00">nice</span>.</div>',
  width: 300,
  height: 300,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: 'The rich text watermark added successfully！',
      type: 'success'
    });
  }
});
const handleAddRichTextWatermark = () => {
  richTextWatermark.create();
};
const handleRemoveRichTextWatermark = () => {
  richTextWatermark.destroy();
};
</script>

## Text Watermark

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
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
<el-space>
  <VPButton text="Add Text Watermark" @click="handleAddTextWatermark"></VPButton>
  <VPButton text="Remove Text Watermark" @click="handleRemoveTextWatermark"></VPButton>
</el-space>

## Multiline Text Watermark

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
  contentType: 'multi-line-text',
  content: 'hello my watermark watermark',
  fontSize: 30,
  width: 200,
  height: 200,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<el-space>
  <VPButton text="Add MultiLine Text Watermark" @click="handleAddMultiLineTextWatermark"></VPButton>
  <VPButton text="Remove MultiLine Text Watermark" @click="handleRemoveMultiLineTextWatermark"></VPButton>
</el-space>

## Image Watermark

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
  contentType: 'image',
  content: 'http://upic-service.test.upcdn.net/uPic/github-JxMIKf.png',
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
<el-space>
  <VPButton text="Add Image Watermark" @click="handleAddImageWatermark"></VPButton>
  <VPButton text="Remove Image Watermark" @click="handleRemoveImageWatermark"></VPButton>
</el-space>

## Rich Text Watermark

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
  contentType: 'rich-text',
  content: '<div style="background: #ccc;">Rich text watermark is so <span style="color: #f00">nice</span></div>',
  width: 300,
  height: 300,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<el-space>
  <VPButton text="Add Rich Text Watermark" @click="handleAddRichTextWatermark"></VPButton>
  <VPButton text="Remove Rich Text Watermark" @click="handleRemoveRichTextWatermark"></VPButton>
</el-space>
