<template>
  <div v-if="enableCross === 'true'">
    <iframe
      :src="`${appUrl}/hub.html`"
      style="display: none"
      id="iframeTalentPlus"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'SharedIframeLocalstorage',
  data () {
    return {
      appUrl: process.env.VUE_APP_PARENT_URL,
      enableCross: process.env.ENABLE_CROSS
    }
  },
  async beforeMount () {
    const self = this
    const env = process.env.VUE_APP_ENV
    if (process.env.ENABLE_CROSS === 'true') {
      if (env === 'local') {
        this.setUserPreference()
      } else {
        await self.copyAllLocalStorages()
      }
    }
  },
  methods: {
    copyAllLocalStorages () {
      const iframe = document.getElementById('iframeTalentPlus')
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ action: 'get' }, '*')
        window.addEventListener('message', (event) => {
          const {
            action,
            key,
            value
          } = event.data
          if (action === 'returnData') {
            const self = this
            console.log(value)
            if (value.length > 0) {
              value.forEach((item) => {
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
          }
        }, false)
      }
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

<style scoped>

</style>
