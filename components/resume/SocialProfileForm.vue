<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group mb-0">
          <label for="label" class="resume-label-control">Label</label>
          <input
            id="label"
            v-model="item.label"
            type="text"
            class="resume-form-control"
            @input="refreshResume"
          >
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group mb-0">
          <label for="link" class="resume-label-control">Link</label>
          <input
            id="link"
            v-model="item.link"
            type="text"
            class="resume-form-control"
            @input="refreshResume"
          >
          <div class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SocialProfileForm',
  props: {
    item: {
      type: Object,
      default: () => {
        return null
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
