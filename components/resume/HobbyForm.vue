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
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            ref="focusInput"
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
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      data: {
        hobby: null,
        on_focus: false
      }
    }
  },
  mounted () {
    if (this.item.length > 0) {
      this.data = this.item[0]
    } else {
      this.item.push(this.data)
    }
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
      if (this.item.length > 0) {
        this.item[0].hobby = this.data.hobby
      }
      this.$emit('refreshResume')
    },
    onEditorBlur (event) {
      if (this.on_focus) {
        this.refreshResume()
      }
      this.on_focus = false
    },
    onEditorFocus (event) {
      this.on_focus = true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
