import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { createPinia } from 'pinia'
import { defineAsyncComponent, h } from 'vue'
import { ID_INJECTION_KEY } from 'element-plus/es/hooks/use-id/index.mjs'
import { ZINDEX_INJECTION_KEY } from 'element-plus/es/hooks/use-z-index/index.mjs'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'virtual:group-icons.css'
import HomeHeroArt from '../components/HomeHeroArt.vue'
import '../styles/index.css'
import '../../../src/style'

const Backtop = defineAsyncComponent(() => import('../components/BackToTop.vue'))

export default {
  ...DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(HomeHeroArt),
    }),
  enhanceApp({ app }) {
    app.use(createPinia())
    app.component('ElBacktop', Backtop)
    app.provide(ID_INJECTION_KEY, {
      prefix: 1024,
      current: 0,
    })
    app.provide(ZINDEX_INJECTION_KEY, {
      current: 0,
    })
  },
} satisfies Theme
