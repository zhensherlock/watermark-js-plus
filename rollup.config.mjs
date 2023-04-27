import filesize from 'rollup-plugin-filesize'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
// import terser from './tools/terser.js'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import strip from '@rollup/plugin-strip'

const output = [
  {
    name: 'watermark',
    format: 'esm',
    file: 'dist/index.esm.js',
    sourcemap: true
  },
  {
    name: 'watermark',
    format: 'umd',
    file: 'dist/index.umd.js',
    sourcemap: true
  },
  {
    name: 'watermark',
    format: 'iife',
    file: 'dist/index.browser.js',
    sourcemap: true
  },
  {
    name: 'watermark',
    format: 'cjs',
    file: 'dist/index.cjs.js',
    sourcemap: true
  },
  // min
  {
    name: 'watermark',
    format: 'esm',
    file: 'dist/index.esm.min.js',
    plugins: [terser()]
  },
  {
    name: 'watermark',
    format: 'umd',
    file: 'dist/index.umd.min.js',
    plugins: [terser()]
  },
  {
    name: 'watermark',
    format: 'iife',
    file: 'dist/index.browser.min.js',
    plugins: [terser()]
  },
  {
    name: 'watermark',
    format: 'cjs',
    file: 'dist/index.cjs.min.js',
    plugins: [terser()]
  }
]

export default [
  {
    input: 'src/index.ts',
    output,
    plugins: [
      typescript(),
      eslint({
        throwOnError: true,
        throwOnWarning: true,
        include: ['src/**'],
        exclude: ['node_modules/**', 'src/style/**']
      }),
      resolve(),
      strip(),
      commonjs(),
      filesize(),
      babel({ babelHelpers: 'runtime', exclude: ['node_modules/**'] })
    ]
  }
]
