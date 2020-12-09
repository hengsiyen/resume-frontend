<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-12">
        <div class="form-group">
          <label for="hobby" class="resume-label-control">What do you like?</label>
          <textarea
            id="hobby"
            v-model="item.hobby"
            name="hobby"
            cols="30"
            rows="5"
            class="resume-form-control"
          />
          <div class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HobbyForm',
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
