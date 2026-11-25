<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const artLabel = computed(() =>
  lang.value.startsWith('zh')
    ? '由可见水印和暗水印保护的浏览器内容'
    : 'Browser content protected by visible and blind watermarks',
)

const productImage = withBase('/hero-product.webp')
const productImageSmall = withBase('/hero-product-520.webp')
</script>

<template>
  <div class="hero-art" role="img" :aria-label="artLabel">
    <svg class="hero-art__orbit" viewBox="0 0 520 520" aria-hidden="true">
      <circle class="hero-art__orbit-ring" cx="260" cy="254" r="192" />
      <g class="hero-art__orbit-spheres">
        <circle class="hero-art__orbit-halo hero-art__orbit--left" cx="68" cy="254" r="10" />
        <circle class="hero-art__orbit--left" cx="68" cy="254" r="4" />
        <circle class="hero-art__orbit-halo hero-art__orbit--right" cx="452" cy="254" r="10" />
        <circle class="hero-art__orbit--right" cx="452" cy="254" r="4" />
      </g>
    </svg>

    <img
      class="hero-art__product"
      :src="productImage"
      :srcset="`${productImageSmall} 520w, ${productImage} 960w`"
      sizes="(min-width: 60rem) clamp(360px, 100vh - 420px, 520px), (min-width: 40rem) 24.5rem, 20rem"
      alt=""
      width="960"
      height="960"
      decoding="async"
      fetchpriority="high"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.hero-art {
  position: relative;
  width: min(100%, 520px);
  aspect-ratio: 1;
  contain: layout paint;
}

.hero-art__product,
.hero-art__orbit {
  position: absolute;
  pointer-events: none;
}

.hero-art__product {
  z-index: 1;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: translate3d(0, 3px, 0);
  animation: hero-product-float 6s cubic-bezier(0.37, 0, 0.63, 1) infinite;
  will-change: transform;
}

.hero-art__orbit {
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: visible;
}

.hero-art__orbit-ring {
  fill: none;
  stroke: #94b6e8;
  stroke-width: 1.25;
}

.hero-art__orbit-spheres {
  transform-box: fill-box;
  transform-origin: center;
  animation: hero-orbit-spin 12s linear infinite;
}

.hero-art__orbit--left {
  fill: #63d6d4;
}

.hero-art__orbit--right {
  fill: #1e58ca;
}

.hero-art__orbit-halo {
  opacity: 0.18;
}

.dark .hero-art__orbit-ring {
  stroke: #5d78a8;
}

@keyframes hero-orbit-spin {
  to {
    transform: rotate(1turn);
  }
}

@keyframes hero-product-float {
  0%,
  100% {
    transform: translate3d(0, 3px, 0);
  }

  50% {
    transform: translate3d(0, -5px, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-art__product {
    animation: none;
    transform: none;
    will-change: auto;
  }

  .hero-art__orbit-spheres {
    animation: none;
  }
}
</style>
