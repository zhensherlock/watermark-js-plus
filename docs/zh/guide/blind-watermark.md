---
layout: doc
description: 使用 BlindWatermark API 创建低透明度暗水印，并从截图或图片中将其显现。
---
# 暗水印

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
        message: '文本暗水印添加成功！',
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
        message: '多行文本暗水印添加成功！',
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
        message: '图片暗水印添加成功！',
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
    content: '<div style="background: #ccc;">富文本暗水印 <span style="color: #f00">good</span></div>',
    width: 300,
    height: 300,
    onSuccess: () => {
      ElMessage({
        appendTo: '#app',
        message: '富文本暗水印添加成功！',
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

`BlindWatermark` 继承 `Watermark` 的内容、布局和生命周期能力，但始终使用 `globalAlpha: 0.005` 和 `mode: 'blind'`。固定值的精确说明参见 [BlindWatermark 配置项](/zh/config/blind)。

## 文本暗水印

<div class="text-blind-watermark">

```js
import { BlindWatermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new BlindWatermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
👉 深色背景请添加参数：`fontColor: '#fff'`
<el-affix target=".text-blind-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="添加文本暗水印" @click="handleAddTextBlindWatermark"></VPButton>
    <VPButton text="修改文本暗水印" @click="handleUpdateTextBlindWatermark"></VPButton>
    <VPButton text="删除文本暗水印" @click="handleRemoveTextBlindWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## 多行文本暗水印

<div class="multiline-text-blind-watermark">

```js
import { BlindWatermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new BlindWatermark({
  contentType: 'multi-line-text',
  content: 'hello my watermark watermark',
  fontSize: '30px',
  width: 200,
  height: 200,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
👉 深色背景请添加参数：`fontColor: '#fff'`
<el-affix target=".multiline-text-blind-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="添加多行文本暗水印" @click="handleAddMultiLineTextBlindWatermark"></VPButton>
    <VPButton text="删除多行文本暗水印" @click="handleRemoveMultiLineTextBlindWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## 图片暗水印

<div class="image-blind-watermark">

```js
import { BlindWatermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new BlindWatermark({
  contentType: 'image',
  image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
  width: 300,
  height: 300,
  imageWidth: 100, // 图片宽度
  // imageHeight: 20, // 图片高度
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-affix target=".image-blind-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="添加图片暗水印" @click="handleAddImageBlindWatermark"></VPButton>
    <VPButton text="删除图片暗水印" @click="handleRemoveImageBlindWatermark"></VPButton>
  </el-space>
</el-affix>
</div>


## 富文本暗水印

<div class="rich-text-blind-watermark">

```js
import { BlindWatermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new BlindWatermark({
  contentType: 'rich-text',
  content: '<div style="background: #ccc;">富文本暗水印 <span style="color: #f00">good</span></div>',
  width: 300,
  height: 300,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-affix target=".rich-text-blind-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="添加富文本暗水印" @click="handleAddRichTextBlindWatermark"></VPButton>
    <VPButton text="删除富文本暗水印" @click="handleRemoveRichTextBlindWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## 解码暗水印

推荐使用 [暗水印解码器](/zh/tools/blind-watermark-decoder)：上传或粘贴图片后，即可调整解码参数并预览结果。

如需在应用中集成解码能力，请使用 `BlindWatermark.decode`。全部参数说明参见[解码参数](/zh/config/blind-decode)。

解码器会将源图片绘制到 Canvas，使用指定的合成模式和填充颜色进行多次增强，最后返回 PNG Data URL。

```js
import { BlindWatermark } from 'watermark-js-plus' // 引入水印插件

BlindWatermark.decode({
  compositeOperation: 'overlay',
  compositeTimes: 4,
  url: uploadFile.url, // 需要解析暗水印图片的URL
  onSuccess: (imageBase64) => {
    // 解析成功后的回调事件，返回的是解析后图片的base64
  }
})
```
