<template>
  <div class="rf-section">
    <div class="rf-section__title" :style="!subTitle ? 'margin-bottom: 1.5rem;' : ''">
      <div class="ellipsis mr-2">
        {{ title }}
      </div>
      <div v-if="hasDeleteButton" class="rf-section__delete">
        <i class="far fa-trash-alt" />
      </div>
      <div
        v-if="draggable"
        class="rf-section__draggable"
        data-toggle="tooltip"
        data-placement="top"
        title="Tooltip on top"
      >
        <i class="fas fa-ellipsis-v" />
      </div>
    </div>
    <div class="rf-section__sub-title">
      <div>
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
    draggable: {
      type: Boolean,
      default: false
    },
    hasDeleteButton: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Untitled'
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
