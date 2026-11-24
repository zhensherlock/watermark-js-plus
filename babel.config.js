module.exports = {
  targets: [
    'ie >= 11',
    '> 1%',
    'Firefox ESR',
    'last 4 versions',
    'maintained node versions',
    'not dead',
    'safari >= 7',
  ],
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['babel-plugin-polyfill-corejs3', { method: 'usage-global', version: require('core-js/package.json').version }],
  ],
}
