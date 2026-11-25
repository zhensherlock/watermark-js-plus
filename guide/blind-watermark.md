---
url: https://zhensherlock.github.io/watermark-js-plus/guide/blind-watermark.md
description: >-
  Create low-opacity blind watermarks and reveal them from screenshots or images
  with the BlindWatermark API.
---

# Blind Watermark

`BlindWatermark` inherits the content, layout, and lifecycle capabilities of `Watermark`, but always uses `globalAlpha: 0.005` and `mode: 'blind'`. See [BlindWatermark options](/config/blind) for the exact enforced values.

## Text Blind Watermark

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

👉 Add parameters for dark background：`fontColor: '#fff'`&#xA;&#xA;
\<VPButton text="Add Text Blind Watermark" @click="handleAddTextBlindWatermark">
\<VPButton text="Update Text Blind Watermark" @click="handleUpdateTextBlindWatermark">
\<VPButton text="Remove Text Blind Watermark" @click="handleRemoveTextBlindWatermark">&#xA;&#xA;

## Multiline Text Blind Watermark

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new BlindWatermark({
  contentType: 'multi-line-text',
  content: 'hello my multiline blind watermark',
  fontSize: '30px',
  width: 200,
  height: 200,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```

👉 Add parameters for dark background：`fontColor: '#fff'`&#xA;&#xA;
\<VPButton text="Add Multiline Text Blind Watermark" @click="handleAddMultiLineTextBlindWatermark">
\<VPButton text="Remove Multiline Text Blind Watermark" @click="handleRemoveMultiLineTextBlindWatermark">&#xA;&#xA;

## Image Blind Watermark

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new BlindWatermark({
  contentType: 'image',
  image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
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

## Rich Text Blind Watermark

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

## Decode Blind Watermark

For the easiest workflow, open the [Blind Watermark Decoder](/tools/blind-watermark-decoder) to upload or paste an image, adjust the decode options, and preview the result.

Use `BlindWatermark.decode` when you need to integrate decoding into your own application. See [decode options](/config/blind-decode) for all available parameters.

The decoder loads the source image into a Canvas, repeatedly applies the selected composite operation and fill color, then returns the enhanced image as a PNG Data URL.

```js
import { BlindWatermark } from 'watermark-js-plus' // import watermark plugin

BlindWatermark.decode({
  compositeOperation: 'overlay',
  compositeTimes: 4,
  url: uploadFile.url, // image url
  onSuccess: (imageBase64) => {
    // success callback
  }
})
```
