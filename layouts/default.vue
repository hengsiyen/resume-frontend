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
  mixins: [themeMixin]
}
</script>
