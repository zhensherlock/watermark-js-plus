---
layout: doc
---
# Watermark

<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { ref, getCurrentInstance, onMounted } from 'vue';
import { Watermark } from '../../src';
import { useData } from 'vitepress';
import dayjs from 'dayjs';
import { useAppStore } from '../.vitepress/stores/app';

const appStore = useAppStore();
const { isDark } = useData();
const decodeBlindImage = ref('');
const app = getCurrentInstance();

// child element watermark
let childElementWatermark = null

onMounted(() => {
  // child element watermark
  childElementWatermark = new Watermark({
    parent: '.parent-element',
    width: 400,
    height: 400,
    backgroundRepeat: 'no-repeat',
    zIndex: 900,
    // parent: '.parent-element',
    // // textRowMaxWidth: 200,
    // // contentType: 'multi-line-text',
    // content: 'hello my watermark1 watermark2 watermark3 watermark4 watermark5 watermark6 watermark7 watermark8 watermark9 watermark10 watermark11 watermark12 watermark13 watermark14',
    // fontSize: '20px',
    // // contentType: 'image',
    // // image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
    // // imageWidth: 100,
    // // contentType: 'rich-text',
    // // content: '<div style="background: #ccc;">Rich text watermark is so <span style="color: #f00">nice</span></div>',
    // lineHeight: 100,
    // backgroundRepeat: 'no-repeat',
    // translatePlacement: 'bottom',
    // // translateX: 100,
    // // translateY: 100,
    // rotate: 0,
    // // textType: 'stroke',
    // // shadowStyle: {
    // //   shadowBlur: 20,
    // //   shadowColor: 'black'
    // // },
    // // extraDrawFunc: (ctx) => {
    // //   ctx.lineWidth = 5
		// //   ctx.strokeRect(0,0,150,100)
    // // },
    // advancedStyle: {
    //   // type: 'linear',
    //   // type: 'radial',
    //   // type: 'conic',
    //   // colorStops: [
    //   //   { offset: 0, color: 'red' },
    //   //   { offset: 0.5, color: 'green' },
    //   //   { offset: 1, color: 'blue' }
    //   // ],
    //   // colorStops: [
    //   //   { offset: 0, color: 'red' },
    //   //   { offset: 0.3, color: 'green' },
    //   //   { offset: 0.6, color: 'black' },
    //   //   { offset: 1, color: 'blue' }
    //   // ],
    //   // colorStops: [
    //   //   { offset: 0, color: 'red' },
    //   //   { offset: 1, color: 'blue' }
    //   // ],
    // }
  });
})

const handleAddTextWatermark = () => {
  appStore.createWatermark({
    content: 'hello my text watermark',
    fontColor: isDark.value ? '#fff' : '#000',
    width: 200,
    height: 200,
    rotate: 22,
    layout: 'grid',
    // mutationObserve: false,
    // auxiliaryLine: true,
    globalAlpha: 0.06,
    gridLayoutOptions: {
      rows: 2,
      cols: 2,
      gap: [20, 20],
      matrix: [[1, 0], [0, 1]]
    },
    // advancedStyle: {
    //   type: 'linear',
    //   colorStops: [
    //     {
    //       offset: 0,
    //       color: 'red'
    //     },
    //     {
    //       offset: 1,
    //       color: 'blue'
    //     }
    //   ]
    // },
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: 'The text watermark added successfully!',
        type: 'success'
      });
    }
  })
};
const handleUpdateTextWatermark = () => {
  appStore.changeWatermark({
    content: 'update my text watermark at ' + dayjs().format('HH:mm:ss'),
    fontColor: isDark.value ? '#fff' : '#000'
  }, 'append')
};
const handleRemoveTextWatermark = () => {
  appStore.removeWatermark()
};

const handleAddMultiLineTextWatermark = () => {
  appStore.createWatermark({
    contentType: 'multi-line-text',
    content: 'multi text watermark',
    fontColor: isDark.value ? '#fff' : '#000',
    fontSize: '30px',
    width: 200,
    height: 200,
    shadowStyle: {
      shadowBlur: 10,
      shadowColor: '#000000FF',
      shadowOffsetX: 0,
      shadowOffsetY: 0
    },
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: 'The multi text watermark added successfully!',
        type: 'success'
      });
    }
  });
};
const handleRemoveMultiLineTextWatermark = () => {
  appStore.removeWatermark();
};

const handleAddImageWatermark = () => {
  appStore.createWatermark({
    contentType: 'image',
    image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
    imageWidth: 200,
    // imageHeight: 20,
    width: 300,
    height: 300,
    filter: 'grayscale(100%)',
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: 'The image watermark added successfully!',
        type: 'success'
      });
    }
  })
};
const handleRemoveImageWatermark = () => {
  appStore.removeWatermark();
};

