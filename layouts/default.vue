<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from '~/components/section/Header'
import { themeMixin } from '~/mixins/main'
export default {
  components: { Header },
  mixins: [themeMixin]
}
</script>
