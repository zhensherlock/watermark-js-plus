---
url: https://zhensherlock.github.io/watermark-js-plus/guide/getting-started.md
description: >-
  Install watermark-js-plus and add your first browser watermark with npm, yarn,
  or a version-pinned CDN script.
---

# Getting Started

## Installation

Using npm:

```bash
$ npm install watermark-js-plus
```

Using yarn:

```bash
$ yarn add watermark-js-plus
```

## Basic Usage

1. Import watermark plugin

```ts
import { Watermark } from 'watermark-js-plus'
```

2. Create instance

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

3. Add watermark to page

```ts
watermark.create()
```

## CDN Usage

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/watermark-js-plus@1.6.7/dist/index.iife.min.js"></script>
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/watermark-js-plus@1.6.7/dist/index.iife.min.js"></script>
```

Usage example:

```ts
const watermark = new WatermarkPlus.Watermark({
  content: 'hello my watermark',
  width: 200,
  height: 200
})
watermark.create();
```
