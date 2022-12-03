---
layout: doc
---
# Example

<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { Plus } from '@element-plus/icons-vue';
import { ref, getCurrentInstance } from 'vue';
import { Watermark, BlindWatermark } from '../../src';

const decodeBlindImage = ref('');
const app = getCurrentInstance();
const watermark = new Watermark({
  contentType: 'multi-line-text',
  content: 'hello my watermark watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '水印添加成功！',
      type: 'success'
    });
  }
});
const handleAddWatermark = () => {
  watermark.create();
};
const handleRemoveWatermark = () => {
  watermark.destroy();
};
const blindWatermark = new BlindWatermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '暗水印添加成功！',
      type: 'success'
    });
  }
});
const handleAddBlindWatermark = () => {
  blindWatermark.create();
};
const handleRemoveBlindWatermark = () => {
  blindWatermark.destroy();
};
const handleSuccess = (uploadFile) => {
  blindWatermark.decode({
    url: uploadFile.url,
    onSuccess: (imageBase64) => {
      decodeBlindImage.value = imageBase64
    }
  });
}
</script>

## 明水印

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new Watermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '水印添加成功！',
      type: 'success'
    });
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
<el-space>
  <VPButton text="添加水印" @click="handleAddWatermark"></VPButton>
  <VPButton text="删除水印" @click="handleRemoveWatermark"></VPButton>
</el-space>

## 暗水印

```js
import watermark from 'watermark-js-plus' // 引入水印插件

const blindWatermark = new BlindWatermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    app.appContext.config.globalProperties.$message({
      message: '暗水印添加成功！',
      type: 'success'
    });
  }
})

blindWatermark.create() // 添加暗水印

blindWatermark.destroy() // 删除暗水印
```
<el-space>
  <VPButton text="添加暗水印" @click="handleAddBlindWatermark"></VPButton>
  <VPButton text="删除水印" @click="handleRemoveBlindWatermark"></VPButton>
</el-space>

## 解析暗水印

```js
import watermark from 'watermark-js-plus' // 引入水印插件

const blindWatermark = new BlindWatermark({
  content: 'hello my watermark',
  width: 200,
  height: 200
})

blindWatermark.decode({
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

[//]: # (  <div style="position: relative;">)

[//]: # (    <div style="position: absolute;top:0;bottom: 0;left: 0;right: 0;mix-blend-mode: color-burn;background: #000;"></div>)

[//]: # (    <img width="200" src="http://upic-service.test.upcdn.net/uPic/iShot_2022-11-23_11.21.45-EzzUDS.png" alt="">)

[//]: # (  </div>)
  <el-image
    v-if="decodeBlindImage"
    style="width: 400px; height: 400px;margin-top: 20px;"
    :src="decodeBlindImage"
    :preview-src-list="[decodeBlindImage]"
    fit="cover"
  />
</div>
