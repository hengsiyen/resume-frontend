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
  components: {
    SharedIframeLocalstorage,
    Header
  },
  mounted () {
    const self = this
    const env = process.env.VUE_APP_ENV
    if (process.env.ENABLE_CROSS === 'true') {
      if (env === 'local') {
        this.setUserPreference()
      } else {
        self.copyAllLocalStorages()
      }
    }
  },
  methods: {
    getAllLocalStorages () {
      const iframe = document.getElementById('iframeTalentPlus')
      iframe.contentWindow.postMessage({ action: 'getAll' }, '*')
    },
    copyAllLocalStorages () {
      this.getAllLocalStorages()
      const self = this
      window.addEventListener('message', function (event) {
        const data = event.data
        if (event.origin === process.env.VUE_APP_PARENT_URL) {
          switch (data.action) {
            case 'set':
            case 'returnAllLocalstorage':
              if (data.value.length > 0) {
                data.value.forEach((item) => {
                  localStorage.setItem(item.key, item.value)
                  if (item.key === process.env.VUE_APP_TOKEN) {
                    self.$axios.setToken(item.value, 'Bearer')
                    self.$axios.defaults.headers.common.Accept = 'application/json'
                  }
                  if (item.key === 'user') {
                    self.$store.dispatch('user/setUser', JSON.parse(item.value))
                    self.$store.dispatch('user/loggedIn')
                  }
                })
                self.$router.push({
                  name: 'user-dashboard',
                  replace: true
                })
              }
              break
            case 'removeAll':
              localStorage.clear()
              self.$router.push({
                name: 'index',
                replace: true
              })
              break
          }
        }
      }, false)
    },
    setUserPreference () {
      const access_token = this.$cookies.get(process.env.VUE_APP_TOKEN)
      if (access_token) {
        this.$store.dispatch('user/loggedIn')
        this.$axios.setHeader('Authorization', `Bearer ${access_token}`)
        this.$axios.setHeader('Accept', 'application/json')

        if (localStorage.hasOwnProperty('f.a')) {
          this.$store.dispatch('user/setFacebookAuth', JSON.parse(localStorage.getItem('f.a')))
        }
      }
    }
  }
}
</script>
