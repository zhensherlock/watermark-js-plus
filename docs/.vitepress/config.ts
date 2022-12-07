import { version } from '../../package.json'
import zh_CN from './locales/zh-CN'

export default {
  title: 'watermark-js-plus',
  description: 'A watermark plugin',
  base: '/watermark-js-plus',
  head: [
    ['link', { rel: 'shortcut icon', href: '/watermark-js-plus/favicons/favicon-64x64.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/watermark-js-plus/favicons/apple-touch-icon.png' }],
    // ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' }],
    // ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' }],
    // ['link', { rel: "manifest", href: "/assets/favicons/site.webmanifest"}],
    // ['link', { rel: "mask-icon", href: "/assets/favicons/safari-pinned-tab.svg", color: "#3a0839"}],
    // ['meta', { name: "msapplication-TileColor", content: "#3a0839"}],
    // ['meta', { name: "msapplication-config", content: "/assets/favicons/browserconfig.xml"}],
    // ['meta', { name: "theme-color", content: "#ffffff"}],
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Guide', link: '/guide/what-is-this', activeMatch: '/guide/' },
      { text: 'Configs', link: '/config/', activeMatch: '/config/' },
      {
        text: version,
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/zhensherlock/watermark-js-plus/blob/main/CHANGELOG.md'
          },
          // {
          //   text: 'Contributing',
          //   link: 'https://github.com/zhensherlock/watermark-js-plus/blob/main/.github/contributing.md'
          // }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhensherlock/watermark-js-plus' },
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
          ]
        }
      ],
      '/config': [
        {
          text: 'Config',
          // collapsible: true,
          items: [
            { text: 'Basic Config', link: '/config/' },
            { text: 'Blind Watermark Config', link: '/config/blind' },
            { text: 'Blind Watermark Decode', link: '/config/blind-decode' },
          ]
        }
      ]
    },
    algolia: {
      appId: 'V6CF28P0PS',
      apiKey: '692752b7b3c6f794997d8ae22aed79fa',
      indexName: 'dev_docs'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-present Michael Sun'
    },
    locales: {
      '/zh/': zh_CN
    },
    localeLinks: {
      // text: 'English',
      items: [
        { text: 'English', link: '/' },
        { text: '简体中文', link: '/zh/' },
      ]
    },
  },
  markdown: {
    lineNumbers: true
  },
  locales: {
    '/': {
      lang: 'en-US',
      title: 'watermark-js-plus',
      description: 'A watermark plugin',
    },
    '/zh/': {
      lang: 'zh-CN',
      description: '一个水印插件',
      outlineTitle: '本页目录',
      lastUpdatedText: '上次更新',
      base: '/watermark-js-plus/zh/',
    }
  }
}
