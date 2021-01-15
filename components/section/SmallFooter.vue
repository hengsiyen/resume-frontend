<template>
  <div class="d-block text-center pb-2 px-2 small-footer">
    <span class="mr-1 text-muted">Copyright © 2020 by {{ app_name }}.</span>
    <span class="text-muted">Powered by <a href="http://asorasoft.com/" class="text-muted">Asorasoft</a></span>
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
@media screen and (max-width: 576px) {
  .small-footer span {
    display: block;
    width: 100%;
    font-size: 14px;
  }
}
</style>
