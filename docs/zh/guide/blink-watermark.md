---
layout: doc
---
# 暗水印

<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { ref, getCurrentInstance } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import wm from '../../../src';
import { useData } from 'vitepress';

const { isDark } = useData();
const app = getCurrentInstance();
const decodeBlindImage = ref('');

// 文本暗水印
const textBlindWatermark = new wm.BlindWatermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '文本暗水印添加成功！',
      type: 'success'
    });
  }
});
const handleAddTextBlindWatermark = () => {
  if (isDark) {
    textBlindWatermark.options.fontColor = '#fff'
  }
  textBlindWatermark.create();
};
const handleRemoveTextBlindWatermark = () => {
  textBlindWatermark.destroy();
};

// 多行水印
const multiLineTextBlindWatermark = new wm.BlindWatermark({
  contentType: 'multi-line-text',
  content: 'hello my watermark watermark',
  fontSize: 30,
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '多行文本暗水印添加成功！',
      type: 'success'
    });
  }
});
const handleAddMultiLineTextBlindWatermark = () => {
  if (isDark) {
    multiLineTextBlindWatermark.options.fontColor = '#fff'
  }
  multiLineTextBlindWatermark.create();
};
const handleRemoveMultiLineTextBlindWatermark = () => {
  multiLineTextBlindWatermark.destroy();
};

// 图片暗水印
const imageBlindWatermark = new wm.BlindWatermark({
  contentType: 'image',
  image: 'http://upic-service.test.upcdn.net/uPic/github-JxMIKf.png',
  imageWidth: 200,
  // imageHeight: 20,
  width: 300,
  height: 300,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '图片暗水印添加成功！',
      type: 'success'
    });
  }
});
const handleAddImageBlindWatermark = () => {
  imageBlindWatermark.create();
};
const handleRemoveImageBlindWatermark = () => {
  imageBlindWatermark.destroy();
};

// 富文本水印
const richTextBlindWatermark = new wm.BlindWatermark({
  contentType: 'rich-text',
  content: '<div style="background: #ccc;">富文本暗水印 <span style="color: #f00">good</span></div>',
  width: 300,
  height: 300,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '富文本暗水印添加成功！',
      type: 'success'
    });
  }
});
const handleAddRichTextBlindWatermark = () => {
  richTextBlindWatermark.create();
};
const handleRemoveRichTextBlindWatermark = () => {
  richTextBlindWatermark.destroy();
};

// 支持暗黑模式单行文本暗水印
const textBlindWatermarkSupportDark = new wm.BlindWatermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '支持暗黑模式单行文本暗水印添加成功！',
      type: 'success'
    });
  }
});
const handleSupportDarkAddTextBlindWatermark = () => {
  textBlindWatermarkSupportDark.create();
};
const handleSupportDarkRemoveTextBlindWatermark = () => {
  textBlindWatermarkSupportDark.destroy();
};

// 解析暗水印
const handleSuccess = (uploadFile) => {
  wm.BlindWatermark.decode({
    ...(isDark ? {
      compositeOperation: 'overlay',
      fillColor: '#fff',
    } : {}),
    url: uploadFile.url,
    onSuccess: (imageBase64) => {
      decodeBlindImage.value = imageBase64
    }
  });
}
</script>

## 文本暗水印

```js
import wm from 'watermark-js-plus' // 引入水印插件

const watermark = new wm.BlindWatermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '文本暗水印添加成功！',
      type: 'success'
    });
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-space>
  <VPButton text="添加文本暗水印" @click="handleAddTextBlindWatermark"></VPButton>
  <VPButton text="删除文本暗水印" @click="handleRemoveTextBlindWatermark"></VPButton>
</el-space>

## 多行文本暗水印

```js
import wm from 'watermark-js-plus' // 引入水印插件

const watermark = new wm.BlindWatermark({
  contentType: 'multi-line-text',
  content: 'hello my watermark watermark',
  fontSize: 30,
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '多行文本暗水印添加成功！',
      type: 'success'
    });
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-space>
  <VPButton text="添加多行文本暗水印" @click="handleAddMultiLineTextBlindWatermark"></VPButton>
  <VPButton text="删除多行文本暗水印" @click="handleRemoveMultiLineTextBlindWatermark"></VPButton>
</el-space>

## 图片暗水印

```js
import wm from 'watermark-js-plus' // 引入水印插件

const watermark = new wm.BlindWatermark({
  contentType: 'image',
  content: 'http://upic-service.test.upcdn.net/uPic/github-JxMIKf.png',
  width: 300,
  height: 300,
  imageWidth: 100, // 图片宽度
  // imageHeight: 20, // 图片高度
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '图片暗水印添加成功！',
      type: 'success'
    });
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-space>
  <VPButton text="添加图片暗水印" @click="handleAddImageBlindWatermark"></VPButton>
  <VPButton text="删除图片暗水印" @click="handleRemoveImageBlindWatermark"></VPButton>
</el-space>

## 富文本水印

```js
import wm from 'watermark-js-plus' // 引入水印插件

const watermark = new wm.BlindWatermark({
  contentType: 'rich-text',
  content: '<div style="background: #ccc;">富文本暗水印 <span style="color: #f00">good</span></div>',
  width: 300,
  height: 300,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '富文本暗水印添加成功！',
      type: 'success'
    });
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-space>
  <VPButton text="添加富文本暗水印" @click="handleAddRichTextBlindWatermark"></VPButton>
  <VPButton text="删除富文本暗水印" @click="handleRemoveRichTextBlindWatermark"></VPButton>
</el-space>



## 解析暗水印

```js
import wm from 'watermark-js-plus' // 引入水印插件

wm.BlindWatermark.decode({
  url: uploadFile.url, // 需要解析暗水印图片的URL
  onSuccess: (imageBase64) => { // 解析成功后的回调事件，返回的是解析后图片的base64
  }
});
```

<div>
  <el-upload
    list-type="picture-card"
    accept="image/*"
    :auto-upload="false"
    :show-file-list="false"
    :on-change="handleSuccess"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-image
    v-if="decodeBlindImage"
    style="width: 400px; height: 400px;margin-top: 20px;"
    :src="decodeBlindImage"
    :preview-src-list="[decodeBlindImage]"
    fit="cover"
  />
</div>

[//]: # (<div style="position: relative;">)

[//]: # (  <div style="position: absolute;top:0;bottom: 0;left: 0;right: 0;mix-blend-mode: color-burn;background: #000;"></div>)

[//]: # (  <img width="200" src="http://upic-service.test.upcdn.net/uPic/iShot_2022-11-28_10.35.29-RP6dBG.png" alt="">)

[//]: # (</div>)
