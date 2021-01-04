import vue from 'rollup-plugin-vue'
import less from 'rollup-plugin-less';

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: 'dist/vue-iframes.esm.js'
    },
    plugins: [
      vue(),
      less({ insert: true, output: false })
    ]
  },
  // SSR build.
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/vue-iframes.ssr.js'
    },
    plugins: [
      vue({ template: { optimizeSSR: true } }),
      less({ insert: true, output: false })
    ]
  },
  // Browser build.
  {
    input: 'src/index.js',
    output: {
      format: 'iife',
      file: 'dist/vue-iframes.js'
    },
    plugins: [
      vue(),
      less({ insert: true, output: false })
    ]
  }
]
