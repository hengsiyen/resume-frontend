<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import Vue from 'vue'
import helpers from '@/mixins/helpers'
import resume from '@/mixins/resume'
import { themeMixin } from '~/mixins/main'

Vue.use(helpers)
Vue.use(resume)
export default {
  mixins: [themeMixin]
}
</script>
