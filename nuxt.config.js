module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [{ src: 'js/image-effect.js' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/main.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  /*buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],*/
  /*
   ** Nuxt.js modules
   */
  modules: [
    '~/io',
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt'
  ],
  env: {
    WS_URL: process.env.WS_URL || 'http://localhost:3000'
  }
}
