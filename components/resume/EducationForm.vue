<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="school" class="resume-label-control">School</label>
          <input
            id="school"
            v-model="item.school"
            type="text"
            ref="focusInput"
            class="resume-form-control"
            @input="refreshResume"
          >
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label class="resume-label-control">Degree</label>
          <autocomplete
            :search="searchDegree"
            :default-value="degreeVal"
            :get-result-value="getDegreeResultValue"
            @update="updateDegree"
            @submit="submitDegree"
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
    <StartAndEndDate :item="item" @refreshResume="refreshResume" :label-toggle="'Currently study here'" />
    <slot></slot>
  </div>
</template>

<script>

import { dataOptions } from '@/mixins/dataOptions'
import StartAndEndDate from '~/components/resume/StartAndEndDate'

export default {
  name: 'EducationForm',
  components: { StartAndEndDate },
  props: {
    item: {
      type: Object,
      default: () => {
        return null
      }
    },
    itemKey: {
      type: String,
      default: ''
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
    dataDegree: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      show_line: false,
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
    degreeVal () {
      if (this.item) {
        return this.item.degree
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
        this.$refs.focusInput.focus()
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

    searchDegree (input) {
      this.item.degree = input
      this.refreshResume()
      if (input < 1) {
        return []
      }
      return this.dataDegree.filter((province) => {
        return province.name_en.toLowerCase().startsWith(input.toLowerCase())
      })
    },
    getDegreeResultValue (result) {
      return result.name_en
    },
    updateDegree (results, selectedIndex) {
      if (selectedIndex > -1) {
        if (results[selectedIndex]) {
          this.item.degree = results[selectedIndex].name_en
        }
      }
    },
    submitDegree (result) {
      if (result) {
        this.item.degree = result.name_en
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
