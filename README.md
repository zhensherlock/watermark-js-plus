<p align="center">
  <a href="https://zhensherlock.github.io/watermark-js-plus/" target="_blank" rel="noopener noreferrer">
    <img width="960" src="https://raw.githubusercontent.com/zhensherlock/watermark-js-plus/main/docs/public/readme-hero.webp" alt="watermark-js-plus browser watermarking illustration">
  </a>
</p>

<h1 align="center">watermark-js-plus</h1>

<p align="center">
  A lightweight, framework-agnostic browser watermark library with visible, image, and blind watermarks.
</p>

<p align="center">
  <a href="https://zhensherlock.github.io/watermark-js-plus/guide/getting-started.html">Documentation</a> ·
  <a href="https://zhensherlock.github.io/watermark-js-plus/guide/extra/examples.html">Live examples</a> ·
  <a href="https://zhensherlock.github.io/watermark-js-plus/config/">Configuration</a> ·
  <a href="https://github.com/zhensherlock/watermark-js-plus/discussions">Discussions</a> ·
  <a href="https://github.com/zhensherlock/watermark-js-plus/blob/main/CHANGELOG.md">Changelog</a>
</p>

<p align="center">
  English · <a href="https://github.com/zhensherlock/watermark-js-plus/blob/main/README_zh.md">简体中文</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/watermark-js-plus"><img src="https://img.shields.io/npm/v/watermark-js-plus?color=1677FF&labelColor=black&logo=npm&logoColor=white&style=flat-square" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/watermark-js-plus"><img src="https://img.shields.io/npm/dw/watermark-js-plus.svg?labelColor=black&style=flat-square&color=1677FF" alt="weekly npm downloads"></a>
  <a href="https://bundlephobia.com/package/watermark-js-plus"><img src="https://img.shields.io/bundlephobia/minzip/watermark-js-plus?color=1677FF&label=min%2Bgzip&labelColor=black&logo=rollupdotjs&logoColor=white&style=flat-square" alt="minified and gzipped bundle size"></a>
  <a href="https://github.com/zhensherlock/watermark-js-plus/actions/workflows/build.yml"><img src="https://img.shields.io/github/actions/workflow/status/zhensherlock/watermark-js-plus/build.yml?branch=main&color=1677FF&label=build&labelColor=black&logo=githubactions&logoColor=white&style=flat-square" alt="build status"></a>
  <a href="https://codecov.io/gh/zhensherlock/watermark-js-plus"><img src="https://img.shields.io/codecov/c/github/zhensherlock/watermark-js-plus?color=1677FF&labelColor=black&style=flat-square&logo=codecov&logoColor=white" alt="test coverage"></a>
  <a href="https://github.com/zhensherlock/watermark-js-plus/blob/main/LICENSE"><img src="https://img.shields.io/github/license/zhensherlock/watermark-js-plus?color=1677FF&labelColor=black&style=flat-square" alt="license"></a>
</p>

## Overview

`watermark-js-plus` is a canvas-based TypeScript library for adding watermarks in the browser. It works with vanilla JavaScript and frontend frameworks without requiring a framework-specific adapter.

Use it to protect a page or container with a visible watermark, render a watermark directly into an existing image, or create and reveal low-opacity blind watermarks. The library also supports runtime updates, grid layouts, rich styling, and automatic recovery from common DOM tampering.

## Features

- **Three focused APIs** — page and container watermarks, image watermarks, and blind watermarks.
- **Rich content** — text, multi-line text, images, and rich text.
- **Flexible layouts** — default and configurable grid layouts with precise positioning.
- **Advanced styling** — opacity, rotation, typography, shadows, gradients, patterns, filters, and animation.
- **Lifecycle control** — create, update, check, and destroy watermark instances at runtime.
- **Tamper recovery** — optional `MutationObserver` monitoring recreates modified or removed watermark nodes.
- **TypeScript-first** — complete public type declarations are included.
- **Multiple delivery formats** — ESM, CommonJS, UMD, IIFE, CDN, and a dedicated legacy-browser entry.

## Choose an API

