export default function ({ $axios }) {
  $axios.onRequest((config) => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Access-Control-Allow-Origin'] = '*'
    if (window.localStorage.hasOwnProperty(process.env.VUE_APP_TOKEN)) {
      $axios.setToken(window.localStorage.getItem(process.env.VUE_APP_TOKEN), 'Bearer')
    }
  })
}
