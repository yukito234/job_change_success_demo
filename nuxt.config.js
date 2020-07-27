
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - お役立ち体験記の検索・共有サイト',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '%s' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: 'blue',
    height: '5px',

  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.css',
    'element-ui/lib/theme-chalk/index.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/firebase_config.js',
    '~/plugins/vue-chartjs.js',
    '~/plugins/axios.js',
    '~/plugins/element-ui.js',
    { src: '~plugins/localStorage', ssr: false },
    { src: '~plugins/sessionStorage', ssr: false },
  ],
  env: {
    //.envにおいて、すでに定義してあるので、以下は不要
    //QIITA_TOKEN: process.env.QIITA_TOKEN
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  '@nuxtjs/dotenv',
  '@nuxtjs/axios',
  'bootstrap-vue/nuxt',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
}
