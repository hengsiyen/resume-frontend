<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="name" class="resume-label-control">Referent's Full Name</label>
          <input
            id="name"
            v-model="item.name"
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
          <label for="company" class="resume-label-control">Company</label>
          <input
            id="company"
            v-model="item.company"
            type="text"
            class="resume-form-control"
            @input="refreshResume"
          >
          <div class="line" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group mb-0">
          <label for="phone" class="resume-label-control">Phone</label>
          <input
            id="phone"
            v-model="item.phone"
            type="text"
            class="resume-form-control"
            @input="refreshResume"
          >
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group mb-0">
          <label for="email" class="resume-label-control">Email</label>
          <input
            id="email"
            v-model="item.email"
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
  name: 'ReferenceForm',
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
