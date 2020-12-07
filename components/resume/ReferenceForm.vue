<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="name" class="resume-label-control">Referent's Full Name</label>
          <input id="name" type="text" class="resume-form-control">
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="company" class="resume-label-control">Company</label>
          <input id="company" type="text" class="resume-form-control">
          <div class="line" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group mb-0">
          <label for="phone" class="resume-label-control">Phone</label>
          <input id="phone" type="text" class="resume-form-control">
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group mb-0">
          <label for="email" class="resume-label-control">Email</label>
          <input id="email" type="text" class="resume-form-control">
          <div class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ReferenceForm'
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
