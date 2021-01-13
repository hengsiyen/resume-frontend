<template>
  <div>
    <Header />
    <Nuxt />
    <SharedIframeLocalstorage />
  </div>
</template>

<script>
import Vue from 'vue'
import helpers from '@/mixins/helpers'
import Header from '~/components/section/Header'
import SharedIframeLocalstorage from '~/components/SharedIframeLocalstorage'

Vue.use(helpers)
export default {
  name: 'Default',
  components: { SharedIframeLocalstorage, Header },
  async beforeMount () {
    const self = this
    const env = process.env.VUE_APP_ENV
    if (process.env.ENABLE_CROSS === 'true') {
      if (env === 'local') {
        this.setUserPreference()
      } else {
        await self.copyAllLocalStorages().then(() => {
          self.setUserPreference()
        })
      }
    }
  },
  methods: {
    async copyAllLocalStorages () {
      const self = this
      const iframe = document.getElementById('iframe')
      if (iframe && iframe.contentWindow) {
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
                    self.$store.dispatch('user/setUser', JSON.parse(localStorage.getItem('user')))
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
          if (localStorage.hasOwnProperty(process.env.VUE_APP_TOKEN)) {
            self.$store.dispatch('user/loggedIn')
          }
        })
      }
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
</script>
