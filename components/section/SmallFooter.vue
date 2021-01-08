<template>
  <div class="d-block text-center pb-2">
    <span class="mr-1 text-muted">Copyright © 2020 by {{ app_name }}. Powered by</span>
    <a href="http://asorasoft.com/" class="text-muted"> Asorasoft</a>
  </div>
</template>

<script>
export default {
  name: 'SmallFooter',
  data () {
    return {
      app_name: process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>
