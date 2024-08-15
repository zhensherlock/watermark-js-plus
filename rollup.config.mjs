import filesize from 'rollup-plugin-filesize'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import typescript from '@rollup/plugin-typescript'
import strip from '@rollup/plugin-strip'
import postcss from 'rollup-plugin-postcss'
import { visualizer } from 'rollup-plugin-visualizer'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import { generateOutputs } from './build/index.mjs'

const plugins = [
  eslint({
    throwOnError: true,
    throwOnWarning: true,
    include: ['src/**'],
    exclude: ['node_modules/**', 'src/style/**']
  }),
  resolve(),
  strip(),
  typescript(),
  postcss({
    plugins: [
      autoprefixer(),
      cssnano()
    ]
  }),
  commonjs(),
  filesize(),
  babel({ babelHelpers: 'runtime', exclude: ['node_modules/**'] }),
  visualizer(),
]

export default [
  {
    input: 'src/index.ts',
    output: generateOutputs(),
    plugins
  },
  {
    input: 'src/index.ie.ts',
    output: generateOutputs('ie'),
    plugins
  }
]
