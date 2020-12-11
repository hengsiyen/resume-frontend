<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group mb-0">
          <label class="resume-label-control">Language</label>
          <autocomplete
            :search="search"
            :default-value="langValue"
            aria-label="Search skill"
            :get-result-value="getResultValue"
            @update="update"
            @submit="submit"
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
          <label for="level" class="resume-label-control">Level</label>
          <select id="level" v-model="item.level" name="level" class="resume-form-control">
            <option :value="null">
              Select level
            </option>
            <template v-for="(l_item, key) in language_levels">
              <option :key="key" :value="l_item.name_en">
                {{ l_item.name_en }}
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
      languages: []
    }
  },
  computed: {
    langValue () {
      if (this.item) {
        return this.item.language
      }
      return null
    }
  },
  mounted () {
    this.getLanguagesLvlOptions()
    this.getLanguages()
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
    },

    update (results, selectedIndex) {
      if (selectedIndex > -1) {
        if (results[selectedIndex]) {
          this.item.language = results[selectedIndex].name_en
        }
      }
    },
    submit (result) {
      if (result) {
        this.item.language = result.name_en
      }
    },
    getResultValue (result) {
      return result.name_en
    },
    search (input) {
      this.item.language = input
      if (input < 1) {
        return []
      }
      return this.languages.filter((language) => {
        return language.name_en.toLowerCase().startsWith(input.toLowerCase())
      })
    },
    getLanguages () {
      this.$axios
        .get(this.$base_api + '/api/frontend/language/get-option')
        .then((res) => {
          this.languages = res.data.data
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
