<template>
  <div class="rf-section">
    <div class="rf-section__title" :style="!subTitle ? 'margin-bottom: 1.5rem;' : ''">
      <div class="ellipsis">
        {{ title }}
      </div>
    </div>
    <div class="rf-section__sub-title">
      <div class="ellipsis">
        {{ subTitle }}
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FormSection',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/resume.scss";
</style>
