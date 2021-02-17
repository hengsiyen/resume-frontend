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
  components: { SharedIframeLocalstorage, Header }
}
</script>
