import { minify } from 'terser'
import { yourFunction } from 'rollup-plugin-your-function'

const terser = () =>
  yourFunction({
    output: true,
    name: 'terser',
    fn: async (source, options) => {
      return minify(source, {
        module: /^esm?$/.test(options.outputOptions.format),
        toplevel: options.outputOptions.format === 'cjs',
        sourceMap: true,
      })
    },
  })

export default terser
