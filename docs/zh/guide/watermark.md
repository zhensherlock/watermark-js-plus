---
layout: doc
---
# 明水印

<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { ref, getCurrentInstance } from 'vue';
import wm from '../../../src';
import { useData } from 'vitepress';

const { isDark } = useData();
const decodeBlindImage = ref('');
const app = getCurrentInstance();

// 文本水印
const textWatermark = new wm.Watermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '文本水印添加成功！',
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

// 多行文本水印
const multiLineTextWatermark = new wm.Watermark({
  contentType: 'multi-line-text',
  content: 'hello my watermark watermark',
  fontSize: 30,
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '多行文本水印添加成功！',
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

// 图片水印
const imageWatermark = new wm.Watermark({
  contentType: 'image',
  image: 'http://upic-service.test.upcdn.net/uPic/github-JxMIKf.png',
  imageWidth: 200,
  // imageHeight: 20,
  width: 300,
  height: 300,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '图片水印添加成功！',
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

// 富文本水印
const richTextWatermark = new wm.Watermark({
  contentType: 'rich-text',
  content: '<div style="background: #ccc;">富文本水印 <span style="color: #f00">good</span></div>',
  width: 300,
  height: 300,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '富文本水印添加成功！',
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

## 文本水印

```js
import wm from 'watermark-js-plus' // 引入水印插件

const watermark = new wm.Watermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '文本水印添加成功！',
      type: 'success'
    });
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-space>
  <VPButton text="添加文本水印" @click="handleAddTextWatermark"></VPButton>
  <VPButton text="删除文本水印" @click="handleRemoveTextWatermark"></VPButton>
</el-space>

## 多行文本水印

```js
import wm from 'watermark-js-plus' // 引入水印插件

const watermark = new wm.Watermark({
  contentType: 'multi-line-text',
  content: 'hello my watermark watermark',
  fontSize: 30,
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '多行文本水印添加成功！',
      type: 'success'
    });
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
import wm from 'watermark-js-plus' // 引入水印插件

const watermark = new wm.Watermark({
  contentType: 'image',
  content: 'http://upic-service.test.upcdn.net/uPic/github-JxMIKf.png',
  width: 300,
  height: 300,
  imageWidth: 100, // 图片宽度
  // imageHeight: 20, // 图片高度
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '图片水印添加成功！',
      type: 'success'
    });
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
import wm from 'watermark-js-plus' // 引入水印插件

const watermark = new wm.Watermark({
  contentType: 'rich-text',
  content: '<div style="background: #ccc;">富文本水印超级 <span style="color: #f00">棒</span></div>',
  width: 300,
  height: 300,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '富文本水印添加成功！',
      type: 'success'
    });
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-space>
  <VPButton text="添加富文本水印" @click="handleAddRichTextWatermark"></VPButton>
  <VPButton text="删除富文本水印" @click="handleRemoveRichTextWatermark"></VPButton>
</el-space>