const handleAddRichTextWatermark = () => {
// var image = new Image()
//   image.setAttribute('crossOrigin', 'Anonymous')
// image.src='data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><foreignObject width="228" height="21"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align: center; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; font: 20px sans-serif; color: rgb(0, 0, 0);"><div class="rich-text-content"><div style="background: %23ccc;">The watermark is so <span style="color: %23f00">nice</span>.</div></div></div></foreignObject></svg>'
// image.onload=() => {debugger}
//   const p = document.createElement('p')
//   document.body.appendChild(p)
// setTimeout(() => {
// debugger
// })
  appStore.createWatermark({
    contentType: 'rich-text',
    content: '<div style="background: #ccc;display: flex;flex-direction: column;"><div>how <span style="color: #f00;margin-left: 5px;">nice</span></div><img src="https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png" width="100px"></div>',
    width: 300,
    height: 300,
    filter: 'blur(2px)',
    movable: true,
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: 'The rich text watermark added successfully！',
        type: 'success'
      });
    }
  });
};
const handleRemoveRichTextWatermark = () => {
  appStore.removeWatermark();
};

const handleAddChildElementWatermark = () => {
  childElementWatermark.create();
};
const handleRemoveChildElementWatermark = () => {
  childElementWatermark.destroy();
};
</script>

<el-backtop></el-backtop>

## Text Watermark

<div class="text-watermark">

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  rotate: 22,
  layout: 'grid',
  gridLayoutOptions: {
    rows: 2,
    cols: 2,
    gap: [20, 20],
    matrix: [[1, 0], [0, 1]]
  },
  advancedStyle: {
    type: 'linear',
    colorStops: [
      {
        offset: 0,
        color: 'red'
      },
      {
        offset: 1,
        color: 'blue'
      }
    ]
  },
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<el-affix target=".text-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="Add Text Watermark" @click="handleAddTextWatermark"></VPButton>
    <VPButton text="Update Text Watermark" @click="handleUpdateTextWatermark"></VPButton>
    <VPButton text="Remove Text Watermark" @click="handleRemoveTextWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## Multiline Text Watermark

<div class="multiline-text-watermark">

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
  contentType: 'multi-line-text',
  content: 'multi text watermark',
  fontSize: '30px',
  width: 200,
  height: 200,
  shadowStyle: {
    shadowBlur: 10,
    shadowColor: '#000000FF',
    shadowOffsetX: 0,
    shadowOffsetY: 0
  },
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<el-affix target=".multiline-text-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="Add MultiLine Text Watermark" @click="handleAddMultiLineTextWatermark"></VPButton>
    <VPButton text="Remove MultiLine Text Watermark" @click="handleRemoveMultiLineTextWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## Image Watermark

<div class="image-watermark">

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
  contentType: 'image',
  image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
  width: 300,
  height: 300,
  imageWidth: 100, // image width
  // imageHeight: 20, // image height
  filter: 'grayscale(100%)', // graylevel
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<el-affix target=".image-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="Add Image Watermark" @click="handleAddImageWatermark"></VPButton>
    <VPButton text="Remove Image Watermark" @click="handleRemoveImageWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## Rich Text Watermark

<div class="rich-text-watermark">

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
  contentType: 'rich-text',
  content: '<div style="background: #ccc;display: flex;flex-direction: column;"><div>how <span style="color: #f00;margin-left: 5px;">nice</span></div><img src="https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png" width="100px"></div>',
  width: 300,
  height: 300,
  filter: 'blur(2px)',
  movable: true,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<el-affix target=".rich-text-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="Add Rich Text Watermark" @click="handleAddRichTextWatermark"></VPButton>
    <VPButton text="Remove Rich Text Watermark" @click="handleRemoveRichTextWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## Child Element Watermark

> You need to **manually set the `position` style** for the parent DOM element, for example: `position: relative`.

<div class="child-element-watermark">

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
  parent: '.parent-element',
  width: 400,
  height: 400,
  backgroundRepeat: 'no-repeat',
  zIndex: 900
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<div class="parent-element" style="border: 1px solid #333;width: 400px;height: 400px;margin-top: 10px;position: relative;overflow: hidden;">
  <div class="scroll-list" style="overflow: auto;width: 400px;height: 400px;">
    <div v-for="(item, index) in Array.from({length: 100})">{{index + 1}}</div>
  </div>
</div>
<el-affix target=".child-element-watermark" position="bottom" :offset="0" z-index="1000">
  <el-space class="block-operation">
    <VPButton text="Add Child Element Watermark" @click="handleAddChildElementWatermark"></VPButton>
    <VPButton text="Remove Child Element Watermark" @click="handleRemoveChildElementWatermark"></VPButton>
  </el-space>
</el-affix>
</div>
