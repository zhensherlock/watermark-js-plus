---
layout: doc
---

<el-backtop></el-backtop>

# Getting Started

## Installing

Using npm:

```bash
$ npm install watermark-js-plus
```

Using yarn:

```bash
$ yarn add watermark-js-plus
```

## Usage

1. Import watermark plugin
```ts
import { Watermark } from 'watermark-js-plus'
```
2. instantiation
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
3. Add a watermark to the web page
```ts
watermark.create()
```

## CDN

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/watermark-js-plus/dist/index.iife.min.js"></script>
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/watermark-js-plus/dist/index.iife.min.js"></script>
```

Usage

```ts
const watermark = new WatermarkPlus.Watermark({
  content: 'hello my watermark',
  width: 200,
  height: 200
})
watermark.create();
```
