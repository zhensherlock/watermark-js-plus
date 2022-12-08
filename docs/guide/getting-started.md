---
layout: doc
---

# Getting Started

## Installing

Using npm:

```bash
$ npm install watermark-js-plus
```

[//]: # (Using bower:)

[//]: # ()
[//]: # (```bash)

[//]: # ($ bower install watermark-js-plus)

[//]: # (```)

Using yarn:

```bash
$ yarn add watermark-js-plus
```

[//]: # ()
[//]: # (Using jsDelivr CDN:)

[//]: # ()
[//]: # (```html)

[//]: # (<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>)

[//]: # (```)

[//]: # ()
[//]: # (Using unpkg CDN:)

[//]: # ()
[//]: # (```html)

[//]: # (<script src="https://unpkg.com/axios/dist/axios.min.js"></script>)

[//]: # (```)

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
