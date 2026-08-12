import { defineConfig } from 'vitepress'
// import llmstxt from 'vitepress-plugin-llms'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
// @ts-ignore
import { version } from '../../package.json'

const siteUrl = 'https://zhensherlock.github.io/watermark-js-plus/'
const socialImage = `${siteUrl}readme-hero.webp`
const defaultDescription =
  'A lightweight, framework-agnostic TypeScript library for visible, image, and blind watermarks in the browser.'

function getCanonicalUrl(relativePath: string) {
  if (!relativePath || relativePath === 'index.md') {
    return siteUrl
  }

  const pagePath = relativePath.endsWith('/index.md')
    ? relativePath.replace(/index\.md$/, '')
    : relativePath.replace(/\.md$/, '.html')

  return new URL(pagePath, siteUrl).toString()
}

export default defineConfig({
  title: 'watermark-js-plus',
  description: defaultDescription,
  rewrites: {
    'en/:rest*': ':rest*',
    'en/index.md': 'index.md',
  },
  base: '/watermark-js-plus/',
  sitemap: {
    hostname: siteUrl,
  },
  head: [
    ['link', { rel: 'shortcut icon', href: '/watermark-js-plus/favicons/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/watermark-js-plus/favicons/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#1677ff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'watermark-js-plus' }],
    ['meta', { property: 'og:image', content: socialImage }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: socialImage }],
    // ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' }],
    // ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' }],
    // ['link', { rel: "manifest", href: "/assets/favicons/site.webmanifest"}],
    // ['link', { rel: "mask-icon", href: "/assets/favicons/safari-pinned-tab.svg", color: "#3a0839"}],
    // ['meta', { name: "msapplication-TileColor", content: "#3a0839"}],
    // ['meta', { name: "msapplication-config", content: "/assets/favicons/browserconfig.xml"}],
  ],
  transformHead({ pageData, title, description }) {
    if (pageData.isNotFound) {
      return []
    }

    const isZh = pageData.relativePath.startsWith('zh/')
    const canonicalUrl = getCanonicalUrl(pageData.relativePath)
    const socialImageAlt = isZh ? 'watermark-js-plus 浏览器水印库' : 'watermark-js-plus browser watermark library'

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:locale', content: isZh ? 'zh_CN' : 'en_US' }],
      ['meta', { property: 'og:image:alt', content: socialImageAlt }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image:alt', content: socialImageAlt }],
    ]
  },
  locales: {
    root: { label: 'English', lang: 'en-US', dir: 'ltr' },
    zh: { label: '简体中文', lang: 'zh-Hans', dir: 'ltr' },
  },
  themeConfig: {
    logo: '/logo.png',
    socialLinks: [{ icon: 'github', link: 'https://github.com/zhensherlock/watermark-js-plus' }],
    nav: [
      { text: 'Guide', link: '/guide/what-is-this', activeMatch: '/guide/' },
      { text: 'Tools', link: '/tools/', activeMatch: '/tools/' },
      { text: 'API Reference', link: '/config/', activeMatch: '/config/' },
      {
        text: 'Community',
        items: [
          { text: 'GitHub Discussions', link: 'https://github.com/zhensherlock/watermark-js-plus/discussions' },
          { text: 'Contributing', link: 'https://github.com/zhensherlock/watermark-js-plus/blob/main/CONTRIBUTING.md' },
        ],
      },
      {
        text: version,
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/zhensherlock/watermark-js-plus/blob/main/CHANGELOG.md',
          },
        ],
      },
    ],
    sidebar: {
      '/guide': [
        {
          text: 'Guide',
          // collapsible: true,
          items: [
            { text: 'Introduction', link: '/guide/what-is-this' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Watermark', link: '/guide/watermark' },
            { text: 'Image Watermark', link: '/guide/image' },
            { text: 'Blind Watermark', link: '/guide/blind-watermark' },
          ],
        },
        {
          text: 'Resources',
          items: [
            { text: 'Examples', link: '/guide/extra/examples' },
            { text: 'ES Module Imports', link: '/guide/extra/on-demand' },
            { text: 'Legacy Browser Support', link: '/guide/extra/ie' },
          ],
        },
      ],
      '/tools': [
        {
          text: 'Tools',
          items: [
            { text: 'Overview', link: '/tools/' },
            { text: 'Watermark Configurator', link: '/tools/watermark-configurator' },
            { text: 'Image Watermark Tool', link: '/tools/image-watermark' },
            { text: 'Blind Watermark Decoder', link: '/tools/blind-watermark-decoder' },
          ],
        },
      ],
      '/config': [
        {
          text: 'API Reference',
          // collapsible: true,
          items: [
            { text: 'Watermark Options', link: '/config/' },
            { text: 'Watermark Methods', link: '/config/function' },
            { text: 'ImageWatermark Options', link: '/config/#image-watermark-options' },
            { text: 'BlindWatermark Options', link: '/config/blind' },
            { text: 'Decode Options', link: '/config/blind-decode' },
          ],
        },
      ],
    },
    search: {
      provider: 'algolia',
      options: {
        appId: 'V6CF28P0PS',
        apiKey: '692752b7b3c6f794997d8ae22aed79fa',
        indexName: 'dev_docs',
      },
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-present Michael Sun',
    },
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [groupIconVitePlugin()],
  },
})
