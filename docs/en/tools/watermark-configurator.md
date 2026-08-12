---
layout: doc
description: Configure a watermark interactively, preview changes on the page, and copy the generated initialization code.
aside: false
pageClass: watermark-configurator-page
---

<el-backtop></el-backtop>

# Watermark Configurator

Tune the watermark in a focused live preview, then copy the generated initialization code.

**Related:** [Watermark guide](/guide/watermark) · [Watermark options](/config/) · [Watermark methods](/config/function)

<script setup lang="ts">
import WatermarkConfigurator from '../../.vitepress/components/WatermarkConfigurator.vue';
</script>

<ClientOnly>
  <WatermarkConfigurator />
</ClientOnly>
