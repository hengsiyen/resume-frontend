<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="course" class="resume-label-control">Course</label>
          <input
            id="course"
            v-model="item.course"
            type="text"
            class="resume-form-control"
            @input="refreshResume"
          >
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="institution" class="resume-label-control">Institution</label>
          <input
            id="institution"
            v-model="item.institution"
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
          <label class="resume-label-control">Start & End Date</label>
          <client-only>
            <div class="row">
              <div class="col-12 col-sm-6 pr-sm-1">
                <datepicker
                  v-model="date_from"
                  placeholder="MM / YYYY"
                  :format="empDateFormat"
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
                  :format="empDateFormat"
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
  </div>
</template>

<script>

export default {
  name: 'CourseForm',
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
      empDateFormat: 'MMM, yyyy',
      date_from: new Date(),
      date_until: new Date()
    }
  },
  mounted () {
    if (this.item) {
      this.date_from = this.convertDateFormat(this.item.date_from)
      this.date_until = this.convertDateFormat(this.item.date_until)
    }
  },
  methods: {
    selectedStartDate () {
      this.item.date_from = this.convertDateFormat(this.date_from, 'YYYY-MM-DD')
      this.refreshResume()
    },
    selectedEndDate () {
      this.item.date_until = this.convertDateFormat(this.date_until, 'YYYY-MM-DD')
      this.refreshResume()
    },
    refreshResume () {
      this.$emit('refreshResume')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
