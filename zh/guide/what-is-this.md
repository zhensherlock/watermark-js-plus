---
url: https://zhensherlock.github.io/watermark-js-plus/zh/guide/what-is-this.md
description: 了解如何使用 watermark-js-plus 的框架无关 TypeScript API，为浏览器页面添加可见水印、图片水印和暗水印。
---

# watermark-js-plus 是什么？

`watermark-js-plus` 是一个轻量、基于 Canvas 的 TypeScript 浏览器水印库。它可以直接用于原生 JavaScript 和各种前端框架，无需安装框架专用适配器。

你可以用它为页面或指定容器添加可见水印、将水印直接绘制到现有图片中，或者创建低透明度暗水印并从截图或图片中将其显现。

## 三种水印能力

* **可见水印** — 为整个页面或指定容器添加文本、多行文本、图片或富文本水印，支持灵活布局、样式、运行时更新及可选的 DOM 防篡改恢复。
* **图片水印** — 在浏览器中将文本或图片水印直接绘制到现有 `<img>` 元素。
* **暗水印** — 添加低透明度水印，并通过内置解码能力从截图或图片中进行视觉增强和显现。

## 面向前端开发

* **框架无关** — 使用同一套浏览器 API 接入原生 JavaScript、React、Vue、Angular、Svelte 等前端项目。
* **TypeScript 优先** — 为配置项和生命周期 API 提供完整的公共类型声明。
* **ES 模块支持** — 现代构建工具可以直接使用标准包入口；需要明确使用 ES 模块时，也可以从保留模块结构的 `watermark-js-plus/es` 入口导入。详见 [ES 模块导入](/zh/guide/extra/on-demand)。

## 浏览器兼容性

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
|:-------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------:|
|                                             最新版 ✔                                              |                                               最新版 ✔                                               |                                             最新版 ✔                                              |                                            最新版 ✔                                            |                                          最新版 ✔                                           |                                                        11（使用 `/ie`）✔                                                           |

默认包入口面向现代浏览器。如需支持 IE11，以及部分支持 IE10 和 IE9，请使用专门的旧版浏览器入口：

```ts
import { Watermark } from 'watermark-js-plus/ie'
```

具体用法及暗水印解码兼容性说明参见[旧版浏览器支持](/zh/guide/extra/ie)。
