// eslint-disable-next-line nuxt/no-cjs-in-config
const webpack = require('webpack')
export default {
  head: {
    title: 'TalentPlus Resume',
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

  css: [
    { src: 'quill/dist/quill.snow.css', lang: 'css' },
    { src: '@fortawesome/fontawesome-free/css/all.min.css', lang: 'css' },
    { src: '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css', lang: 'css' },
    { src: '@mdi/font/css/materialdesignicons.min.css', lang: 'css' },
    { src: 'vue-phone-number-input/dist/vue-phone-number-input.css', lang: 'css' },
    { src: 'vue-slick-carousel/dist/vue-slick-carousel.css', lang: 'css' },
    { src: 'vue-slick-carousel/dist/vue-slick-carousel-theme.css', lang: 'css' },
    { src: '@/assets/css/style.css', lang: 'css' },
    { src: '@/assets/scss/style.scss', lang: 'css' }
  ],

  plugins: [
    { src: '~/plugins/main.js', mode: 'client', ssr: false },
    { src: '~/plugins/axios.js', mode: 'client', ssr: false },
    { src: '~/plugins/avatar.js', mode: 'client', ssr: false },
    { src: '~/plugins/crosser.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-pdf.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-toastr.js', mode: 'client', ssr: false },
    { src: '~/plugins/date-picker.js', mode: 'client', ssr: false },
    { src: '~/plugins/authenticate.js', mode: 'client', ssr: false },
    { src: '~/plugins/quill-editor.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-clipboard2.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-autocomplete.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-google-oauth2.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-loading-screen.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-slick-carousel.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-phone-number-input', mode: 'client', ssr: false },
    { src: '~/plugins/vue-js-toggle-button.js', mode: 'client', ssr: false }
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxt/content',
    '@nuxtjs/moment',
    'vue-sweetalert2/nuxt',
    'vue-social-sharing/nuxt',
    'cookie-universal-nuxt',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyAOFoXGwL_D62yScwQYAfxtK3XJV6KKDzs',
          authDomain: 'talentplus.firebaseapp.com',
          databaseURL: 'https://talentplus-default-rtdb.firebaseio.com',
          projectId: 'talentplus',
          storageBucket: 'talentplus.appspot.com',
          messagingSenderId: '622178573073',
          appId: '1:622178573073:web:8a0f7ad2a349916530cab0',
          measurementId: 'G-S2JYHJ2GJ1'
        },
        services: {
          auth: true, // Just as example. Can be any other service.
          firestore: true,
          functions: true,
          storage: true,
          database: true,
          messaging: true,
          performance: true,
          analytics: true,
          remoteConfig: true
        }
      }
    ]
  ],

  server: {
    port: 3002
  },

  moment: {
    defaultLocale: 'km',
    locales: ['km']
  },
  loading: false,
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
