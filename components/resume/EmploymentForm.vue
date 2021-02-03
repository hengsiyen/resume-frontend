<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label class="resume-label-control">Job Title</label>
          <autocomplete
            :search="searchPosition"
            :default-value="positionVal"
            aria-label="Search city / province"
            :get-result-value="getPositionResultValue"
            @update="updatePosition"
            @submit="submitPosition"
            ref="focusInput"
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
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="employer" class="resume-label-control">Employer</label>
          <input
            id="employer"
            v-model="item.employer"
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
        <div class="form-group">
          <label class="resume-label-control">Country</label>
          <autocomplete
            :search="searchCountry"
            :default-value="countryVal"
            aria-label="Search city / province"
            :get-result-value="getCountryResultValue"
            @update="updateCountry"
            @submit="submitCountry"
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
    <StartAndEndDate :item="item" @refreshResume="refreshResume" />
    <div class="row">
      <div class="col-12">
        <div class="form-group mb-0">
          <label class="resume-label-control">Description</label>
          <quill-editor
            ref="expEditor"
            id="expEditor"
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
  </div>
</template>

<script>

import { dataOptions } from '@/mixins/dataOptions'
import StartAndEndDate from '~/components/resume/StartAndEndDate'

export default {
  name: 'EmploymentForm',
  components: { StartAndEndDate },
  props: {
    item: {
      type: Object,
      default: () => {
        return null
      }
    },
    dataCountry: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataProvinces: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataPositions: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      show_line: false,
      content: '',
      editorOption: dataOptions.editorOption
    }
  },
  computed: {
    provinceVal () {
      if (this.item) {
        return this.item.province
      }
      return null
    },
    countryVal () {
      if (this.item) {
        return this.item.country
      }
      return null
    },
    positionVal () {
      if (this.item) {
        return this.item.job_title
      }
      return null
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
        if (this.$refs.focusInput.$refs.input) {
          this.$refs.focusInput.$refs.input.focus()
        }
      }
    },
    refreshResume () {
      this.$emit('refreshResume')
    },

    searchCountry (input) {
      this.item.country = input
      this.refreshResume()
      if (input < 1) {
        return []
      }
      return this.dataCountry.filter((country) => {
        return country.name_en.toLowerCase().startsWith(input.toLowerCase())
      })
    },
    getCountryResultValue (result) {
      return result.name_en
    },
    updateCountry (results, selectedIndex) {
      if (selectedIndex > -1) {
        if (results[selectedIndex]) {
          this.item.country = results[selectedIndex].name_en
        }
      }
    },
    submitCountry (result) {
      if (result) {
        this.item.country = result.name_en
        this.refreshResume()
      }
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

    searchPosition (input) {
      this.item.job_title = input
      this.refreshResume()
      if (input < 1) {
        return []
      }
      return this.dataPositions.filter((position) => {
        return position.name_en.toLowerCase().startsWith(input.toLowerCase())
      })
    },
    getPositionResultValue (result) {
      return result.name_en
    },
    updatePosition (results, selectedIndex) {
      if (selectedIndex > -1) {
        if (results[selectedIndex]) {
          this.item.job_title = results[selectedIndex].name_en
        }
      }
    },
    submitPosition (result) {
      if (result) {
        this.item.position = result.name_en
        this.refreshResume()
      }
    },

    onEditorBlur (editor) {
      if (this.show_line) {
        this.refreshResume()
      }
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
