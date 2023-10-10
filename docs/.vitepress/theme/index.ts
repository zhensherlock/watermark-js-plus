import DefaultTheme from 'vitepress/theme'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '../styles/index.css'

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData, isServer }: any) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    const store = createPinia()
    app.use(store)
    import('element-plus').then((module) => {
      app.use(module)
    })
  }
}
