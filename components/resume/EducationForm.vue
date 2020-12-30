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
              @change="refreshResume"
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
    degreeVal () {
      if (this.item) {
        return this.item.degree
      }
      return null
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
