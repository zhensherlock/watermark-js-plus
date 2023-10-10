---
layout: doc
---
# 暗水印

<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { ref, getCurrentInstance, onMounted } from 'vue';
import { Plus, Warning } from '@element-plus/icons-vue';
import { BlindWatermark } from '../../../src';
import { useData } from 'vitepress';
import { useAppStore } from '../../.vitepress/stores/app';

const appStore = useAppStore();
const { isDark } = useData();
const app = getCurrentInstance();
const decodeBlindImageByLight = ref('');
const decodeBlindImageByDark = ref('');

onMounted(() => {
});

const handleAddTextBlindWatermark = () => {
  appStore.createWatermark({
    content: 'hello my watermark',
    fontColor: isDark.value ? '#fff' : '#000',
    width: 200,
    height: 200,
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: '文本暗水印添加成功！',
        type: 'success'
      });
    }
  }, 'blind')
};
const handleRemoveTextBlindWatermark = () => {
  appStore.removeWatermark();
};

const handleAddMultiLineTextBlindWatermark = () => {
  appStore.createWatermark({
    contentType: 'multi-line-text',
    content: 'hello my multiline blind watermark',
    fontColor: isDark.value ? '#fff' : '#000',
    fontSize: 30,
    width: 200,
    height: 200,
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: '多行文本暗水印添加成功！',
        type: 'success'
      });
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
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: '图片暗水印添加成功！',
        type: 'success'
      });
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
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: '富文本暗水印添加成功！',
        type: 'success'
      });
    }
  }, 'blind')
};
const handleRemoveRichTextBlindWatermark = () => {
  appStore.removeWatermark();
};

// 解析暗水印
const handleSuccessByLight = (uploadFile) => {
  BlindWatermark.decode({
    url: uploadFile.url,
    onSuccess: (imageBase64) => {
      decodeBlindImageByLight.value = imageBase64
    }
  });
}
const handleSuccessByDark = (uploadFile) => {
  BlindWatermark.decode({
    compositeOperation: 'overlay',
    fillColor: '#fff',
    url: uploadFile.url,
    onSuccess: (imageBase64) => {
      decodeBlindImageByDark.value = imageBase64
    }
  });
}
</script>

<el-backtop></el-backtop>

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
  content: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
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


## 富文本水印

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

## 解析暗水印

```js
import { BlindWatermark } from 'watermark-js-plus' // 引入水印插件

BlindWatermark.decode({
  url: uploadFile.url, // 需要解析暗水印图片的URL
  onSuccess: (imageBase64) => {
    // 解析成功后的回调事件，返回的是解析后图片的base64
  }
});
```
<el-row :gutter="20">
  <el-col :span="12">
    <el-tooltip content="淡色背景图片时使用" placement="right">
      <el-link :underline="false">
        淡色背景<el-icon class="el-icon--right"><Warning /></el-icon>
      </el-link>
    </el-tooltip>
    <div>
      <el-upload
        list-type="picture-card"
        accept="image/*"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleSuccessByLight"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-image
        v-if="decodeBlindImageByLight"
        style="width: 400px; height: 400px;margin-top: 20px;"
        :src="decodeBlindImageByLight"
        :preview-src-list="[decodeBlindImageByLight]"
        fit="cover"
      />
    </div>
  </el-col>
  <el-col :span="12">
    <el-tooltip content="深色背景图片时使用" placement="right">
      <el-link :underline="false">
        深色背景<el-icon class="el-icon--right"><Warning /></el-icon>
      </el-link>
    </el-tooltip>
    <div>
      <el-upload
        list-type="picture-card"
        accept="image/*"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleSuccessByDark"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-image
        v-if="decodeBlindImageByDark"
        style="width: 400px; height: 400px;margin-top: 20px;"
        :src="decodeBlindImageByDark"
        :preview-src-list="[decodeBlindImageByDark]"
        fit="cover"
      />
    </div>
  </el-col>
</el-row>
