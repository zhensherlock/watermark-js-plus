import { defineAdditionalConfig, type DefaultTheme } from 'vitepress'
import { version } from '../../package.json'

export default defineAdditionalConfig({
  themeConfig: {
    // outlineTitle: '本页目录',
    // lastUpdatedText: '上次更新',
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
        },
        {
          text: '扩展',
          items: [
            { text: 'Internet Explorer', link: '/zh/guide/extra/ie' },
            { text: '按需加载', link: '/zh/guide/extra/on-demand' },
            { text: '示例', link: '/zh/guide/extra/examples' },
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
    search: { options: searchOptions() },
  }
})


function searchOptions(): Partial<DefaultTheme.AlgoliaSearchOptions> {
  return {
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档',
      },
      modal: {
        searchBox: {
          clearButtonTitle: '清除查询条件',
          clearButtonAriaLabel: '清除查询条件',
          closeButtonText: '关闭',
          closeButtonAriaLabel: '关闭',
          placeholderText: '搜索文档',
          placeholderTextAskAi: '向 AI 提问：',
          placeholderTextAskAiStreaming: '回答中...',
          searchInputLabel: '搜索',
          backToKeywordSearchButtonText: '返回关键字搜索',
          backToKeywordSearchButtonAriaLabel: '返回关键字搜索',
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除',
          recentConversationsTitle: '最近的对话',
          removeRecentConversationButtonTitle: '从历史记录中删除对话',
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接',
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈',
        },
        resultsScreen: {
          askAiPlaceholder: '向 AI 提问： ',
        },
        askAiScreen: {
          disclaimerText: '答案由 AI 生成，可能不准确，请自行验证。',
          relatedSourcesText: '相关来源',
          thinkingText: '思考中...',
          copyButtonText: '复制',
          copyButtonCopiedText: '已复制！',
          copyButtonTitle: '复制',
          likeButtonTitle: '赞',
          dislikeButtonTitle: '踩',
          thanksForFeedbackText: '感谢你的反馈！',
          preToolCallText: '搜索中...',
          duringToolCallText: '搜索 ',
          afterToolCallText: '已搜索',
          // aggregatedToolCallText: '已搜索',
        },
        footer: {
          selectText: '选择',
          submitQuestionText: '提交问题',
          selectKeyAriaLabel: 'Enter 键',
          navigateText: '切换',
          navigateUpKeyAriaLabel: '向上箭头',
          navigateDownKeyAriaLabel: '向下箭头',
          closeText: '关闭',
          backToSearchText: '返回搜索',
          closeKeyAriaLabel: 'Esc 键',
          poweredByText: '搜索提供者',
        },
      },
    },
  }
}