| Export           | Use case                                                           | Guide                                                                                                  |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `Watermark`      | Add a watermark over the page or a specific container              | [Page and container watermarks](https://zhensherlock.github.io/watermark-js-plus/guide/watermark.html) |
| `ImageWatermark` | Render text or an image watermark into an existing `<img>` element | [Image watermarks](https://zhensherlock.github.io/watermark-js-plus/guide/image.html)                  |
| `BlindWatermark` | Create a low-opacity watermark and reveal it from a captured image | [Blind watermarks](https://zhensherlock.github.io/watermark-js-plus/guide/blind-watermark.html)        |

## Installation

```bash
npm install watermark-js-plus
```

```bash
pnpm add watermark-js-plus
```

```bash
yarn add watermark-js-plus
```

## Quick start

```ts
import { Watermark } from 'watermark-js-plus'

const watermark = new Watermark({
  content: 'Confidential',
  width: 220,
  height: 160,
  rotate: 22,
  globalAlpha: 0.15,
})

await watermark.create()
```

Pass a selector or an element through `parent` to scope the watermark to a specific container. The target container must establish a positioning context, for example with `position: relative`:

```css
#report {
  position: relative;
}
```

```ts
const watermark = new Watermark({
  parent: '#report',
  content: 'Internal use only',
})

await watermark.create()
```

Update or remove an existing watermark with its lifecycle methods:

```ts
await watermark.changeOptions({ content: 'Updated watermark' }, 'append')

const exists = await watermark.check()

watermark.destroy()
```

## Optimized ESM imports

Most applications should use the standard `watermark-js-plus` entry shown above. If your bundler supports tree-shaking, you can use the preserved-module ESM entry to help it exclude unused modules:

```ts
import { Watermark } from 'watermark-js-plus/es'
```

The ESM entry also exports `BlindWatermark` and `ImageWatermark`. When using `movable: true`, import the stylesheet separately:

```ts
import 'watermark-js-plus/style.css'
```

See the [optimized imports guide](https://zhensherlock.github.io/watermark-js-plus/guide/extra/on-demand.html) for details.

## Blind watermark decoding

`BlindWatermark.decode()` enhances a blind watermark contained in an image and returns the processed image as a data URL:

```ts
import { BlindWatermark } from 'watermark-js-plus'

BlindWatermark.decode({
  url: '/images/blind-watermark.png',
  onSuccess: (imageBase64: string) => {
    const decodedImage = new Image()
    decodedImage.src = imageBase64
    decodedImage.alt = 'Decoded blind watermark'
    document.body.appendChild(decodedImage)
  },
})
```

## CDN

Pin the package version when loading it from a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/watermark-js-plus@1.6.6/dist/index.iife.min.js"></script>
<script>
  const watermark = new WatermarkPlus.Watermark({
    content: 'Confidential',
  })

  watermark.create()
</script>
```

## Framework and browser support

The core package is framework-agnostic. Live examples are available for vanilla JavaScript, React, Next.js, Remix, Vue 2, Vue 3, Nuxt, Quasar, Angular, SvelteKit, Astro, IIFE, and Webpack.

Watermark rendering requires browser DOM and Canvas APIs. In SSR applications, create the watermark in a client-side lifecycle hook such as `useEffect()` or `onMounted()`.

The default entry targets modern browsers. Use the dedicated entry for IE11 and partial IE10/IE9 compatibility, including the blind-watermark decode fallback introduced in v1.6.6:

```ts
import { Watermark } from 'watermark-js-plus/ie'
```

See the [legacy-browser guide](https://zhensherlock.github.io/watermark-js-plus/guide/extra/ie.html) for details.

## Important limitations

- DOM tamper recovery is a best-effort deterrent, not a security boundary or DRM system. A user with full control of the page runtime can still bypass it.
- Blind watermark visibility depends on screenshot scaling, image compression, display characteristics, and background colors.
- `BlindWatermark.decode()` reveals the watermark visually; it does not extract the original text as structured data.
- Cross-origin images must provide suitable CORS headers before Canvas can safely export the result.

## Documentation and examples

- [Getting started](https://zhensherlock.github.io/watermark-js-plus/guide/getting-started.html)
- [Configuration reference](https://zhensherlock.github.io/watermark-js-plus/config/)
- [Core API lifecycle](https://zhensherlock.github.io/watermark-js-plus/config/function.html)
- [Optimized ESM imports](https://zhensherlock.github.io/watermark-js-plus/guide/extra/on-demand.html)
- [Live framework examples](https://zhensherlock.github.io/watermark-js-plus/guide/extra/examples.html)
- [Demo collection](https://github.com/zhensherlock/watermark-js-plus/discussions/590)
- [Vben Admin](https://doc.vben.pro/en/guide/in-depth/features.html#page-watermark) uses `watermark-js-plus` for its page watermark feature.

## Contributing

Contributions are welcome. Read the [contribution guide](https://github.com/zhensherlock/watermark-js-plus/blob/main/CONTRIBUTING.md), [open an issue](https://github.com/zhensherlock/watermark-js-plus/issues/new/choose), or start a [discussion](https://github.com/zhensherlock/watermark-js-plus/discussions).

Please follow the project [Code of Conduct](https://github.com/zhensherlock/watermark-js-plus/blob/main/CODE_OF_CONDUCT.md) when participating.

### Contributors

Thanks to everyone who has contributed to `watermark-js-plus`.

<a href="https://github.com/zhensherlock/watermark-js-plus/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=zhensherlock/watermark-js-plus" alt="watermark-js-plus contributors">
</a>

## Maintainer

[@zhensherlock](https://github.com/zhensherlock)

## License

[MIT](LICENSE) © Michael Sun
