<p align="center">
  <a href="https://zhensherlock.github.io/watermark-js-plus/" target="_blank" rel="noopener noreferrer">
    <img width="300" src="https://zhensherlock.github.io/watermark-js-plus/hero-image.png" alt="watermark logo">
  </a>
</p>
<p align="center">
  <a href="https://npmjs.com/package/watermark-js-plus"><img src="https://badgen.net/npm/v/watermark-js-plus" alt="npm package"></a>
  <a href="https://github.com/vuejs/pinia/actions/workflows/test.yml?query=branch%3Av2"><img src="https://github.com/vuejs/pinia/workflows/test/badge.svg?branch=v2" alt="build status"></a>
  <a href="https://codecov.io/github/vuejs/pinia"><img src="https://badgen.net/codecov/c/github/vuejs/pinia/v2" alt="code coverage"></a>
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
