<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="title" class="resume-label-control">
            <span class="ellipsis">Activity name, job title, book title ect.</span>
          </label>
          <input
            id="title"
            v-model="item.title"
            type="text"
            class="resume-form-control"
            @input="refreshResume"
          >
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label class="resume-label-control">City / Province</label>
          <autocomplete
            :search="search"
            :default-value="provinceVal"
            aria-label="Search city / province"
            :get-result-value="getProvinceResultValue"
            @update="updateProvince"
            @submit="submitProvince"
          >
            <template #result="{ result, props }">
              <li v-bind="props">
                <div class="wiki-title">
                  {{ result.name_en }}
                </div>
              </li>
            </template>
          </autocomplete>
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
                  v-model="date_from"
                  placeholder="MM / YYYY"
                  :format="eduDateFormat"
                  input-class="resume_date_picker"
                  calendar-class="resume_calendar"
                  :minimum-view="'month'"
                  :maximum-view="'year'"
                  :initial-view="'year'"
                  @closed="selectedStartDate"
                />
                <div class="line" />
              </div>
              <div class="col-12 col-sm-6 pl-sm-1">
                <datepicker
                  v-model="date_until"
                  placeholder="MM / YYYY"
                  :format="eduDateFormat"
                  input-class="resume_date_picker"
                  calendar-class="resume_calendar"
                  :minimum-view="'month'"
                  :maximum-view="'year'"
                  :initial-view="'year'"
                  @closed="selectedEndDate"
                />
                <div class="line" />
              </div>
            </div>
          </client-only>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <client-only>
          <div class="form-group mb-0">
            <label class="resume-label-control">Description</label>
            <quill-editor
              ref="editor"
              v-model="item.description"
              :class="{'editor': show_line}"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="refreshResume"
            />
            <div class="ql-editor-line" />
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>

import { dataOptions } from '@/mixins/dataOptions'

export default {
  name: 'CustomSectionForm',
  props: {
    item: {
      type: Object,
      default: () => {
        return null
      }
    },
    dataProvinces: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      eduDateFormat: 'MMM, yyyy',
      show_line: false,
      editorOption: dataOptions.editorOption,
      date_from: new Date(),
      date_until: new Date()
    }
  },
  computed: {
    provinceVal () {
      if (this.item) {
        return this.item.province
      }
      return null
    }
  },
  mounted () {
    if (this.item) {
      this.date_from = this.convertDateFormat(this.item.date_from)
      this.date_until = this.convertDateFormat(this.item.date_until)
    }
  },
  methods: {
    refreshResume () {
      this.$emit('refreshResume')
    },
    search (input) {
      this.item.province = input
      this.refreshResume()
      if (input < 1) {
        return []
      }
      return this.dataProvinces.filter((province) => {
        return province.name_en.toLowerCase().startsWith(input.toLowerCase())
      })
    },

    getProvinceResultValue (result) {
      return result.name_en
    },

    updateProvince (results, selectedIndex) {
      if (selectedIndex > -1) {
        if (results[selectedIndex]) {
          this.item.province = results[selectedIndex].name_en
        }
      }
    },

    submitProvince (result) {
      if (result) {
        this.item.province = result.name_en
        this.refreshResume()
      }
    },

    onEditorBlur (editor) {
      this.show_line = false
    },

    onEditorFocus (editor) {
      this.show_line = true
    },

    selectedStartDate () {
      this.item.date_from = this.convertDateFormat(this.date_from, 'YYYY-MM-DD')
      this.refreshResume()
    },

    selectedEndDate () {
      this.item.date_until = this.convertDateFormat(this.date_until, 'YYYY-MM-DD')
      this.refreshResume()
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
