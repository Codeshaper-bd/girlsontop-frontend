export default {
  // Target: https://go.nuxtjs.dev/config-target

  // Global page headers: https://go.nuxtjs.dev/config-head
  server : {
      port : 3000
  },
  head: {
    title: 'Girls On Top',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Girls on top is a clothing brand.Our main products designer three piece,kurti,gown etc.All dress design & manufacture by girls on top.' },
      { hid: 'og:description', property: 'og:description', content: 'Girls on top is a clothing brand.Our main products designer three piece,kurti,gown etc.All dress design & manufacture by girls on top.' },
      { hid: 'og:image', property: 'og:image', content: 'https://girlsontop.com.bd/logo.png' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
   '@/assets/css/bootstrap.min.css',
   '@/assets/css/font-awesome.min.css',
   '@/assets/css/style.css',
   '@/assets/css/responsive.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
     { src: '~/plugins/bootstrap.min.js', mode: 'client' },
     { src: '~/plugins/vuex-persist.js',ssr:false},
     { src: '@/plugins/owl.js', ssr: false },
     { src: '@/plugins/skeleton.js', ssr: false },
     { src: '@/plugins/vs-pagination.js', ssr: false },
     { src: '@/plugins/vue-fb-customer-chat.js', ssr: false },
     { src: "~/plugins/facebook-events.js" },

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    'vue-social-sharing/nuxt',
    '@nuxtjs/gtm',
  ],
  gtm: {
    id: 'GTM-5VFJZCL'
  },
  seo: {
    // Module Options
  },
  toast: {
    position: 'bottom-right',
    theme: "bubble",
    duration: 3000
  },

  axios: {
    baseURL: 'http://girlsontop-backend.codeshaper.tech/',
    // Used as fallback if no runtime config is provided
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  // build: {
  //   publicPath: 'https://girlsontop.com.bd/',
  // },
  publicRuntimeConfig: {
    baseURL: 'http://girlsontop-backend.codeshaper.tech/',
  }
}
