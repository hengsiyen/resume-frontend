<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-12">
        <div class="form-group">
          <label for="hobby" class="resume-label-control">What do you like?</label>
          <textarea name="hobby" id="hobby" cols="30" rows="5" class="resume-form-control"></textarea>
          <div class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HobbyForm'
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
