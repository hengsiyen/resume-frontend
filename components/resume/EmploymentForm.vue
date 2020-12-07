<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="jobTitle" class="resume-label-control">Job Title</label>
          <input id="jobTitle" type="text" class="resume-form-control">
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="employer" class="resume-label-control">Employer</label>
          <input id="employer" type="text" class="resume-form-control">
          <div class="line" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label class="resume-label-control">Start & End Date</label>
          <client-only>
            <div class="row">
              <div class="col-12 col-sm-6 pr-sm-1">
                <datepicker
                  v-model=" start_date"
                  placeholder="MM / YYYY"
                  :format="empDateFormat"
                  input-class="resume_date_picker"
                  calendar-class="resume_calendar"
                  :minimum-view="'month'"
                  :maximum-view="'month'"
                />
                <div class="line" />
              </div>
              <div class="col-12 col-sm-6 pl-sm-1">
                <datepicker
                  v-model="end_date"
                  placeholder="MM / YYYY"
                  :format="empDateFormat"
                  input-class="resume_date_picker"
                  calendar-class="resume_calendar"
                  :minimum-view="'month'"
                  :maximum-view="'month'"
                  calendar-button-icon="fa fa-calendar"
                />
                <div class="line" />
              </div>
            </div>
          </client-only>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="city" class="resume-label-control">City</label>
          <input id="city" type="text" class="resume-form-control">
          <div class="line" />
        </div>
      </div>
    </div>
    <client-only>
      <div class="row">
        <div class="col-12">
          <div class="form-group mb-0">
            <quill-editor
              ref="editor"
              v-model="content"
              :class="{'editor': show_line}"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
            />
            <div class="ql-editor-line" />
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>

import { dataOptions } from '@/mixins/dataOptions'

export default {
  name: 'EmploymentForm',
  data () {
    return {
      empDateFormat: 'MMM, yyyy',
      start_date: new Date(),
      end_date: new Date(),
      show_line: false,
      content: '',
      editorOption: dataOptions.editorOption
    }
  },
  methods: {
    onEditorBlur (editor) {
      this.show_line = false
    },
    onEditorFocus (editor) {
      this.show_line = true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
