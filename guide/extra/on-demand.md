---
url: https://zhensherlock.github.io/watermark-js-plus/guide/extra/on-demand.md
description: >-
  Import watermark-js-plus from its ES module entry for modern bundlers and tree
  shaking.
---

# ES Module Imports

watermark-js-plus provides an ES module entry for modern build tools. Import the public classes your application uses from `watermark-js-plus/es`, then let your bundler handle tree shaking and production optimization.

## Import from the ES module entry

```ts
// Watermark class
import { Watermark } from 'watermark-js-plus/es'

// Blind watermarks and decoding
import { BlindWatermark } from 'watermark-js-plus/es'

// Watermarks rendered into an image
import { ImageWatermark } from 'watermark-js-plus/es'

// Required when using the movable option
import 'watermark-js-plus/style.css'
```

You can also group multiple imports in one statement:

```ts
import { BlindWatermark, Watermark } from 'watermark-js-plus/es'
```

## When to use it

Use the `/es` entry when your application is built with an ES module-aware bundler such as Vite, Rollup, or webpack. The final bundle depends on your bundler configuration and the code your application actually imports.

For most applications, importing from the package root remains the simplest option. Use the ES module entry when you need explicit control over the module format or want to inspect and optimize the generated bundle.
