<template>
  <div class="row">
    <div class="col-12 col-sm-12">
      <div class="form-group">
        <label class="resume-label-control">Start & End Date</label>
        <div class="mb-2">
          <toggle-button
            :value="isDateUntilCurrent"
            color="#2196f3"
            :sync="true"
            :width="35"
            class="mb-0 mr-1"
            @change="untilPresent"
          /> {{ labelToggle }}
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-12">
              <label class="resume-label-control">Start Date</label>
            </div>
            <div class="col-4 sm-pr-0">
              <div class="form-group">
                <select
                  v-model="ssy"
                  name="until_month"
                  class="resume-form-control"
                  @change="selectedDate('start')"
                >
                  <option :value="null">
                    Year
                  </option>
                  <template v-for="(year, key) in date_years">
                    <option :key="key" :value="year.value">
                      {{ year.name_en }}
                    </option>
                  </template>
                </select>
                <!--                <i class="fa fa-chevron-down" />-->
                <div class="line" />
              </div>
            </div>
            <div class="col-4 sm-pr-0 pl-sm-1">
              <div class="form-group">
                <select
                  v-model="ssm"
                  name="until_month"
                  class="resume-form-control"
                  @change="selectedDate('start')"
                >
                  <option :value="null">
                    Month
                  </option>
                  <template v-for="(month, key) in date_months">
                    <option :key="key" :value="month.value">
                      {{ month.short_cut }}
                    </option>
                  </template>
                </select>
                <!--                <i class="fa fa-chevron-down" />-->
                <div class="line" />
              </div>
            </div>
            <div class="col-4 pl-sm-1">
              <div class="form-group">
                <select
                  v-model="ssd"
                  name="until_month"
                  class="resume-form-control"
                  @change="selectedDate('start')"
                >
                  <option :value="null">
                    Day
                  </option>
                  <template v-for="(day, key) in date_days">
                    <option :key="key" :value="day.value">
                      {{ day.name_en }}
                    </option>
                  </template>
                </select>
                <!--                <i class="fa fa-chevron-down" />-->
                <div class="line" />
              </div>
            </div>
          </div>
        </div>
        <template v-if="!isDateUntilCurrent">
          <div class="col-12">
            <div class="row">
              <div class="col-12">
                <label class="resume-label-control">End Date</label>
              </div>
              <div class="col-4 sm-pr-0">
                <div class="form-group">
                  <select
                    v-model="suty"
                    name="until_month"
                    class="resume-form-control"
                    @change="selectedDate('end')"
                  >
                    <option :value="null">
                      Year
                    </option>
                    <template v-for="(year, key) in date_years">
                      <option :key="key" :value="year.value">
                        {{ year.name_en }}
                      </option>
                    </template>
                  </select>
                  <!--                  <i class="fa fa-chevron-down" />-->
                  <div class="line" />
                </div>
              </div>
              <div class="col-4 sm-pr-0 pl-sm-1">
                <div class="form-group">
                  <select
                    v-model="sutm"
                    name="until_month"
                    class="resume-form-control"
                    @change="selectedDate('end')"
                  >
                    <option :value="null">
                      Month
                    </option>
                    <template v-for="(month, key) in date_months">
                      <option :key="key" :value="month.value">
                        {{ month.short_cut }}
                      </option>
                    </template>
                  </select>
                  <!--                  <i class="fa fa-chevron-down" />-->
                  <div class="line" />
                </div>
              </div>
              <div class="col-4 pl-sm-1">
                <div class="form-group">
                  <select
                    v-model="sutd"
                    name="until_month"
                    class="resume-form-control"
                    @change="selectedDate('end')"
                  >
                    <option :value="null">
                      Day
                    </option>
                    <template v-for="(day, key) in date_days">
                      <option :key="key" :value="day.value">
                        {{ day.name_en }}
                      </option>
                    </template>
                  </select>
                  <!--                  <i class="fa fa-chevron-down" />-->
                  <div class="line" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartAndEndDate',
  props: {
    item: {
      type: Object,
      default: () => {
        return null
      }
    },
    labelToggle: {
      type: String,
      default: 'Currently work here'
    }
  },
  data () {
    return {
      date_months: [
        { short_cut: 'Jan', name_en: 'January', name_kh: 'មករា', value: '01' },
        { short_cut: 'Feb', name_en: 'February', name_kh: 'កុម្ភៈ', value: '02' },
        { short_cut: 'Mar', name_en: 'March', name_kh: 'មិនា', value: '03' },
        { short_cut: 'Apr', name_en: 'April', name_kh: 'មេសា', value: '04' },
        { short_cut: 'May', name_en: 'May', name_kh: 'ឧសភា', value: '05' },
        { short_cut: 'Jun', name_en: 'June', name_kh: 'មិថុនា', value: '06' },
        { short_cut: 'Jul', name_en: 'July', name_kh: 'កក្កដា', value: '07' },
        { short_cut: 'Aug', name_en: 'August', name_kh: 'សីហា', value: '08' },
        { short_cut: 'Sep', name_en: 'September', name_kh: 'កញ្ញា', value: '09' },
        { short_cut: 'Oct', name_en: 'October', name_kh: 'តុលា', value: '10' },
        { short_cut: 'Nov', name_en: 'November', name_kh: 'វិច្ឆិកា', value: '11' },
        { short_cut: 'Dec', name_en: 'December', name_kh: 'ធ្នូ', value: '12' }
      ],
      date_days: [],
      date_years: [],
      ssy: null,
      ssm: null,
      ssd: null,
      suty: null,
      sutm: null,
      sutd: null,
      date_current: new Date(),
      isDateUntilCurrent: false
    }
  },
  mounted () {
    if (this.item) {
      const _START_DATE = this.explodeDate(this.item.date_from, this.item.date_from_format)
      const _UNTIL_DATE = this.explodeDate(this.item.date_until, this.item.date_until_format)
      this.isDateUntilCurrent = this.item.is_date_until_present
      this.ssy = _START_DATE.year
      this.ssm = _START_DATE.month
      this.ssd = _START_DATE.day
      this.suty = _UNTIL_DATE.year
      this.sutm = _UNTIL_DATE.month
      this.sutd = _UNTIL_DATE.day
    }
    this.dataYears()
    this.dataDays()
  },
  methods: {
    dataYears () {
      for (let y = this.date_current.getFullYear(); y >= 1930; y--) {
        this.date_years.push({ name_en: y, name_km: y, value: y })
      }
    },
    dataDays () {
      for (let d = 1; d <= 31; d++) {
        if (d >= 1 && d <= 9) {
          d = '0' + d
        }
        this.date_days.push({ name_en: d, name_km: d, value: d.toString() })
      }
    },
    untilPresent () {
      this.isDateUntilCurrent = !this.isDateUntilCurrent
      this.item.is_date_until_present = this.isDateUntilCurrent
      if (this.isDateUntilCurrent) {
        this.item.date_until = this.$moment(this.date_current).locale('en').format('YYYY-MM-DD')
        this.item.date_until_format = 'Y-m-d'
      } else {
        this.item.date_until = null
        this.item.date_until_format = null
        this.suty = null
        this.sutm = null
        this.sutd = null
      }
      this.refreshResume()
    },
    selectedDate (type) {
      const year = this.date_current.getFullYear()
      const month = this.date_current.getMonth()
      if (type === 'start') {
        let start_d = null
        let start_f = null
        if (this.ssy) {
          start_d = this.ssy + ''
          start_f = 'Y'
        }
        if (this.ssm) {
          if (this.ssy) {
            start_d += '-' + this.ssm
            start_f += '-m'
          } else {
            start_d = year + '-' + this.ssm
            start_f = 'm'
          }
        }
        if (this.ssd) {
          if (this.ssy || this.ssm) {
            start_d += '-' + this.ssd
            start_f += '-d'
          } else {
            start_d = year + '-' + month + '-' + this.ssd
            start_f = 'd'
          }
        }
        this.item.date_from = start_d
        this.item.date_from_format = start_f
      } else if (type === 'end') {
        let end_d = null
        let end_f = null
        if (this.suty) {
          end_d = this.suty + ''
          end_f = 'Y'
        }
        if (this.sutm) {
          if (this.suty) {
            end_d += '-' + this.sutm
            end_f += '-m'
          } else {
            end_d = year + '-' + this.sutm
            end_f = 'm'
          }
        }
        if (this.sutd) {
          if (this.suty || this.sutm) {
            end_d += '-' + this.sutd
            end_f += '-d'
          } else {
            end_d = year + '-' + month + '-' + this.sutd
            end_f = 'd'
          }
        }
        this.item.date_until = end_d
        this.item.date_until_format = end_f
      }
      this.refreshResume()
    },
    refreshResume () {
      this.$emit('refreshResume')
    }
  }

}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume";

@media screen and (max-width: 576px) {
  .sm-pr-0 {
    padding-right: 0;
  }
}
</style>
