<p align="center">
  <a href="https://zhensherlock.github.io/watermark-js-plus/" target="_blank" rel="noopener noreferrer">
    <img width="300" src="https://zhensherlock.github.io/watermark-js-plus/hero-image.png" alt="watermark logo">
  </a>
</p>
<p align="center">
  <a href="https://npmjs.com/package/watermark-js-plus"><img src="https://badgen.net/npm/v/watermark-js-plus" alt="npm package"></a>
  <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/zhensherlock/watermark-js-plus/deploy.yml?branch=main">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/watermark-js-plus">
  <img alt="npm download week" src="https://img.shields.io/npm/dw/watermark-js-plus">
  <img alt="GitHub" src="https://img.shields.io/github/license/zhensherlock/watermark-js-plus">
  <a href="https://gitter.im/china-hy/watermark-js-plus?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img src="https://badges.gitter.im/china-hy/watermark-js-plus.svg" alt="Join the chat at https://gitter.im/china-hy/watermark-js-plus"></a>
</p>

# Watermark

> 这是一个基于 *canvas* 画布的水印库，作用于浏览器中。

- 🛠️ 丰富的功能
- 🔑 完全类型化的API
- 📦️ 极致轻量化

同时支持 Vue 2、Vue 3和React。

## 安装

```bash
# or pnpm or yarn
npm install watermark-js-plus
```

## 用法

### 普通水印

```ts
import { Watermark } from 'watermark-js-plus'

const watermark = new Watermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    // success callback
  }
})

watermark.create()
```

### 暗水印

```ts
import { BlindWatermark } from 'watermark-js-plus'

const watermark = new BlindWatermark({
  content: 'hello my watermark',
  width: 200,
  height: 200,
  onSuccess: () => {
    // success callback
  }
})

watermark.create()
```

### 解析暗水印

```js
import { BlindWatermark } from 'watermark-js-plus'

BlindWatermark.decode({
  url: uploadFile.url, // image url
  onSuccess: (imageBase64) => {
    // success callback
  }
})
```

## 文档

要了解更多，请查看[文档](https://zhensherlock.github.io/watermark-js-plus)

## License

[MIT](LICENSE).
