<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label class="resume-label-control">Skill</label>
          <vue-autosuggest
            ref="autosuggest"
            v-model="queryText"
            class="position-relative"
            :suggestions="filteredSuggestions"
            :input-props="inputProps"
            :get-suggestion-value="getSuggestionValue"
            @input="inputText"
          >
            <template slot="after-input">
              <div class="line" />
            </template>
            <template slot-scope="{ suggestion }">
              <div class="row">
                <div class="col-12">
                  {{ suggestion.item.name_en }}
                </div>
              </div>
            </template>
          </vue-autosuggest>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="level" class="resume-label-control">Level</label>
          <select id="level" name="level" class="resume-form-control">
            <option :value="null">
              Select level
            </option>
            <option value="1">
              Novice
            </option>
            <option value="2">
              Beginner
            </option>
            <option value="3">
              Skillful
            </option>
            <option value="4">
              Experienced
            </option>
            <option value="5">
              Expert
            </option>
          </select>
          <i class="fa fa-chevron-down" />
          <div class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'debounce'

export default {
  name: 'SkillForm',
  data () {
    return {
      limit: 10,
      queryText: '',
      skills: [],
      filteredSuggestions: [],
      inputProps: {
        id: 'autosuggest__input',
        placeholder: '',
        class: 'text-ellipsis'
      }
    }
  },
  mounted () {
  },
  methods: {
    inputText: debounce(function (text) {
      this.$axios
        .post(this.$base_api + '/api/frontend/skill/suggestion', {
          query_text: text,
          number_result_search: this.limit
        })
        .then((res) => {
          this.skills = res.data.data
          if (this.skills.length > 0) {
            this.filteredSuggestions = [{
              data: this.skills
            }]
          } else {
            this.filteredSuggestions = []
          }
        })
    }, 200),

    getSuggestionValue (suggestion) {
      const donut = suggestion.item
      this.queryText = donut.name_en
      // if (donut) {
      //   this.$store.dispatch('user/searchQueryJobByTitle', donut.title)
      // } else {
      //   this.$store.dispatch('user/clearSearchQueryJobByTitle')
      // }
      return donut.name_en
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";

</style>
