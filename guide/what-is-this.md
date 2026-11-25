---
url: https://zhensherlock.github.io/watermark-js-plus/guide/what-is-this.md
description: >-
  Learn how watermark-js-plus adds visible, image, and blind watermarks to
  browser pages with framework-agnostic TypeScript APIs.
---

# What is watermark-js-plus?

`watermark-js-plus` is a lightweight, Canvas-based TypeScript library for adding watermarks in the browser. It works with vanilla JavaScript and frontend frameworks without requiring a framework-specific adapter.

Use it to add visible watermarks to pages and containers, render watermarks directly into existing images, or create and reveal low-opacity blind watermarks.

## Three Watermark Capabilities

* **Visible watermarks** — Add text, multi-line text, images, or rich text to an entire page or a specific container, with flexible layouts, styling, runtime updates, and optional DOM tamper recovery.
* **Image watermarks** — Render text or image watermarks directly into an existing `<img>` element in the browser.
* **Blind watermarks** — Add low-opacity watermarks and visually enhance them from screenshots or images with built-in decoding.

## Built for Frontend Development

* **Framework agnostic** — Use the same browser API with vanilla JavaScript, React, Vue, Angular, Svelte, and other frontend frameworks.
* **TypeScript first** — Use complete public type declarations for configuration and lifecycle APIs.
* **ES module support** — Import from the standard package entry with modern bundlers, or use the preserved-module `watermark-js-plus/es` entry when you need explicit ES module imports. See [ES Module Imports](/guide/extra/on-demand).

## Browser Support

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
|:-------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------:|
|                                             Latest ✔                                              |                                               Latest ✔                                               |                                             Latest ✔                                              |                                            Latest ✔                                            |                                          Latest ✔                                           |                                                            11 with `/ie` ✔                                                             |

The default package entry targets modern browsers. For IE11 and partial IE10/IE9 support, use the dedicated legacy-browser entry:

```ts
import { Watermark } from 'watermark-js-plus/ie'
```

See [Legacy Browser Support](/guide/extra/ie) for usage and blind-watermark decoding compatibility.
