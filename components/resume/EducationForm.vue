<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="school" class="resume-label-control">School</label>
          <input id="school" v-model="item.school" type="text" class="resume-form-control">
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="degree" class="resume-label-control">Degree</label>
          <input id="degree" v-model="item.degree" type="text" class="resume-form-control">
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
                  v-model="start_date"
                  placeholder="MM / YYYY"
                  :format="eduDateFormat"
                  input-class="resume_date_picker"
                  calendar-class="resume_calendar"
                  :minimum-view="'month'"
                  :maximum-view="'month'"
                  @closed="selectedStartDate"
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
                  @closed="selectedEndDate"
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
          <input id="city" v-model="item.city" type="text" class="resume-form-control">
          <div class="line" />
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
              v-model="item.description"
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
  name: 'EducationForm',
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
      eduDateFormat: 'MMM, yyyy',
      show_line: false,
      editorOption: dataOptions.editorOption,
      start_date: new Date(),
      end_date: new Date()
    }
  },
  mounted () {
    if (this.item) {
      this.start_date = this.convertDateFormat(this.item.start_date)
      this.end_date = this.convertDateFormat(this.item.end_date)
    }
  },
  methods: {
    onEditorBlur (editor) {
      this.show_line = false
    },
    onEditorFocus (editor) {
      this.show_line = true
    },
    selectedStartDate () {
      this.item.start_date = this.convertDateFormat(this.start_date, 'YYYY-MM-DD')
    },
    selectedEndDate () {
      this.item.end_date = this.convertDateFormat(this.end_date, 'YYYY-MM-DD')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
