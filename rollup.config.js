import vue from 'rollup-plugin-vue'

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: 'dist/vue-iframes.esm.js'
    },
    external: ['lodash.debounce', 'uuidv4', 'vue'],
    plugins: [vue()]
  },
  // SSR build.
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/vue-iframes.ssr.js'
    },
    plugins: [
      vue({ template: { optimizeSSR: true } })
    ]
  },
  // Browser build.
  {
    input: 'src/index.js',
    output: {
      name: 'vue-iframes',
      format: 'umd',
      file: 'dist/vue-iframes.js'
    },
    plugins: [vue()]
  }
]
