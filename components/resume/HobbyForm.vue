<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-12">
        <div class="form-group">
          <label for="hobby" class="resume-label-control">What do you like?</label>
          <textarea
            id="hobby"
            v-model="data.hobby"
            name="hobby"
            cols="30"
            rows="5"
            class="resume-form-control"
            @input="refreshResume"
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
  },
  data () {
    return {
      data: {
        hobby: null
      }
    }
  },
  mounted () {
    if (this.item) {
      this.data = this.item
    }
  },
  methods: {
    refreshResume () {
      this.$emit('refreshResume')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
