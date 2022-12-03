const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: { version: 3 },
      targets: [
        '> 1%',
        'Firefox ESR',
        'last 4 versions',
        'maintained node versions',
        'not dead',
        'safari >= 7'
      ],
    },
  ],
]

const plugins = [
  '@babel/plugin-transform-runtime'
]

module.exports = { presets, plugins }
