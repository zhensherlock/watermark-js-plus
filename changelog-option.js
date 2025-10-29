const compareFunc = require('compare-func')

module.exports = {
  writerOpts: {
    transform: (commit, context) => {
      let discard = true
      const issues = []

      const newCommit = {
        ...commit,
        notes: commit.notes.map(note => ({
          ...note,
          title: 'BREAKING CHANGES',
        })),
      }

      if (newCommit.notes.length > 0) {
        discard = false
      }

      const typeMap = {
        feat: '✨ Features | 新功能',
        fix: '🐛 Bug Fixes | Bug 修复',
        perf: '⚡ Performance Improvements | 性能优化',
        revert: '⏪ Reverts | 回退',
        refactor: '♻ Code Refactoring | 代码重构',
        test: '✅ Tests | 测试',
        build: '👷‍ Build System | 构建',
        chore: '🎫 Chores | 其他更新',
        style: '💄 Styles | 风格',
        ci: '🔧 Continuous Integration | CI 配置',
        docs: '📝 Documentation | 文档',
      }

      if (typeMap[newCommit.type]) {
        newCommit.type = typeMap[newCommit.type]
      } else if (newCommit.type === 'revert' || newCommit.revert) {
        newCommit.type = typeMap['revert']
      } else if (discard) {
        return
      }

      if (newCommit.scope === '*') {
        newCommit.scope = ''
      }

      if (typeof newCommit.hash === 'string') {
        newCommit.shortHash = newCommit.hash.substring(0, 7)
      }

      if (typeof newCommit.subject === 'string') {
        let url = context.repository ? `${context.host}/${context.owner}/${context.repository}` : context.repoUrl

        if (url) {
          url = `${url}/issues/`
          newCommit.subject = newCommit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue)
            return `[#${issue}](${url}${issue})`
          })
        }

        if (context.host) {
          newCommit.subject = newCommit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
            if (username.includes('/')) {
              return `@${username}`
            }
            return `[@${username}](${context.host}/${username})`
          })
        }
      }

      newCommit.references = newCommit.references.filter(reference => {
        if (issues.indexOf(reference.issue) === -1) {
          return true
        }
        return false
      })

      return newCommit
    },
    groupBy: 'type',
    commitGroupsSort: 'title',
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title',
    notesSort: compareFunc,
  },
}
