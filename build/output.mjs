import terser from '@rollup/plugin-terser'
import { banner } from './banner.mjs'

export const generateOutputs = (section = '') => {
  const path = section === '' ? 'dist' : `dist/${section}`
  return [
    {
      name: 'WatermarkPlus',
      format: 'esm',
      file: `${path}/index.esm.js`,
      sourcemap: true,
      banner
    },
    {
      name: 'WatermarkPlus',
      format: 'umd',
      file: `${path}/index.umd.js`,
      sourcemap: true,
      banner
    },
    {
      name: 'WatermarkPlus',
      format: 'iife',
      file: `${path}/index.iife.js`,
      sourcemap: true,
      banner
    },
    {
      name: 'WatermarkPlus',
      format: 'cjs',
      file: `${path}/index.cjs.js`,
      sourcemap: true,
      banner
    },
    // min
    {
      name: 'WatermarkPlus',
      format: 'esm',
      file: `${path}/index.esm.min.js`,
      plugins: [terser()]
    },
    {
      name: 'WatermarkPlus',
      format: 'umd',
      file: `${path}/index.umd.min.js`,
      plugins: [terser()]
    },
    {
      name: 'WatermarkPlus',
      format: 'iife',
      file: `${path}/index.iife.min.js`,
      plugins: [terser()]
    },
    {
      name: 'WatermarkPlus',
      format: 'cjs',
      file: `${path}/index.cjs.min.js`,
      plugins: [terser()]
    }
  ]
}
