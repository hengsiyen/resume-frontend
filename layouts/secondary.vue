<template>
  <div>
    <div class="not-supp-mobile-screen">
      <MobileScreen />
    </div>
    <div class="d-none d-md-block">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import helpers from '@/mixins/helpers'
import resumes from '@/mixins/resume'
import { themeMixin } from '~/mixins/main'
import MobileScreen from '~/components/MobileScreen'

Vue.use(helpers)
Vue.use(resumes)
export default {
  name: 'Secondary',
  components: { MobileScreen },
  mixins: [themeMixin]
}
</script>
