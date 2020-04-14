
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/firebase_config.js',
    //'~/plugins/nav-guard.js',
    '~/plugins/vue-chartjs.js',
    '~/plugins/axios.js',
    '~/plugins/element-ui.js',
    { src: '~plugins/localStorage', ssr: false },

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
    }
  }
}
