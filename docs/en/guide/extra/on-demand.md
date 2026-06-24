---
layout: doc
---

<el-backtop></el-backtop>

# On Demand
This guide explains how to use the on-demand loading feature in watermark-js-plus to optimize your application's performance by only loading the components you need.

## NPM

When using npm, you can import specific components directly to reduce bundle size

```ts
// Import only the Watermark component
import { Watermark } from 'watermark-js-plus/es'

// Import only the BlindWatermark component
import { BlindWatermark } from 'watermark-js-plus/es'

// Import only the ImageWatermark component
import { ImageWatermark } from 'watermark-js-plus/es'

// Note: If you use the movable parameter, you must import the style file
import 'watermark-js-plus/style.css'
```

## Benefits
- Reduced Bundle Size : Only load the components you actually use
- Improved Performance : Smaller JavaScript payloads lead to faster page loads
- Better User Experience : Quicker initial rendering and interaction
- Lower Network Usage : Especially beneficial for users on limited data plans

On-demand loading is particularly useful for large applications where you might only need specific watermark functionality in certain parts of your application.
