export default {
  mode: 'spa',  //universal or spa

  server: {
    port: 3001, // default: 3000
    host: '0.0.0.0', // default: localhost,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#ff6600' },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '@/plugins/vant',ssr:true},
    {src: '@/plugins/validate',ssr:false},
    {src:'@/plugins/rem',ssr:false},
    {src:'@/plugins/common',ssr:false},
    {src:'@/plugins/global-resource',ssr:false},
    {src:'@/plugins/axios',ssr:false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    retry: {
      retries: 3
    },
    debug: false
  },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        'postcss-pxtorem':{
          rootValue: 75,
          unitPrecision:7,
          propList: ['*'],
          selectorBlackList:["van-"]
        },
        'postcss-url':false,
        'postcss-nested': {},
        'cssnano': { preset: 'default' },
        'postcss-assets':{
          relative:true,
          loadPaths: ['assets/img']
        }
      },
      preset: {
        stage:2,
        autoprefixer: {
          grid: true,
          overrideBrowserslist: [
            //'last 2 versions',
            'Android >= 4.0',
            'iOS >= 7'
          ]
        },
        importFrom:['assets/css/root.css']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        // config.module.rules.push({
        //   test: /\.postcss$/,
        //   use: [
        //     'vue-style-loader',
        //     'css-loader',
        //     {
        //       loader: 'postcss-loader'
        //     }
        //   ]
        // })
      }
    }
  },
  router: {
    linkActiveClass:'',
    linkExactActiveClass:'active'
  }
}
