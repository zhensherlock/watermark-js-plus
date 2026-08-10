---
layout: doc
description: 交互式调整水印参数，在页面中预览效果，并复制生成的初始化代码。
aside: false
pageClass: watermark-configurator-page
---

# 水印配置生成器

在独立预览区实时调整水印效果，并复制自动生成的初始化代码。

**相关内容：** [Watermark 指南](/zh/guide/watermark) · [Watermark 配置项](/zh/config/) · [Watermark 方法](/zh/config/function)

<script setup lang="ts">
import WatermarkConfigurator from '../../.vitepress/components/WatermarkConfigurator.vue';
</script>

<ClientOnly>
  <WatermarkConfigurator />
</ClientOnly>

<el-backtop></el-backtop>
