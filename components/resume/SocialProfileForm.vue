<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group mb-0">
          <label for="label" class="resume-label-control">Label</label>
          <input id="label" type="text" class="resume-form-control">
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group mb-0">
          <label for="link" class="resume-label-control">Link</label>
          <input id="link" type="text" class="resume-form-control">
          <div class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SocialProfileForm'
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
