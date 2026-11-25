---
url: https://zhensherlock.github.io/watermark-js-plus/guide/image.md
description: >-
  Render text or image watermarks directly into existing browser images with the
  ImageWatermark API.
---

# Image Watermark

For precise API details, see [ImageWatermark options](/config/#image-watermark-options) and the applicable methods in [Watermark methods](/config/function).

## Text Watermark

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

await watermark.create() // add watermark

watermark.destroy() // remove watermark
```

[//]: # "  <img class=\"text-watermark-image\" src=\"https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/402413381-a24bd4a5-c4e0-45d6-b8ce-94e99e29a111-dowV4C.png\">"

## Image Watermark

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

await watermark.create() // add watermark

watermark.destroy() // remove watermark
```
