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

const { isDark } = useData();
const decodeBlindImage = ref('');
const app = getCurrentInstance();

let textWatermark = null;
let multiLineTextWatermark = null;
let imageWatermark = null;
let richTextWatermark = null;
// 子元素水印
let childElementWatermark = null

onMounted(() => {
  // 文本水印
  textWatermark = new Watermark({
    content: 'hello my watermark',
    width: 200,
    height: 200,
    layout: 'grid',
		// mutationObserve: false,
    gridLayoutOptions: {
      rows: 2,
      cols: 2,
      gap: [0, 0],
      matrix: [[1, 0], [0, 1]]
    },
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: '文本水印添加成功！',
        type: 'success'
      });
    }
  });
  // 多行文本水印
  multiLineTextWatermark = new Watermark({
    contentType: 'multi-line-text',
    content: 'hello my watermark watermark',
    fontSize: 30,
    width: 200,
    height: 200,
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: '多行文本水印添加成功！',
        type: 'success'
      });
    }
  });
  // 图片水印
  imageWatermark = new Watermark({
    contentType: 'image',
    image: 'http://upic-service.test.upcdn.net/uPic/github-JxMIKf.png',
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
  });
  // 富文本水印
  const richTextWatermark = new Watermark({
    contentType: 'rich-text',
    content: '<div style="background: #ccc;">富文本水印 <span style="color: #f00">good</span></div>',
    width: 300,
    height: 300,
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: '富文本水印添加成功！',
        type: 'success'
      });
    }
  });
  childElementWatermark = new Watermark({
    parent: '.parent-element',
    width: 200,
    height: 200,
    backgroundRepeat: 'no-repeat'
  });
});

const handleAddTextWatermark = () => {
	textWatermark.changeOptions({
		content: 'hello my text watermark',
		fontColor: isDark.value ? '#fff' : '#000'
	}, 'append', false)
  textWatermark.create();
};
const handleUpdateTextWatermark = () => {
	textWatermark.changeOptions({
		content: 'update my text watermark at ' + dayjs().format('HH:mm:ss'),
		fontColor: isDark.value ? '#fff' : '#000'
	}, 'append')
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

## 文本水印

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new Watermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  layout: 'grid',
  gridLayoutOptions: {
    rows: 2,
    cols: 2,
    gap: [0, 0],
    matrix: [[1, 0], [0, 1]]
  },
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-space>
  <VPButton text="添加文本水印" @click="handleAddTextWatermark"></VPButton>
  <VPButton text="修改文本水印" @click="handleUpdateTextWatermark"></VPButton>
  <VPButton text="删除文本水印" @click="handleRemoveTextWatermark"></VPButton>
</el-space>

## 多行文本水印

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

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

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-space>
  <VPButton text="添加多行文本水印" @click="handleAddMultiLineTextWatermark"></VPButton>
  <VPButton text="删除多行文本水印" @click="handleRemoveMultiLineTextWatermark"></VPButton>
</el-space>

## 图片水印

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new Watermark({
  contentType: 'image',
  content: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
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
<el-space>
  <VPButton text="添加图片水印" @click="handleAddImageWatermark"></VPButton>
  <VPButton text="删除图片水印" @click="handleRemoveImageWatermark"></VPButton>
</el-space>

## 富文本水印

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new Watermark({
  contentType: 'rich-text',
  content: '<div style="background: #ccc;">富文本水印超级 <span style="color: #f00">棒</span></div>',
  width: 300,
  height: 300,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-space>
  <VPButton text="添加富文本水印" @click="handleAddRichTextWatermark"></VPButton>
  <VPButton text="删除富文本水印" @click="handleRemoveRichTextWatermark"></VPButton>
</el-space>

## 子元素水印

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new Watermark({
  parent: '.parent-element',
  width: 200,
  height: 200,
  backgroundRepeat: 'no-repeat'
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-space>
  <VPButton text="添加子元素水印" @click="handleAddChildElementWatermark"></VPButton>
  <VPButton text="删除子元素水印" @click="handleRemoveChildElementWatermark"></VPButton>
</el-space>
<div class="parent-element" style="width: 400px;height: 400px;border: 1px solid #333;margin-top: 10px;position: relative;">
</div>
