---
layout: doc
aside: false
description: Add a text or logo watermark to an image and download the result directly in your browser.
---

# Image Watermark Tool

Upload one image, customize a text or logo watermark, and download the finished PNG. All processing happens locally in your browser.

**Related:** [Image Watermark guide](/guide/image) · [ImageWatermark options](/config/#image-watermark-options)

<script setup lang="ts">
import ImageWatermarkTool from '../../.vitepress/components/ImageWatermarkTool.vue'
</script>

<ClientOnly>
  <ImageWatermarkTool locale="en" />
</ClientOnly>
