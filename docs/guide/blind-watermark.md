---
layout: doc
---
# Blind Watermark

<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { ref, getCurrentInstance, onMounted } from 'vue';
import dayjs from 'dayjs';
import { Plus, Warning } from '@element-plus/icons-vue';
import { useData } from 'vitepress';
import { BlindWatermark } from '../../src';
import { useAppStore } from '../.vitepress/stores/app';

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
        message: 'The text blind watermark added successfully!',
        type: 'success'
      });
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
    fontSize: 30,
    width: 200,
    height: 200,
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: 'The multiline text blind watermark added successfully!',
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
        message: 'The image blind watermark added successfully!',
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
    content: '<div><span style="color: #f00">good</span> watermark</div>',
    width: 300,
    height: 300,
    onSuccess: () => {
      app.appContext.config.globalProperties.$message({
        appendTo: '#app',
        message: 'The rich text blind watermark added successfully!',
        type: 'success'
      });
    }
  }, 'blind')
};
const handleRemoveRichTextBlindWatermark = () => {
  appStore.removeWatermark();
};

// decode blind watermark
const handleSuccessByLight = (uploadFile) => {
  BlindWatermark.decode({
    compositeTimes: 4,
    compositeOperation: 'overlay',
    // compositeTimes: 5,
    // compositeOperation: 'soft-light',
    url: uploadFile.url,
    onSuccess: (imageBase64) => {
      decodeBlindImageByLight.value = imageBase64
    }
  });
}
const handleSuccessByDark = (uploadFile) => {
  BlindWatermark.decode({
    fillColor: '#fff',
    compositeTimes: 3,
    compositeOperation: 'overlay',
    url: uploadFile.url,
    onSuccess: (imageBase64) => {
      decodeBlindImageByDark.value = imageBase64
    }
  });
}
</script>

<el-backtop></el-backtop>

## Text Blind Watermark

<div class="text-blind-watermark">

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new BlindWatermark({
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
👉 Add parameters for dark background：`fontColor: '#fff'`
<el-affix target=".text-blind-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="Add Text Blind Watermark" @click="handleAddTextBlindWatermark"></VPButton>
    <VPButton text="Update Text Blind Watermark" @click="handleUpdateTextBlindWatermark"></VPButton>
    <VPButton text="Remove Text Blind Watermark" @click="handleRemoveTextBlindWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## Multiline Text Blind Watermark

<div class="multiline-text-blind-watermark">

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new BlindWatermark({
  contentType: 'multi-line-text',
  content: 'hello my multiline blind watermark',
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
👉 Add parameters for dark background：`fontColor: '#fff'`
<el-affix target=".multiline-text-blind-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="Add Multiline Text Blind Watermark" @click="handleAddMultiLineTextBlindWatermark"></VPButton>
    <VPButton text="Remove Multiline Text Blind Watermark" @click="handleRemoveMultiLineTextBlindWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## Image Blind Watermark

<div class="image-blind-watermark">

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new BlindWatermark({
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
<el-affix target=".image-blind-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="Add Image Blind Watermark" @click="handleAddImageBlindWatermark"></VPButton>
    <VPButton text="Remove Image Blind Watermark" @click="handleRemoveImageBlindWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## Rich Text Blind Watermark

<div class="rich-text-blind-watermark">

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new BlindWatermark({
  contentType: 'rich-text',
  content: '<div><span style="color: #f00">good</span> watermark</div>',
  width: 300,
  height: 300,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
<el-affix target=".rich-text-blind-watermark" position="bottom" :offset="0">
  <el-space class="block-operation">
    <VPButton text="Add RichText Blind Watermark" @click="handleAddRichTextBlindWatermark"></VPButton>
    <VPButton text="Remove Rich Text Blind Watermark" @click="handleRemoveRichTextBlindWatermark"></VPButton>
  </el-space>
</el-affix>
</div>

## Decode Blind Watermark

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

BlindWatermark.decode({
  compositeOperation: 'overlay',
  compositeTimes: 4,
  url: uploadFile.url, // image url
  onSuccess: (imageBase64) => {
    // success callback
  }
});
```
<el-row :gutter="20">
  <el-col :span="12">
    <el-tooltip content="Use a light background image" placement="right">
      <el-link :underline="false">
        Light Background<el-icon class="el-icon--right"><Warning /></el-icon>
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
    <el-tooltip content="Use with dark background image" placement="right">
      <el-link :underline="false">
        Dark Background<el-icon class="el-icon--right"><Warning /></el-icon>
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

[//]: # (<div style="position: relative;">)

[//]: # (  <div style="position: absolute;top:0;bottom: 0;left: 0;right: 0;mix-blend-mode: color-burn;background: #000;"></div>)

[//]: # (  <img width="200" src="http://upic-service.test.upcdn.net/uPic/iShot_2022-11-28_10.35.29-RP6dBG.png" alt="">)

[//]: # (</div>)
