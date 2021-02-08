export default function ({ store, $axios }) {
  if (window.localStorage.hasOwnProperty(process.env.VUE_APP_TOKEN)) {
    store.dispatch('user/loggedIn')
    store.dispatch('user/setUser', JSON.parse(localStorage.getItem('user')))
    $axios.setToken(window.localStorage.getItem(process.env.VUE_APP_TOKEN), 'Bearer')
  } else {
    store.dispatch('user/loggedOut')
  }
}
