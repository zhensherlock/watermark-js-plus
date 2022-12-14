module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', //  修复
        'docs', // 文档变更
        'style', // 代码格式
        'refactor', // 重构
        'pref', // 性能优化
        'test', // 增加测试
        'build', // 构建
        'ci', // CI配置
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build' // 打包
      ]
    ],
    // subject 大小写不做校验
    'subject-case': [0]
  }
};
