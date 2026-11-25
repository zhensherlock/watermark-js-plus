---
url: https://zhensherlock.github.io/watermark-js-plus/zh/guide/watermark.md
description: 使用 Watermark API 为浏览器页面添加可配置的文本、图片、富文本、动态和容器水印。
---

# Watermark

使用[水印配置生成器](/zh/tools/watermark-configurator)可以交互式调整参数并生成初始化代码。精确的 API 说明参见 [Watermark 配置项](/zh/config/)和 [Watermark 方法](/zh/config/function)。

## 文本水印

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

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

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```

## 多行文本水印

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

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

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```

## 图片水印

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new Watermark({
  contentType: 'image',
  image: 'https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png',
  width: 300,
  height: 300,
  imageWidth: 100, // 图片宽度
  // imageHeight: 20, // 图片高度
  filter: 'grayscale(100%)', // 灰阶
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```

## 富文本水印

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new Watermark({
  contentType: 'rich-text',
  content: '<div style="background: #ccc;display: flex;flex-direction: column;"><div>太<span style="color: #f00">棒</span>了</div><img src="https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png" width="100px"></div>',
  width: 300,
  height: 300,
  filter: 'blur(2px)',
  movable: true,
  onSuccess: () => {
    // success callback
  }
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```

## 子元素水印

> 你需要**手动设置父级DOM元素的 `position` 样式**，例如：`position: relative`。

```js
import { Watermark } from 'watermark-js-plus' // 引入水印插件

const watermark = new Watermark({
  parent: '.parent-element',
  width: 180,
  height: 180,
  textRowMaxWidth: 254,
  backgroundRepeat: 'no-repeat',
  zIndex: 900,
  movable: true
})

watermark.create() // 添加水印

watermark.destroy() // 删除水印
```
