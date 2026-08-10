---
layout: doc
aside: false
description: 在线为图片添加文字或图片水印，并直接在浏览器中下载处理结果。
---

# 图片水印工具

上传一张图片，设置文字或图片水印，然后下载处理后的 PNG。整个过程仅在当前浏览器中完成。

**相关内容：** [图片水印指南](/zh/guide/image) · [ImageWatermark 配置项](/zh/config/#image-watermark-options)

<script setup lang="ts">
import ImageWatermarkTool from '../../.vitepress/components/ImageWatermarkTool.vue'
</script>

<ClientOnly>
  <ImageWatermarkTool locale="zh" />
</ClientOnly>
