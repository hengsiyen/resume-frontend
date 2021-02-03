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
            ref="focusInput"
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
    <StartAndEndDate :item="item" @refreshResume="refreshResume" />
    <div class="row">
      <div class="col-12">
        <client-only>
          <div class="form-group mb-0">
            <label class="resume-label-control">Description</label>
            <quill-editor
              ref="cusEditor"
              id="cusEditor"
              v-model="item.description"
              :class="{'editor': show_line}"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
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
import StartAndEndDate from '~/components/resume/StartAndEndDate'

export default {
  name: 'CustomSectionForm',
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
