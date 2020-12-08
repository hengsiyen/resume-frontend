<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="school" class="resume-label-control">Activity name, job title, book title ect.</label>
          <input id="school" type="text" class="resume-form-control">
          <div class="line" />
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
                  :format="eduDateFormat"
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
                  :format="eduDateFormat"
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
    </div>
    <client-only>
      <div class="row">
        <div class="col-12">
          <div class="form-group mb-0">
            <label class="resume-label-control">Description</label>
            <quill-editor
              ref="editor"
              v-model="description"
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
  name: 'CustomSectionForm',
  data () {
    return {
      eduDateFormat: 'MMM, yyyy',
      start_date: new Date(),
      end_date: new Date(),
      show_line: false,
      description: '',
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
