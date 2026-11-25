---
url: https://zhensherlock.github.io/watermark-js-plus/zh/guide/image.md
description: 使用 ImageWatermark API 将文本或图片水印直接绘制到浏览器中的现有图片。
---

# 图片水印

精确的 API 说明参见 [ImageWatermark 配置项](/zh/config/#image-watermark-options)及 [Watermark 方法](/zh/config/function)中的适用方法。

## 文本水印

```html
<img class="text-watermark-image" src="https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/402413381-a24bd4a5-c4e0-45d6-b8ce-94e99e29a111-dowV4C.png" crossorigin="anonymous">
```

```js
import { ImageWatermark } from 'watermark-js-plus' // import watermark plugin

const imgDom = document.querySelector('.text-watermark-image');
await imgDom.decode()

const watermark = new ImageWatermark({
  content: 'my text watermark',
  width: imgDom.width,
  height: imgDom.height,
  dom: imgDom,
  rotate: 0,
  translatePlacement: 'bottom-end',
  fontColor: '#fff',
  globalAlpha: 0.5,
  fontSize: '30px',
  crossOrigin: true
})

await watermark.create() // 添加水印

watermark.destroy() // 删除水印
```

## 图片水印

```html
<img class="image-watermark-image" src="https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/402413381-a24bd4a5-c4e0-45d6-b8ce-94e99e29a111-dowV4C.png" crossorigin="anonymous">
```

```js
import { ImageWatermark } from 'watermark-js-plus' // import watermark plugin

const imgDom = document.querySelector('.image-watermark-image');
await imgDom.decode()

const watermark = new ImageWatermark({
  contentType: 'image',
  image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
  imageWidth: 200,
  width: imgDom.width,
  height: imgDom.height,
  dom: imgDom,
  rotate: 0,
  translatePlacement: 'bottom-end',
  crossOrigin: true
})

await watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
