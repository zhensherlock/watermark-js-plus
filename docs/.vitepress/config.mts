import { defineConfig } from 'vitepress'
// import llmstxt from 'vitepress-plugin-llms'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
// @ts-ignore
import { version } from '../../package.json'

export default defineConfig({
  title: 'watermark-js-plus',
  description: 'A advanced watermark plugin',
  rewrites: {
    'en/:rest*': ':rest*',
    'en/index.md': 'index.md',
  },
  base: '/watermark-js-plus/',
  head: [
    ['link', { rel: 'shortcut icon', href: '/watermark-js-plus/favicons/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/watermark-js-plus/favicons/apple-touch-icon.png' }],
    // ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' }],
    // ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' }],
    // ['link', { rel: "manifest", href: "/assets/favicons/site.webmanifest"}],
    // ['link', { rel: "mask-icon", href: "/assets/favicons/safari-pinned-tab.svg", color: "#3a0839"}],
    // ['meta', { name: "msapplication-TileColor", content: "#3a0839"}],
    // ['meta', { name: "msapplication-config", content: "/assets/favicons/browserconfig.xml"}],
    // ['meta', { name: "theme-color", content: "#ffffff"}],
  ],
  locales: {
    root: { label: 'English', lang: 'en-US', dir: 'ltr' },
    zh: { label: '简体中文', lang: 'zh-Hans', dir: 'ltr' },
  },
  themeConfig: {
    logo: '/logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhensherlock/watermark-js-plus' },
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/what-is-this', activeMatch: '/guide/' },
      { text: 'Configs', link: '/config/', activeMatch: '/config/' },
      {
        text: version,
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/zhensherlock/watermark-js-plus/blob/main/CHANGELOG.md'
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
            { text: 'Introduce', link: '/guide/what-is-this' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Watermark', link: '/guide/watermark' },
            { text: 'Blind Watermark', link: '/guide/blind-watermark' },
            { text: 'Image', link: '/guide/image' },
          ]
        },
        {
          text: 'Custom',
          items: [
            { text: 'Configs', link: '/guide/custom/configs' },
            { text: 'Decode', link: '/guide/custom/decode' },
          ]
        },
        {
          text: 'Extra',
          items: [
            { text: 'Internet Explorer', link: '/guide/extra/ie' },
            { text: 'On demand', link: '/guide/extra/on-demand' },
            { text: 'Examples', link: '/guide/extra/examples' },
          ]
        }
      ],
      '/config': [
        {
          text: 'Config',
          // collapsible: true,
          items: [
            { text: 'Basic Config', link: '/config/' },
            { text: 'Basic Function', link: '/config/function' },
            { text: 'Blind Watermark Config', link: '/config/blind' },
            { text: 'Blind Watermark Decode', link: '/config/blind-decode' },
          ]
        }
      ]
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
      copyright: 'Copyright © 2021-present Michael Sun'
    },
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin(),
    ],
  },
})
