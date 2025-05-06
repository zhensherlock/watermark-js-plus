---
layout: doc
---

<el-backtop></el-backtop>

# 按需加载
本指南解释了如何在 watermark-js-plus 中使用按需加载功能，以通过仅加载您需要的组件来优化应用程序性能。

## NPM

使用 npm 时，您可以直接导入特定组件以减小包的大小

```ts
// 仅导入 Watermark 组件
import { Watermark } from 'watermark-js-plus/es'

// 仅导入 BlindWatermark 组件
import { BlindWatermark } from 'watermark-js-plus/es'

// 仅导入 ImageWatermark 组件
import { ImageWatermark } from 'watermark-js-plus/es'

// 注意：如果使用了 movable 参数，必须引入样式文件
import 'watermark-js-plus/style.css'
```

## Benefits
- 减小包体积：只加载您实际使用的组件
- 提高性能：更小的 JavaScript 负载导致更快的页面加载
- 更好的用户体验 ：更快的初始渲染和交互
- 降低网络使用量 ：对于使用有限数据计划的用户特别有益

按需加载对于大型应用程序特别有用，在这些应用程序中，您可能只需要在应用程序的特定部分中使用特定的水印功能。
