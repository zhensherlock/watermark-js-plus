<p align="center">
  <a href="https://zhensherlock.github.io/watermark-js-plus/" target="_blank" rel="noopener noreferrer">
    <img width="300" src="https://zhensherlock.github.io/watermark-js-plus/hero-image.png" alt="watermark logo">
  </a>
</p>

<div align="center">

[![][npm-release-shield]][npm-release-link]
[![][npm-downloads-shield]][npm-downloads-link]
[![][package-size-shield]][package-size-link]
[![][codecov-shield]][codecov-link] <br/>
[![][github-release-date-shield]][github-release-date-link]
[![][github-action-build-shield]][github-action-build-link]
[![][github-license-shield]][github-license-link]
[![][gitter-shield]][gitter-link]

[//]: # (  <a href="https://npmjs.com/package/watermark-js-plus"><img src="https://badgen.net/npm/v/watermark-js-plus" alt="npm package"></a>)
[//]: # (  <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/zhensherlock/watermark-js-plus/deploy.yml?branch=main">)
[//]: # (  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/watermark-js-plus">)
[//]: # (  <img alt="npm download week" src="https://img.shields.io/npm/dw/watermark-js-plus">)
[//]: # (  <img alt="GitHub" src="https://img.shields.io/github/license/zhensherlock/watermark-js-plus">)
[//]: # (  <a href="https://gitter.im/china-hy/watermark-js-plus?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img src="https://badges.gitter.im/china-hy/watermark-js-plus.svg" alt="Join the chat at https://gitter.im/china-hy/watermark-js-plus"></a>)

</div>

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

## Maintainers

[@zhensherlock](https://github.com/zhensherlock).

## Contributing

Feel free to dive in! [Open an issue](https://github.com/zhensherlock/watermark-js-plus/issues/new/choose) or submit PRs.

Standard Readme follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

### Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/zhensherlock/watermark-js-plus/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=zhensherlock/watermark-js-plus" />
</a>

## License

[MIT](LICENSE) © MichaelSun

[npm-release-link]: https://www.npmjs.com/package/watermark-js-plus
[npm-release-shield]: https://img.shields.io/npm/v/watermark-js-plus?color=1677FF&labelColor=black&logo=npm&logoColor=white&style=flat-square
[npm-downloads-link]: https://www.npmjs.com/package/watermark-js-plus
[npm-downloads-shield]: https://img.shields.io/npm/dw/watermark-js-plus.svg?labelColor=black&style=flat-square&color=1677FF
[package-size-link]: https://github.com/zhensherlock/watermark-js-plus
[package-size-shield]: https://img.shields.io/bundlephobia/minzip/watermark-js-plus?color=1677FF&label=build&labelColor=black&logo=rollupdotjs&logoColor=white&style=flat-square
[codecov-link]: https://codecov.io/gh/zhensherlock/watermark-js-plus
[codecov-shield]: https://img.shields.io/codecov/c/github/zhensherlock/watermark-js-plus?color=1677FF&labelColor=black&style=flat-square&logo=codecov&logoColor=white
[github-release-date-link]: https://github.com/zhensherlock/watermark-js-plus/releases
[github-release-date-shield]: https://img.shields.io/github/release-date/zhensherlock/watermark-js-plus?color=1677FF&labelColor=black&style=flat-square
[github-action-build-link]: https://github.com/zhensherlock/watermark-js-plus/actions/workflows/deploy.yml
[github-action-build-shield]: https://img.shields.io/github/actions/workflow/status/zhensherlock/watermark-js-plus/deploy.yml?branch=main&color=1677FF&label=build&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-license-link]: https://github.com/zhensherlock/watermark-js-plus/blob/main/LICENSE
[github-license-shield]: https://img.shields.io/github/license/zhensherlock/watermark-js-plus?color=1677FF&labelColor=black&style=flat-square
[gitter-link]: https://gitter.im/china-hy/watermark-js-plus?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[gitter-shield]: https://img.shields.io/gitter/room/china-hy/watermark-js-plus?color=1677FF&labelColor=black&logo=gitter&logoColor=white&style=flat-square
