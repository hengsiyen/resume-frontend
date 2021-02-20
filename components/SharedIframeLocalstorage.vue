<template>
  <div v-if="enableCross === 'true'">
    <iframe
      :src="`${appUrl}/hub.html`"
      style="display: none"
      id="iframeTalentPlus"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'SharedIframeLocalstorage',
  data () {
    return {
      appUrl: process.env.VUE_APP_PARENT_URL,
      enableCross: process.env.ENABLE_CROSS
    }
  }
}
</script>

<style scoped>

</style>
