<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import Vue from 'vue'
import helpers from '@/mixins/helpers'
import resumes from '@/mixins/resume'
import { themeMixin } from '~/mixins/main'

Vue.use(helpers)
Vue.use(resumes)
export default {
  name: 'Secondary',
  mixins: [themeMixin],
  created () {
    if (this.$store.state.user.authenticated) {
      this.$router.push({ path: this.$route.path })
      this.$axios.setToken(localStorage.getItem(process.env.VUE_APP_TOKEN), 'Bearer')
    } else {
      this.$router.push({ name: 'index', replace: true })
    }
  }
}
</script>
