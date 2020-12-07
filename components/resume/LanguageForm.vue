<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group mb-0">
          <label for="language" class="resume-label-control">Language</label>
          <input id="language" type="text" class="resume-form-control">
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group mb-0">
          <label for="level" class="resume-label-control">Level</label>
          <input id="level" type="text" class="resume-form-control">
          <div class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LanguageForm'
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
