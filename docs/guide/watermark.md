---
layout: doc
---
# Watermark

<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { ref, getCurrentInstance, onMounted } from 'vue';
import { Watermark } from '../../src';
import { useData } from 'vitepress';

const { isDark } = useData();
const decodeBlindImage = ref('');
const app = getCurrentInstance();

let textWatermark = null;
let multiLineTextWatermark = null;
let imageWatermark = null;
let richTextWatermark = null;
// child element watermark
let childElementWatermark = null

onMounted(() => {
  // text watermark
  textWatermark = new Watermark({
    content: 'hello my text watermark',
    width: 200,
    height: 200,
    layout: 'grid',
    gridLayoutOptions: {
      rows: 2,
      cols: 2,
      gap: [100, 100],
      matrix: [[1, 0], [0, 1]]
    },
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: 'The text watermark added successfully!',
        type: 'success'
      });
    }
  });  
  // multiline text watermark
  multiLineTextWatermark = new Watermark({
    contentType: 'multi-line-text',
    content: 'hello my multi text watermark',
    fontSize: '30px',
    width: 200,
    height: 200,
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: 'The multi text watermark added successfully!',
        type: 'success'
      });
    }
  });
  // image watermark
  imageWatermark = new Watermark({
    contentType: 'image',
    image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
    imageWidth: 200,
    // imageHeight: 20,
    width: 300,
    height: 300,
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: 'The image watermark added successfully!',
        type: 'success'
      });
    }
  });
  // rich text watermark
  richTextWatermark = new Watermark({
    contentType: 'rich-text',
    content: '<div style="background: #ccc;">The watermark is so <span style="color: #f00">nice</span>.</div>',
    width: 300,
    height: 300,
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: 'The rich text watermark added successfully！',
        type: 'success'
      });
    }
  });
  childElementWatermark = new Watermark({
    parent: '.parent-element',
    
    // textRowMaxWidth: 200,

    content: '123456789123456789123456789123456789',

    // contentType: 'multi-line-text',
    // content: 'hello my watermark watermark watermark',
    // fontSize: '30px',

    // contentType: 'image',
    // image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
    // imageWidth: 100,

    // contentType: 'rich-text',
    // content: '<div style="background: #ccc;">Rich text watermark is so <span style="color: #f00">nice</span></div>',

    width: 300,
    height: 300,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '100% 100%',
    translatePlacement: 'top',
    // translateX: 100,
    // translateY: 100,
    rotate: 0,
    // textType: 'stroke',
    // shadowStyle: {
    //   shadowBlur: 20,
    //   shadowColor: 'black'
    // },
    // extraDrawFunc: (ctx) => {
    //   ctx.lineWidth = 5
		//   ctx.strokeRect(0,0,150,100)
    // },
    advancedStyle: {
      // type: 'linear',
      // type: 'radial',
      // type: 'conic',
      // colorStops: [
      //   { offset: 0, color: 'red' },
      //   { offset: 0.5, color: 'green' },
      //   { offset: 1, color: 'blue' }
      // ],
      // colorStops: [
      //   { offset: 0, color: 'red' },
      //   { offset: 0.3, color: 'green' },
      //   { offset: 0.6, color: 'black' },
      //   { offset: 1, color: 'blue' }
      // ],
      // colorStops: [
      //   { offset: 0, color: 'red' },
      //   { offset: 1, color: 'blue' }
      // ],
    }
  });
})

const handleAddTextWatermark = () => {
  if (isDark.value) {
    textWatermark.options.fontColor = '#fff'
  }
  textWatermark.create();
};
const handleRemoveTextWatermark = () => {
  textWatermark.destroy();
};

const handleAddMultiLineTextWatermark = () => {
  if (isDark.value) {
    multiLineTextWatermark.options.fontColor = '#fff'
  }
  multiLineTextWatermark.create();
};
const handleRemoveMultiLineTextWatermark = () => {
  multiLineTextWatermark.destroy();
};

const handleAddImageWatermark = () => {
  imageWatermark.create();
};
const handleRemoveImageWatermark = () => {
  imageWatermark.destroy();
};

const handleAddRichTextWatermark = () => {
  richTextWatermark.create();
};
const handleRemoveRichTextWatermark = () => {
  richTextWatermark.destroy();
};

const handleAddChildElementWatermark = () => {
  childElementWatermark.create();
};
const handleRemoveChildElementWatermark = () => {
  childElementWatermark.destroy();
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

## Child Element Watermark

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
  parent: '.parent-element',
  width: 200,
  height: 200,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '100% 100%',
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<el-space>
  <VPButton text="Add Child Element Watermark" @click="handleAddChildElementWatermark"></VPButton>
  <VPButton text="Remove Child Element Watermark" @click="handleRemoveChildElementWatermark"></VPButton>
</el-space>
<div class="parent-element" style="width: 400px;height: 400px;border: 1px solid #333;margin-top: 10px;position: relative;">
</div>
