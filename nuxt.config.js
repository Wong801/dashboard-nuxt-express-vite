export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Wong801 Portfolio',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://vite.nuxtjs.org/
    'nuxt-vite',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // server middleware
  serverMiddleware: {
    '/api': '~/api'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt
    'cookie-universal-nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/Maronato/vue-toastification
    ["vue-toastification/nuxt", {
      timeout: 2000,
      draggable: false
    }],
    ['nuxt-compress']
  ],

  'nuxt-compress':{
    gzip: {
      threshold: 8192
    },
    brotli: {
      threshold: 8192
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: 'https://wong801-portfolio.herokuapp.com/api',
    // baseUrl: 'http://localhost:3000/api',
    post: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  },

  // proxy: {
  //   '/api/': {
  //     target: 'https://wong801-portfolio.herokuapp.com/api',
  //     pathRewrite: {'^/api': ''},
  //     changeOrigin: true
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    terser: true,
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    },
    postcss: {
      plugins: {
        "postcss-custom-properties": false
      },
    },
    optimization :{
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: 'test',
        maxSize : 256000
      }
    }
  },

  // Vite Configuration https://vite.nuxtjs.org/getting-started/config
  vite: {
    ssr: true,
  },
}
