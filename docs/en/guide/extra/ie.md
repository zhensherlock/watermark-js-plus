---
layout: doc
description: Use the Internet Explorer build and blind-decoding fallbacks for legacy browser support.
---

<el-backtop></el-backtop>

# Legacy Browser Support
This plugin supports IE11 and partially supports IE10 and IE9.

## NPM
```ts
import { Watermark } from 'watermark-js-plus/ie'
```

> This ensures compatibility with IE11 and partial support for IE10 and IE9.

## Blind watermark decoding
The IE build includes a software fallback for the `overlay` and `color-burn` canvas blend modes used by blind watermark decoding. The regular build does not include this fallback, so use the `/ie` entry when decoding blind watermarks in IE11.


## CDN
```html
<!-- import JavaScript -->
<script src="https://www.unpkg.com/watermark-js-plus@1.6.7/dist/ie/index.iife.min.js"></script>
```

> We recommend our users to lock version when using CDN. Please refer to [unpkg.com](https://unpkg.com/) for more information.

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/sunzhenxuan/embed/JjQMryG?default-tab=html&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
