<template>
  <div>
    <Nuxt/>
  </div>
</template>

<script>
import Vue from 'vue'
import helpers from '@/mixins/helpers'
import resumes from '@/mixins/resume'

Vue.use(helpers)
Vue.use(resumes)
export default {
  name: 'public'
}
</script>

<style scoped>

</style>
