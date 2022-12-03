module.exports = {
  parser: '@typescript-eslint/parser', // 解析器，默认使用Espree
  env: { // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。
    browser: true, // 运行在浏览器
    es2021: true, // 支持es2021
    es6: true,
  },
  extends: [ // 使用的外部代码格式化配置文件
    'semistandard',
    'plugin:import/recommended'
  ],
  plugins: [
    'import'
  ],
  parserOptions: {
    ecmaVersion: 12, // ecmaVersion 用来指定支持的 ECMAScript 版本 。默认为 5，即仅支持es5
    sourceType: 'module',
  },
  globals: { // 脚本在执行期间访问的额外的全局变量
    describe: true,
    it: true,
    after: true,
    before: true,
    afterEach: true,
    beforeEach: true,
    __BUILD__: true,
    __DEV__: true,
    __SIT__: true,
    __UAT__: true,
    __PROD__: true
  },
  rules: {
    // 启用的规则及其各自的错误级别。0(off)  1(warning)  2(error)
    'no-console': 0,
    semi: [1, 'never'],
    quotes: [1, 'single'],
    'no-unused-vars': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
};
