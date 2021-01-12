export const facebookSdkMixin = {
  mounted () {
    if (process.browser && process.client) {
      window.fbAsyncInit = function () {
        FB.init({
          appId: process.env.FACEBOOK_CLIENT_ID,
          cookie: true,
          xfbml: true,
          version: process.env.FACEBOOK_VERSION
        })
        FB.AppEvents.logPageView()
      };

      (function (d, s, id) {
        let js
        const fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
          return
        }
        // eslint-disable-next-line prefer-const
        js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
    }
  },
  methods: {
    resultCallback (access_token) {
      const self = this
      this.$axios.post(this.$base_api + '/api/auth/frontend/login-with-facebook', {
        access_token
      }).then((response) => {
        if (response.status === 200) {
          const result = response.data.data
          // set token on local storage
          localStorage.setItem(process.env.VUE_APP_TOKEN, result.access_token)
          localStorage.setItem(process.env.VUE_APP_REFRESH_TOKEN, result.refresh_token)
          localStorage.setItem('user', JSON.stringify(result.user))

          // set cross-domain
          // this.$setLocalStorage(process.env.VUE_APP_TOKEN, result.access_token)
          // this.$setLocalStorage(process.env.VUE_APP_REFRESH_TOKEN, result.refresh_token)
          // this.$setLocalStorage('user', JSON.stringify(result.user))

          // set authorization on axios
          this.$axios.setToken(result.access_token, 'Bearer')
          this.$axios.defaults.headers.common.Accept = 'application/json'
          // set value on vuex
          this.$store.dispatch('user/setUser', result.user)
          this.$store.dispatch('user/loggedIn')
          this.$router.push({
            name: 'user-dashboard',
            replace: true
          })
        }
      }).catch((error) => {
        const e = error.response
        if (e.status === 401) {
          self.isLoginFail = true
        }
      })
    },
    loginWithFB () {
      const self = this
      FB.login(function (response) {
        if (response && response.status === 'connected') { // Logged into your webpage and Facebook.
          self.$store.dispatch('user/setFacebookAuth', response.authResponse)
          localStorage.setItem('f.a', JSON.stringify(response.authResponse))
          self.resultCallback(response.authResponse.accessToken)
        }
      }, { scope: 'email' })
    },
    statusChangeCallback (response) {
      // Called with the results from FB.getLoginStatus().
      // The current login status of the person.
      const self = this
      if (response && response.status === 'connected') { // Logged into your webpage and Facebook.
        self.$store.dispatch('user/setFacebookAuth', response.authResponse)
        localStorage.setItem('f.a', JSON.stringify(response.authResponse))
        self.resultCallback(response.authResponse.accessToken)
      } else {
        self.loginWithFB()
      }
    },
    checkLoginState () {
      const self = this
      // Called when a person is finished with the Login Button.
      FB.getLoginStatus(function (response) { // See the on login handler
        self.statusChangeCallback(response)
      })
    },
    facebookLogout () {
      FB.logout(function (response) {
        console.log('facebook logout')
      })
    },

    connectWithFB () {
      const self = this
      FB.login(function (response) {
        if (response && response.status === 'connected') { // Logged into your webpage and Facebook.
          self.$store.dispatch('user/setFacebookAuth', response.authResponse)
          localStorage.setItem('f.a', JSON.stringify(response.authResponse))
          self.connectWithFacebook(response.authResponse.accessToken)
        }
      }, { scope: 'email' })
    },
    connectWithFacebook (access_token) {
      this.$isLoading(true)
      this.$axios
        .post(this.$base_api + '/api/auth/frontend/connect-with-facebook', {
          access_token
        })
        .then((response) => {
          if (response.status === 200) {
            const result = response.data.data
            this.$store.dispatch('user/setUser', result)
          }
        })
        .finally(() => {
          this.$isLoading(false)
        })
    }
  }
}
