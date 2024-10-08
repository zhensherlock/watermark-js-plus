---
layout: doc
---

<el-backtop></el-backtop>

# 开始

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
2. 实例化
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
3. 添加水印
```ts
watermark.create()
```

## CDN

使用 jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/watermark-js-plus/dist/index.iife.min.js"></script>
```

使用 unpkg CDN:

```html
<script src="https://unpkg.com/watermark-js-plus/dist/index.iife.min.js"></script>
```

用法

```ts
const watermark = new WatermarkPlus.Watermark({
  content: 'hello my watermark',
  width: 200,
  height: 200
})
watermark.create();
```
