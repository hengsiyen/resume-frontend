<template>
  <div class="rf-section">
    <div class="rf-section__title" :style="!subTitle ? 'margin-bottom: 1.5rem;' : ''">
      <template v-if="editable">
        <div class="form-group mb-0 mr-2">
          <input v-model="section_title" type="text" class="resume-form-control ">
          <div class="line" />
        </div>
      </template>
      <template v-else>
        <div class="ellipsis mr-2">
          {{ section_title }}
        </div>
      </template>
      <template v-if="hasEditButton">
        <template v-if="editable">
          <a
            href="javascript:void(0)"
            class="rf-section__confirm mr-2"
            @click="onConfirm"
          ><i class="fas fa-check-circle" /></a>
          <a
            href="javascript:void(0)"
            class="rf-section__delete mr-2"
            @click="onCancel"
          ><i class="fas fa-times-circle" /></a>
        </template>
        <template v-else>
          <a
            href="javascript:void(0)"
            class="rf-section__edit mr-2"
            @click="onEdit"
          ><i class="fas fa-pencil-alt" /></a>
        </template>
      </template>
      <template v-if="hasDeleteButton && !editable">
        <a
          href="javascript:void(0)"
          class="rf-section__delete"
          @click="onDelete"
        ><i class="far fa-trash-alt" /></a>
      </template>
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
    hasEditButton: {
      type: Boolean,
      default: false
    },
    editable: {
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
    },
    item: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {
      section_title: null
    }
  },
  mounted () {
    this.section_title = this.title
  },
  methods: {
    onDelete () {
      this.$emit('onDelete')
    },

    onEdit () {
      this.$emit('onEdit')
    },

    onConfirm () {
      if (this.item) {
        this.item.title = this.section_title
      }
      this.$emit('onConfirm')
    },

    onCancel () {
      this.section_title = this.title
      this.$emit('onCancel')
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/resume.scss";
</style>
