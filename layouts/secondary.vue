<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import Vue from 'vue'
import helpers from '@/mixins/helpers'
import { themeMixin } from '~/mixins/main'

Vue.use(helpers)
export default {
  mixins: [themeMixin]
}
</script>
