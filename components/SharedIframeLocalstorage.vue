<template>
  <iframe
    :src="`${appUrl}/hub.html`"
    style="display: none"
    id="iframe"
  ></iframe>
</template>

<script>
export default {
  name: 'SharedIframeLocalstorage',
  data () {
    return {
      appUrl: process.env.VUE_APP_PARENT_URL
    }
  }
}
</script>

<style scoped>

</style>
