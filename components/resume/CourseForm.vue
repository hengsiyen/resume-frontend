<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="course" class="resume-label-control">Course</label>
          <input
            id="course"
            v-model="item.course"
            type="text"
            class="resume-form-control"
            @input="refreshResume"
            ref="focusInput"
          >
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="institution" class="resume-label-control">Institution</label>
          <input
            id="institution"
            v-model="item.institution"
            type="text"
            class="resume-form-control"
            @input="refreshResume"
          >
          <div class="line" />
        </div>
      </div>
    </div>
    <StartAndEndDate :item="item" @refreshResume="refreshResume" />
  </div>
</template>

<script>

import StartAndEndDate from '~/components/resume/StartAndEndDate'
export default {
  name: 'CourseForm',
  components: { StartAndEndDate },
  props: {
    item: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.onFocusInput()
    })
  },
  methods: {
    onFocusInput () {
      if (this.$refs.focusInput) {
        this.$refs.focusInput.focus()
      }
    },
    refreshResume () {
      this.$emit('refreshResume')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
