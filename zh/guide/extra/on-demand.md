---
url: https://zhensherlock.github.io/watermark-js-plus/zh/guide/extra/on-demand.md
description: 从 watermark-js-plus 的 ES 模块入口导入，配合现代构建工具和 Tree Shaking 使用。
---

# ES 模块导入

watermark-js-plus 为现代构建工具提供了 ES 模块入口。请从 `watermark-js-plus/es` 导入应用使用的公开类，再由构建工具完成 Tree Shaking 和生产环境优化。

## 从 ES 模块入口导入

```ts
// Watermark 类
import { Watermark } from 'watermark-js-plus/es'

// 暗水印及其解码
import { BlindWatermark } from 'watermark-js-plus/es'

// 将水印绘制到图片
import { ImageWatermark } from 'watermark-js-plus/es'

// 使用 movable 选项时必须引入
import 'watermark-js-plus/style.css'
```

也可以在一条语句中导入多个类：

```ts
import { BlindWatermark, Watermark } from 'watermark-js-plus/es'
```

## 适用场景

当项目使用 Vite、Rollup 或 webpack 等支持 ES 模块的构建工具时，可以使用 `/es` 入口。最终产物的体积取决于构建配置以及应用实际导入的代码。

对大多数应用而言，从包根路径导入仍是最简单的方式。需要明确控制模块格式，或希望检查并优化构建产物时，再使用 ES 模块入口。
