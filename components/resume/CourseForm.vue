<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="course" class="resume-label-control">Course</label>
          <input id="course" v-model="item.course" type="text" class="resume-form-control">
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="institution" class="resume-label-control">Institution</label>
          <input id="institution" v-model="item.institution" type="text" class="resume-form-control">
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
                  v-model=" start_date"
                  placeholder="MM / YYYY"
                  :format="empDateFormat"
                  input-class="resume_date_picker"
                  calendar-class="resume_calendar"
                  :minimum-view="'month'"
                  :maximum-view="'month'"
                  @closed="selectedStartDate"
                />
                <div class="line" />
              </div>
              <div class="col-12 col-sm-6 pl-sm-1">
                <datepicker
                  v-model="end_date"
                  placeholder="MM / YYYY"
                  :format="empDateFormat"
                  input-class="resume_date_picker"
                  calendar-class="resume_calendar"
                  :minimum-view="'month'"
                  :maximum-view="'month'"
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
      start_date: new Date(),
      end_date: new Date()
    }
  },
  mounted () {
    if (this.item) {
      this.start_date = this.convertDateFormat(this.item.start_date)
      this.end_date = this.convertDateFormat(this.item.end_date)
    }
  },
  methods: {
    selectedStartDate () {
      this.item.start_date = this.convertDateFormat(this.start_date, 'YYYY-MM-DD')
    },
    selectedEndDate () {
      this.item.end_date = this.convertDateFormat(this.end_date, 'YYYY-MM-DD')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";
</style>
