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
  created () {
    if (this.$store.state.user.authenticated) {
      console.log('1')
      this.$router.push({ path: this.$route.path, replace: true })
    } else {
      console.log('0')
      this.$router.push({ name: 'index', replace: true })
    }
  }
}
</script>
