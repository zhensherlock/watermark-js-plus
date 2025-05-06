import eslint from '@rollup/plugin-eslint'
import resolve from '@rollup/plugin-node-resolve'
import strip from '@rollup/plugin-strip'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import babel from '@rollup/plugin-babel'
import { visualizer } from 'rollup-plugin-visualizer'

export const generatePlugins = (tsOptions = {}, postcssOptions = {}) => {
  return [
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**', 'src/style/**'],
    }),
    resolve(),
    strip(),
    typescript(tsOptions),
    postcss({
      plugins: [autoprefixer(), cssnano()],
      ...postcssOptions,
    }),
    commonjs(),
    filesize(),
    babel({ babelHelpers: 'runtime', exclude: ['node_modules/**'] }),
    visualizer(),
  ]
}
