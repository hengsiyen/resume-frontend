<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Vue from 'vue'
import helpers from '@/mixins/helpers'
import Header from '~/components/section/Header'
import { themeMixin } from '~/mixins/main'

Vue.use(helpers)
export default {
  name: 'Default',
  components: { Header },
  mixins: [themeMixin],
  beforeCreate () {
    if (process.browser && process.client) {
      if (localStorage && localStorage.hasOwnProperty(process.env.VUE_APP_TOKEN)) {
        this.$router.push({ name: 'user-dashboard', replace: true })
        this.$axios.setHeader('Authorization', `Bearer ${localStorage.getItem(process.env.VUE_APP_TOKEN)}`)
        this.$axios.setHeader('Accept', 'application/json')
        this.$store.dispatch('user/setUser', JSON.parse(localStorage.getItem('user')))
        this.$store.dispatch('user/loggedIn')
      }
    }
  }
}
</script>
