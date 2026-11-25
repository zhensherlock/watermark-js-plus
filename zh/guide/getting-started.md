---
url: https://zhensherlock.github.io/watermark-js-plus/zh/guide/getting-started.md
description: 使用 npm、yarn 或固定版本的 CDN 脚本安装 watermark-js-plus，并创建第一个浏览器水印。
---

# 开始使用

## 安装

使用 npm:

```bash
$ npm install watermark-js-plus
```

使用 yarn:

```bash
$ yarn add watermark-js-plus
```

## 用法

1. 引入水印插件

```ts
import { Watermark } from 'watermark-js-plus'
```

2. 创建实例

```ts
const watermark = new Watermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    // success callback
  }
})
```

3. 添加水印到页面

```ts
watermark.create()
```

## CDN 引入

使用 jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/watermark-js-plus@1.6.7/dist/index.iife.min.js"></script>
```

使用 unpkg CDN:

```html
<script src="https://unpkg.com/watermark-js-plus@1.6.7/dist/index.iife.min.js"></script>
```

使用示例:

```ts
const watermark = new WatermarkPlus.Watermark({
  content: 'hello my watermark',
  width: 200,
  height: 200
})
watermark.create();
```
