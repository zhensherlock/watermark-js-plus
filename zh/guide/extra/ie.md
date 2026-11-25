---
url: https://zhensherlock.github.io/watermark-js-plus/zh/guide/extra/ie.md
description: 使用 Internet Explorer 构建和暗水印解码回退支持旧版浏览器。
---

# 旧版浏览器支持

支持IE11，部分支持IE10和IE9。

## NPM

```ts
import { Watermark } from 'watermark-js-plus/ie'
```

> 如果需要支持 Internet Explorer (IE)，请使用专门针对 IE 的版本

## 暗水印解析

IE 版本为暗水印解析使用的 `overlay` 和 `color-burn` Canvas 混合模式提供了软件回退实现。普通版本不会包含这部分代码，因此在 IE11 中解析暗水印时需要使用 `/ie` 入口。

## CDN

```html
<!-- import JavaScript -->
<script src="https://www.unpkg.com/watermark-js-plus@1.6.7/dist/ie/index.iife.min.js"></script>
```

> 我们建议使用 CDN 引入用户在链接地址上锁定版本，以免将来插件升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com/)。
