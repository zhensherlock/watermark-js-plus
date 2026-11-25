---
url: https://zhensherlock.github.io/watermark-js-plus/guide/watermark.md
description: >-
  Add configurable text, image, rich-text, moving, and container watermarks to
  browser pages with the Watermark API.
---

# Watermark

Use the [Watermark Configurator](/tools/watermark-configurator) to adjust options interactively and generate initialization code. For precise API details, see [Watermark options](/config/) and [Watermark methods](/config/function).

## Text Watermark

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  rotate: 22,
  layout: 'grid',
  gridLayoutOptions: {
    rows: 2,
    cols: 2,
    gap: [20, 20],
    matrix: [[1, 0], [0, 1]]
  },
  advancedStyle: {
    type: 'linear',
    colorStops: [
      {
        offset: 0,
        color: 'red'
      },
      {
        offset: 1,
        color: 'blue'
      }
    ]
  },
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```

## Multiline Text Watermark

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
  contentType: 'multi-line-text',
  content: 'multi text watermark',
  fontSize: '30px',
  width: 200,
  height: 200,
  shadowStyle: {
    shadowBlur: 10,
    shadowColor: '#000000FF',
    shadowOffsetX: 0,
    shadowOffsetY: 0
  },
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```

## Image Watermark

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
  contentType: 'image',
  image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
  width: 300,
  height: 300,
  imageWidth: 100, // image width
  // imageHeight: 20, // image height
  filter: 'grayscale(100%)', // graylevel
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```

## Rich Text Watermark

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
  contentType: 'rich-text',
  content: '<div style="background: #ccc;display: flex;flex-direction: column;"><div>how <span style="color: #f00;margin-left: 5px;">nice</span></div><img src="https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png" width="100px"></div>',
  width: 300,
  height: 300,
  filter: 'blur(2px)',
  movable: true,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```

## Child Element Watermark

> You need to **manually set the `position` style** for the parent DOM element, for example: `position: relative`.

```js
import { Watermark } from 'watermark-js-plus' // import watermark plugin

const watermark = new Watermark({
  parent: '.parent-element',
  width: 180,
  height: 180,
  textRowMaxWidth: 254,
  backgroundRepeat: 'no-repeat',
  zIndex: 900,
  movable: true
})

watermark.create() // add watermark

watermark.destroy() // remove watermark
```
