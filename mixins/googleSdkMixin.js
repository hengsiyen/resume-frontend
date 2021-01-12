export const googleSdkMixin = {
  methods: {
    async loginWithGoogle () {
      try {
        const self = this
        const googleUser = await this.$gAuth.signIn()
        if (!googleUser) {
          return null
        }
        const access_token = googleUser.getAuthResponse().access_token
        this.$isLoading(true)
        this.$axios
          .post(this.$base_api + '/api/auth/frontend/login-with-google', {
            access_token
          })
          .then((response) => {
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
          })
          .catch((error) => {
            const e = error.response
            if (e.status === 401) {
              self.isLoginFail = true
            }
          })
          .finally(() => {
            this.$isLoading(false)
          })
      } catch (error) {
        console.error(error)
        return null
      }
    },
    async connectWithGoogle () {
      try {
        const self = this
        const googleUser = await this.$gAuth.signIn()
        if (!googleUser) {
          return null
        }
        const access_token = googleUser.getAuthResponse().access_token
        this.$isLoading(true)
        this.$axios
          .post(this.$base_api + '/api/auth/frontend/connect-with-google', {
            access_token
          })
          .then((response) => {
            const result = response.data.data
            this.$store.dispatch('user/setUser', result)
          })
          .finally(() => {
            this.$isLoading(false)
          })
      } catch (error) {
        console.error(error)
        return null
      }
    }
  }
}
