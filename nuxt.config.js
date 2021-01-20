// eslint-disable-next-line nuxt/no-cjs-in-config
const webpack = require('webpack')
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Talent Plus Resume',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { hid: 'description', name: 'description', content: '' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      {
        hid: 'Talent Plus Resume',
        name: 'Talent Plus Resume',
        content: 'Turning candidates into employees can be complicating and time-consuming. We at TalentPlus know this pretty well and take this very seriously. From manual to automated processes, we have achieved better selection for our clients just like you. TalentPlus focused on sourcing quality candidates to assist you to build effective team.'
      },
      {
        hid: 'keyword',
        name: 'keyword',
        content: 'resume, CV, generate CV, talentPlus, talent plus, online generate resume, resume for job.'
      },
      { property: 'og:title', content: 'Talent Plus Resume' },
      { property: 'og:site_name', content: 'Talent Plus Resume' },
      { property: 'og:type', content: 'website' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/jquery-3.3.1.min.js', type: 'text/javascript' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    { src: 'quill/dist/quill.snow.css', lang: 'css' },
    { src: '@fortawesome/fontawesome-free/css/all.min.css', lang: 'css' },
    { src: 'vue-slick-carousel/dist/vue-slick-carousel.css', lang: 'css' },
    { src: 'vue-slick-carousel/dist/vue-slick-carousel-theme.css', lang: 'css' },
    { src: '@/assets/css/style.css', lang: 'css' },
    { src: '@/assets/scss/style.scss', lang: 'css' }
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/main.js', mode: 'client', ssr: false },
    { src: '~/plugins/axios.js', mode: 'client', ssr: false },
    { src: '~/plugins/avatar.js', mode: 'client', ssr: false },
    { src: '~/plugins/crosser.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-pdf.js', mode: 'client', ssr: false },
    { src: '~/plugins/date-picker.js', mode: 'client', ssr: false },
    { src: '~/plugins/authenticate.js', mode: 'client', ssr: false },
    { src: '~/plugins/quill-editor.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-clipboard2.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-autocomplete.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-google-oauth2.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-loading-screen.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-slick-carousel.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-js-toggle-button.js', mode: 'client', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxt/content',
    '@nuxtjs/moment',
    'vue-sweetalert2/nuxt',
    'vue-social-sharing/nuxt',
    'cookie-universal-nuxt'
  ],

  server: {
    port: 3002
  },

  moment: {
    defaultLocale: 'km',
    locales: ['km']
  },
  loading: false,
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend (config, ctx) {
      config.output.globalObject = 'this'
      config.module.rules.push(
        {
          test: /\.pdf$/,
          loader: 'url-loader'
        }
      )
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  }
}
