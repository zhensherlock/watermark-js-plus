import DefaultTheme from 'vitepress/theme'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData, isServer }: any) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    import('element-plus').then((module) => {
      app.use(module)
    })
  }
}
