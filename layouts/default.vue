<template>
  <div>
    <div class="d-none d-md-block">
      <Header />
      <Nuxt />
    </div>
    <div class="not-supp-mobile-screen">
      <MobileScreen />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import helpers from '@/mixins/helpers'
import Header from '~/components/section/Header'
import { themeMixin } from '~/mixins/main'
import MobileScreen from '~/components/MobileScreen'

Vue.use(helpers)
export default {
  name: 'Default',
  components: { MobileScreen, Header },
  mixins: [themeMixin]
}
</script>
