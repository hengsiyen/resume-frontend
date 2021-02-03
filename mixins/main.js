export const themeMixin = {
  methods: {
    async copyAllLocalStorages () {
      const self = this
      const iframe = document.getElementById('iframe')
      iframe.contentWindow.postMessage({ action: 'getAll' }, '*')
      window.addEventListener('message', async (event) => {
        if (window.origin !== process.env.VUE_APP_PARENT_URL) {
          await self.$store.dispatch('user/loggedOut')
          localStorage.clear()
        }
        if (event.data && event.data.action && event.data.action === 'returnAllLocalstorage') {
          const localStorages = event.data.value
          if (localStorages.length && (window.origin !== process.env.VUE_APP_PARENT_URL)) {
            localStorages.forEach((item) => {
              localStorage.setItem(item.key, item.value)
              switch (item.key) {
                case process.env.VUE_APP_TOKEN:
                  self.$axios.setHeader('Authorization', `Bearer ${item.value}`)
                  self.$axios.setHeader('Accept', 'application/json')
                  break
                case 'user':
                  self.$store.dispatch('user/loggedIn')
                  self.$store.dispatch('user/setUser', {
                    user: JSON.parse(localStorage.getItem('user'))
                  })
                  break
                case 'f.a':
                  self.$store.dispatch('user/setFacebookAuth', JSON.parse(localStorage.getItem('f.a')))
                  break
              }
            })
          }
        } else {
          console.warn('Can not received iframe data.')
          await this.copyAllLocalStorages()
        }
      })
    },
    setUserPreference () {
      const access_token = this.$cookies.get(process.env.VUE_APP_TOKEN)
      if (access_token) {
        this.$store.dispatch('user/loggedIn')
        this.$axios.setHeader('Authorization', `Bearer ${access_token}`)
        this.$axios.setHeader('Accept', 'application/json')
        this.getUser()

        if (localStorage.hasOwnProperty('f.a')) {
          this.$store.dispatch('user/setFacebookAuth', JSON.parse(localStorage.getItem('f.a')))
        }
      }
    },
    async getUser () {
      this.$axios.post(this.$base_api + '/api/auth/user')
        .then(({ data }) => {
          if (data.data) {
            const user = data.data
            localStorage.setItem('user', JSON.stringify(user))
            this.$store.dispatch('user/setUser', user)
          }
        })
    }
  }
}
