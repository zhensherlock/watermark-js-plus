// @ts-ignore
import { version } from '../../../package.json'

export default {
  outlineTitle: '本页目录',
  lastUpdatedText: '上次更新',
  nav: [
    { text: '指南', link: '/zh/guide/what-is-this', activeMatch: '/guide/' },
    { text: '配置项', link: '/zh/config/', activeMatch: '/config/' },
    {
      text: version,
      items: [
        {
          text: '更新日志',
          link: 'https://github.com/zhensherlock/watermark-js-plus/blob/main/CHANGELOG.md'
        },
        // {
        //   text: '贡献',
        //   link: 'https://github.com/vuejs/vitepress/blob/main/.github/contributing.md'
        // }
      ]
    }
  ],
  sidebar: {
    '/zh/guide': [
      {
        text: '向导',
        // collapsible: true,
        items: [
          { text: '介绍', link: '/zh/guide/what-is-this' },
          { text: '开始使用', link: '/zh/guide/getting-started' },
          { text: '水印', link: '/zh/guide/watermark' },
          { text: '暗水印', link: '/zh/guide/blind-watermark' },
          { text: '图片水印', link: '/zh/guide/image' },
        ]
      },
      {
        text: '自定义',
        items: [
          { text: '配置', link: '/zh/guide/custom/configs' },
          { text: '解析', link: '/zh/guide/custom/decode' },
        ]
      }
    ],
    '/zh/config': [
      {
        text: '配置',
        // collapsible: true,
        items: [
          { text: '基础配置项', link: '/zh/config/' },
          { text: '基础方法', link: '/zh/config/function' },
          { text: '暗水印配置项', link: '/zh/config/blind' },
          { text: '暗水印解码配置项', link: '/zh/config/blind-decode' },
        ]
      }
    ]
  },
  footer: {
    message: '本中文文档内容版权为 Michael Sun 所有，保留所有权利。'
  },
  algolia: {
    appId: 'V6CF28P0PS',
    apiKey: '692752b7b3c6f794997d8ae22aed79fa',
    indexName: 'dev_docs',
    placeholder: '请输入关键词',
    buttonText: '搜索',
  },
}
