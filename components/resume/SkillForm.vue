<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label class="resume-label-control">Skill</label>
          <autocomplete
            :search="search"
            :default-value="skillValue"
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
            <option value="Novice">
              Novice
            </option>
            <option value="Beginner">
              Beginner
            </option>
            <option value="Skillful">
              Skillful
            </option>
            <option value="Experienced">
              Experienced
            </option>
            <option value="Expert">
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
export default {
  name: 'SkillForm',
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
      skills: []
    }
  },
  computed: {
    skillValue () {
      if (this.item) {
        return this.item.skill
      }
      return null
    }
  },
  mounted () {
    this.getSkills()
  },
  methods: {
    update (results, selectedIndex) {
      if (selectedIndex > -1) {
        if (results[selectedIndex]) {
          this.item.skill = results[selectedIndex].name_en
        }
      }
    },
    submit (result) {
      if (result) {
        this.item.skill = result.name_en
      }
    },
    getResultValue (result) {
      return result.name_en
    },
    search (input) {
      this.item.skill = input
      if (input < 1) {
        return []
      }
      return this.skills.filter((skill) => {
        return skill.name_en.toLowerCase().startsWith(input.toLowerCase())
      })
    },
    getSkills () {
      this.$axios
        .post(this.$base_api + '/api/frontend/skill/suggestion')
        .then((res) => {
          this.skills = res.data.data
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";

</style>
