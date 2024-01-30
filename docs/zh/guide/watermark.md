---
layout: doc
---
# 明水印

<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { ref, getCurrentInstance, onMounted } from 'vue';
import { Watermark } from '../../../src';
import { useData } from 'vitepress';
import dayjs from 'dayjs';
import { useAppStore } from '../../.vitepress/stores/app';

const appStore = useAppStore();
const { isDark } = useData();
const decodeBlindImage = ref('');
const app = getCurrentInstance();

// 子元素水印
let childElementWatermark = null

onMounted(() => {
  // 子元素水印
  childElementWatermark = new Watermark({
    parent: '.parent-element',
    width: 400,
    height: 400,
    backgroundRepeat: 'no-repeat',
    zIndex: 900
  });
});

const handleAddTextWatermark = () => {
  appStore.createWatermark({
    content: 'hello my watermark',
    fontColor: isDark.value ? '#fff' : '#000',
    width: 200,
    height: 200,
    rotate: 22,
    layout: 'grid',
    // mutationObserve: false,
    // auxiliaryLine: true,
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
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: '文本水印添加成功！',
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
        message: '多行文本水印添加成功！',
        type: 'success'
      });
    }
  });
};
const handleRemoveMultiLineTextWatermark = () => {
  appStore.removeWatermark()
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
        message: '图片水印添加成功！',
        type: 'success'
      });
    }
  })
};
const handleRemoveImageWatermark = () => {
  appStore.removeWatermark()
};

const handleAddRichTextWatermark = () => {
  appStore.createWatermark({
    contentType: 'rich-text',
    content: '<div style="background: #ccc;">富文本水印 <span style="color: #f00">good</span></div>',
    width: 300,
    height: 300,
    filter: 'blur(2px)',
    movable: true,
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: '富文本水印添加成功！',
        type: 'success'
      });
    }
  });
};
const handleRemoveRichTextWatermark = () => {
  appStore.removeWatermark()
};

const handleAddChildElementWatermark = () => {
  childElementWatermark.create();
};
const handleRemoveChildElementWatermark = () => {
  childElementWatermark.destroy();
};
</script>

<el-backtop></el-backtop>

## 文本水印

<div class="text-watermark">

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

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

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-affix target=".text-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="添加文本水印" @click="handleAddTextWatermark"></VPButton>
    <VPButton text="修改文本水印" @click="handleUpdateTextWatermark"></VPButton>
    <VPButton text="删除文本水印" @click="handleRemoveTextWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## 多行文本水印

<div class="multiline-text-watermark">

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

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

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-affix target=".multiline-text-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="添加多行文本水印" @click="handleAddMultiLineTextWatermark"></VPButton>
    <VPButton text="删除多行文本水印" @click="handleRemoveMultiLineTextWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## 图片水印

<div class="image-watermark">

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new Watermark({
  contentType: 'image',
  image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
  width: 300,
  height: 300,
  imageWidth: 100, // 图片宽度
  // imageHeight: 20, // 图片高度
  filter: 'grayscale(100%)', // 灰阶
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-affix target=".image-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="添加图片水印" @click="handleAddImageWatermark"></VPButton>
    <VPButton text="删除图片水印" @click="handleRemoveImageWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## 富文本水印

<div class="rich-text-watermark">

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new Watermark({
  contentType: 'rich-text',
  content: '<div style="background: #ccc;">富文本水印超级 <span style="color: #f00">棒</span></div>',
  width: 300,
  height: 300,
  filter: 'blur(2px)',
  movable: true,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-affix target=".rich-text-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="添加富文本水印" @click="handleAddRichTextWatermark"></VPButton>
    <VPButton text="删除富文本水印" @click="handleRemoveRichTextWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## 子元素水印

<div class="child-element-watermark">

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new Watermark({
  parent: '.parent-element',
  width: 400,
  height: 400,
  backgroundRepeat: 'no-repeat',
  zIndex: 900
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<div class="parent-element" style="border: 1px solid #333;width: 400px;height: 400px;margin-top: 10px;position: relative;overflow: hidden;">
  <div class="scroll-list" style="overflow: auto;width: 400px;height: 400px;">
    <div v-for="(item, index) in Array.from({length: 100})">{{index + 1}}</div>
  </div>
</div>
<el-affix target=".child-element-watermark" position="bottom" :offset="0" z-index="1000">
  <el-space class="block-operation">
    <VPButton text="添加子元素水印" @click="handleAddChildElementWatermark"></VPButton>
    <VPButton text="删除子元素水印" @click="handleRemoveChildElementWatermark"></VPButton>
  </el-space>
</el-affix>
</div>
