import { generateOutputs } from './tools/output'
import { generatePlugins } from './tools/plugins'

export default [
  {
    input: 'src/index.ts',
    output: generateOutputs(),
    plugins: generatePlugins({
      declaration: true,
      declarationDir: './dist/types',
      outDir: './dist',
    }),
  },
  {
    input: 'src/index.ie.ts',
    output: generateOutputs('ie'),
    plugins: generatePlugins({
      declaration: false,
      outDir: null,
    }),
  },
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/es',
        format: 'es',
        preserveModules: true,
        entryFileNames: '[name].js',
      },
    ],
    plugins: generatePlugins(
      {
        declaration: false,
        outDir: null,
      },
      {
        extract: 'style.css',
      },
    ),
  },
  {
    input: 'src/index.ie.ts',
    output: [
      {
        dir: 'dist/ie/es',
        format: 'es',
        preserveModules: true,
        entryFileNames: '[name].js',
      },
    ],
    plugins: generatePlugins(
      {
        declaration: false,
        outDir: null,
      },
      {
        extract: 'style.css',
      },
    ),
  },
]
