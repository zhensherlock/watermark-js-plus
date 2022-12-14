<p align="center">
  <a href="https://zhensherlock.github.io/watermark-js-plus/" target="_blank" rel="noopener noreferrer">
    <img width="300" src="https://zhensherlock.github.io/watermark-js-plus/hero-image.png" alt="watermark logo">
  </a>
</p>
<p align="center">
  <a href="https://npmjs.com/package/watermark-js-plus"><img src="https://badgen.net/npm/v/watermark-js-plus" alt="npm package"></a>
</p>

# Watermark

> This is a *canvas-based* watermark for browser.

- 🛠️ Rich Features
- 🔑 Fully Typed APIs
- 📦️ Extremely light

Watermark works with both Vue 2 , Vue 3 And React.

# Translations

* [中文文档](README_zh.md)

## Installing

```bash
# or pnpm or yarn
npm install watermark-js-plus
```

## Usage

### Watermark

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

### Blind Watermark

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

### Decode Blind Watermark

```js
import { BlindWatermark } from 'watermark-js-plus'

BlindWatermark.decode({
  url: uploadFile.url, // image url
  onSuccess: (imageBase64) => {
    // success callback
  }
})
```

## Documentation

To learn more, check [its documentation](https://zhensherlock.github.io/watermark-js-plus).

## License

[MIT](LICENSE).
