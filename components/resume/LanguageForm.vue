<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group mb-0">
          <label for="language" class="resume-label-control">Language</label>
          <input id="language" v-model="item.language" type="text" class="resume-form-control">
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="level" class="resume-label-control">Level</label>
          <select id="level" v-model="item.level" name="level" class="resume-form-control">
            <option :value="null">
              Select level
            </option>
            <template v-for="(item, key) in language_levels">
              <option :key="key" :value="item.name_en">
                {{ item.name_en }}
              </option>
            </template>
          </select>
          <i class="fa fa-chevron-down" />
          <div class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LanguageForm',
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
      language_levels: [],
      limit: 10,
      queryText: '',
      suggestions: [],
      filteredSuggestions: [],
      inputProps: {
        id: 'autosuggest__input',
        placeholder: '',
        class: 'text-ellipsis'
      }
    }
  },
  mounted () {
    this.getLanguagesLvlOptions()
    if (this.item) {
      this.queryText = this.item.language
    }
  },
  methods: {
    getLanguagesLvlOptions () {
      this.$axios
        .get(this.$base_api + '/api/frontend/language-level/get-option')
        .then((res) => {
          this.language_levels = res.data.data
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
