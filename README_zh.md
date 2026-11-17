<p align="center">
  <a href="https://zhensherlock.github.io/watermark-js-plus/zh/" target="_blank" rel="noopener noreferrer">
    <img width="960" src="https://raw.githubusercontent.com/zhensherlock/watermark-js-plus/main/docs/public/readme-hero.webp" alt="watermark-js-plus 浏览器水印宣传图">
  </a>
</p>

<h1 align="center">watermark-js-plus</h1>

<p align="center">
  一个轻量、框架无关的浏览器水印库，支持可见水印、图片水印和暗水印。
</p>

<p align="center">
  <a href="https://zhensherlock.github.io/watermark-js-plus/zh/guide/getting-started.html">使用文档</a> ·
  <a href="https://zhensherlock.github.io/watermark-js-plus/zh/guide/extra/examples.html">在线示例</a> ·
  <a href="https://zhensherlock.github.io/watermark-js-plus/zh/config/">配置参考</a> ·
  <a href="https://github.com/zhensherlock/watermark-js-plus/discussions">讨论区</a> ·
  <a href="https://github.com/zhensherlock/watermark-js-plus/blob/main/CHANGELOG.md">更新日志</a>
</p>

<p align="center">
  <a href="https://github.com/zhensherlock/watermark-js-plus#readme">English</a> · 简体中文
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/watermark-js-plus"><img src="https://img.shields.io/npm/v/watermark-js-plus?color=1677FF&labelColor=black&logo=npm&logoColor=white&style=flat-square" alt="npm 版本"></a>
  <a href="https://www.npmjs.com/package/watermark-js-plus"><img src="https://img.shields.io/npm/dw/watermark-js-plus.svg?labelColor=black&style=flat-square&color=1677FF" alt="npm 每周下载量"></a>
  <a href="https://bundlephobia.com/package/watermark-js-plus"><img src="https://img.shields.io/bundlephobia/minzip/watermark-js-plus?color=1677FF&label=min%2Bgzip&labelColor=black&logo=rollupdotjs&logoColor=white&style=flat-square" alt="压缩后的包体积"></a>
  <a href="https://github.com/zhensherlock/watermark-js-plus/actions/workflows/build.yml"><img src="https://img.shields.io/github/actions/workflow/status/zhensherlock/watermark-js-plus/build.yml?branch=main&color=1677FF&label=build&labelColor=black&logo=githubactions&logoColor=white&style=flat-square" alt="构建状态"></a>
  <a href="https://codecov.io/gh/zhensherlock/watermark-js-plus"><img src="https://img.shields.io/codecov/c/github/zhensherlock/watermark-js-plus?color=1677FF&labelColor=black&style=flat-square&logo=codecov&logoColor=white" alt="测试覆盖率"></a>
  <a href="https://github.com/zhensherlock/watermark-js-plus/blob/main/LICENSE"><img src="https://img.shields.io/github/license/zhensherlock/watermark-js-plus?color=1677FF&labelColor=black&style=flat-square" alt="开源许可"></a>
</p>

## 项目简介

`watermark-js-plus` 是一个基于 Canvas、使用 TypeScript 编写的浏览器水印库。它可以直接用于原生 JavaScript 和各种前端框架，不需要安装框架专用适配器。

你可以用它为整个页面或指定容器添加可见水印、将水印直接绘制到现有图片中，或者生成和显现低透明度暗水印。它还支持运行时更新、网格布局、丰富的样式配置，以及在常见 DOM 篡改后自动恢复水印。

## 主要特性

- **三类专用 API**：页面和容器水印、图片水印、暗水印。
- **丰富的内容类型**：文本、多行文本、图片和富文本。
- **灵活的布局能力**：默认布局和可配置的网格布局，支持精确定位。
- **高级样式**：透明度、旋转、字体、阴影、渐变、图案、滤镜和动画。
- **完整的生命周期**：可以在运行时创建、更新、检查和销毁水印。
- **防篡改恢复**：可选的 `MutationObserver` 监听会在水印节点被修改或删除后重新创建水印。
- **TypeScript 优先**：内置完整的公共类型声明。
- **多种交付格式**：支持 ESM、CommonJS、UMD、IIFE、CDN 和独立的旧版浏览器入口。

## 选择合适的 API

| 导出             | 适用场景                                     | 文档                                                                                       |
| ---------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `Watermark`      | 在整个页面或指定容器上方添加水印             | [页面和容器水印](https://zhensherlock.github.io/watermark-js-plus/zh/guide/watermark.html) |
| `ImageWatermark` | 将文本或图片水印绘制到现有 `<img>` 元素中    | [图片水印](https://zhensherlock.github.io/watermark-js-plus/zh/guide/image.html)           |
| `BlindWatermark` | 创建低透明度暗水印，并从截图或图片中将其显现 | [暗水印](https://zhensherlock.github.io/watermark-js-plus/zh/guide/blind-watermark.html)   |

## 安装

```bash
npm install watermark-js-plus
```

```bash
pnpm add watermark-js-plus
```

```bash
yarn add watermark-js-plus
```

## 快速开始

```ts
import { Watermark } from 'watermark-js-plus'

const watermark = new Watermark({
  content: '内部资料',
  width: 220,
  height: 160,
  rotate: 22,
  globalAlpha: 0.15,
})

await watermark.create()
```

通过 `parent` 传入选择器或 DOM 元素，可以将水印限制在指定容器内。目标容器需要建立定位上下文，例如设置 `position: relative`：

```css
#report {
  position: relative;
}
```

```ts
const watermark = new Watermark({
  parent: '#report',
  content: '仅限内部使用',
})

await watermark.create()
```

使用生命周期方法更新、检查或移除已有水印：

```ts
await watermark.changeOptions({ content: '更新后的水印' }, 'append')

const exists = await watermark.check()

watermark.destroy()
```

## 按需引入与 Tree Shaking

大多数应用可以继续使用上面的 `watermark-js-plus` 标准入口。如果构建工具支持 Tree Shaking，可以使用保留模块结构的 ESM 入口，帮助构建工具排除未使用的模块：

```ts
import { Watermark } from 'watermark-js-plus/es'
```

ESM 入口同时导出 `BlindWatermark` 和 `ImageWatermark`。使用 `movable: true` 时，还需要单独引入样式文件：

```ts
import 'watermark-js-plus/style.css'
```

更多说明请查看[按需引入指南](https://zhensherlock.github.io/watermark-js-plus/zh/guide/extra/on-demand.html)。

## 暗水印解析

`BlindWatermark.decode()` 可以增强图片中已有的暗水印，并通过 Data URL 返回处理后的图片：

```ts
import { BlindWatermark } from 'watermark-js-plus'

BlindWatermark.decode({
  url: '/images/blind-watermark.png',
  onSuccess: (imageBase64: string) => {
    const decodedImage = new Image()
    decodedImage.src = imageBase64
    decodedImage.alt = '暗水印解析结果'
    document.body.appendChild(decodedImage)
  },
})
```

## CDN 引入

通过 CDN 使用时，建议固定具体版本：

```html
<script src="https://cdn.jsdelivr.net/npm/watermark-js-plus@1.6.6/dist/index.iife.min.js"></script>
<script>
  const watermark = new WatermarkPlus.Watermark({
    content: '内部资料',
  })

  watermark.create()
</script>
```

## 框架和浏览器支持

核心包与框架无关。目前已提供原生 JavaScript、React、Next.js、Remix、Vue 2、Vue 3、Nuxt、Quasar、Angular、SvelteKit、Astro、IIFE 和 Webpack 在线示例。

水印渲染依赖浏览器的 DOM 和 Canvas API。在 SSR 应用中，请在 `useEffect()`、`onMounted()` 等客户端生命周期中创建水印。

默认入口面向现代浏览器。如需兼容 IE11，并部分兼容 IE10/IE9，请使用独立入口。v1.6.6 的 IE 构建还包含暗水印解析所需的混合模式软件回退：

```ts
import { Watermark } from 'watermark-js-plus/ie'
```

详情请查看[旧版浏览器使用说明](https://zhensherlock.github.io/watermark-js-plus/zh/guide/extra/ie.html)。

## 重要限制

- DOM 防篡改恢复是一种尽力而为的防护措施，不是安全边界或 DRM 系统。完全控制页面运行环境的用户仍然可以绕过它。
- 暗水印的可见程度会受到截图缩放、图片压缩、显示设备和背景颜色等因素影响。
- `BlindWatermark.decode()` 用于在图片中显现暗水印，目前不会将原始文字解析为结构化数据。
- 使用跨域图片时，图片服务器必须提供合适的 CORS 响应头，Canvas 才能安全导出处理结果。

## 文档和示例

- [快速开始](https://zhensherlock.github.io/watermark-js-plus/zh/guide/getting-started.html)
- [配置参考](https://zhensherlock.github.io/watermark-js-plus/zh/config/)
- [核心 API 生命周期](https://zhensherlock.github.io/watermark-js-plus/zh/config/function.html)
- [按需引入与 Tree Shaking](https://zhensherlock.github.io/watermark-js-plus/zh/guide/extra/on-demand.html)
- [框架在线示例](https://zhensherlock.github.io/watermark-js-plus/zh/guide/extra/examples.html)
- [演示集合](https://github.com/zhensherlock/watermark-js-plus/discussions/590)
- [Vben Admin](https://doc.vben.pro/guide/in-depth/features.html#页面水印) 使用 `watermark-js-plus` 实现页面水印。

## 参与贡献

欢迎参与项目。请先阅读[贡献指南](https://github.com/zhensherlock/watermark-js-plus/blob/main/CONTRIBUTING.md)，也可以[提交 Issue](https://github.com/zhensherlock/watermark-js-plus/issues/new/choose)或在 [GitHub Discussions](https://github.com/zhensherlock/watermark-js-plus/discussions) 中交流。

参与社区时，请遵守项目的[行为准则](https://github.com/zhensherlock/watermark-js-plus/blob/main/CODE_OF_CONDUCT.md)。

### 贡献者

感谢所有为 `watermark-js-plus` 做出贡献的开发者。

<a href="https://github.com/zhensherlock/watermark-js-plus/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=zhensherlock/watermark-js-plus" alt="watermark-js-plus 贡献者">
</a>

## 维护者

[@zhensherlock](https://github.com/zhensherlock)

## 开源许可

[MIT](LICENSE) © Michael Sun
