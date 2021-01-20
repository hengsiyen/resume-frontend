<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label class="resume-label-control">Want Job Title</label>
          <autocomplete
            :search="searchPosition"
            :default-value="resumePosition"
            aria-label="Search city / province"
            :get-result-value="getPositionResultValue"
            @update="updatePosition"
            @submit="submitPosition"
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
      <div class="col-12 col-sm-6 d-flex align-items-center">
        <div class="form-group mb-sm-0 w-100">
          <UploadAvatar :item="item" @callMethod="refreshResume" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="firstName" class="resume-label-control">First Name</label>
          <input
            id="firstName"
            v-model="item.first_name"
            type="text"
            class="resume-form-control"
            @input="refreshResume"
          >
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="lastName" class="resume-label-control">Last Name</label>
          <input
            id="lastName"
            v-model="item.last_name"
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
          <label for="email" class="resume-label-control">Email</label>
          <input
            id="email"
            v-model="item.email"
            type="email"
            class="resume-form-control"
            @input="refreshResume"
          >
          <div class="line" />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label for="phone" class="resume-label-control">Phone</label>
          <input
            id="phone"
            v-model="item.phone"
            type="text"
            class="resume-form-control"
            @input="refreshResume"
          >
          <div class="line" />
        </div>
      </div>
    </div>
    <div id="showAdditionalDetail" class="collapse">
      <template v-show="showAdditionalDetail">
        <div class="row">
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <label class="resume-label-control">Country</label>
              <autocomplete
                :search="searchCountry"
                :default-value="resumeCountry"
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
                :search="searchProvince"
                :default-value="resumeProvince"
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
        <div class="row">
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <label for="address" class="resume-label-control">Address</label>
              <input
                id="address"
                v-model="item.address"
                type="text"
                class="resume-form-control"
                @input="refreshResume"
              >
              <div class="line" />
            </div>
          </div>
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <label for="postalCode" class="resume-label-control">Postal Code</label>
              <input
                id="postalCode"
                v-model="item.postal_code"
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
              <label for="drivingLicense" class="resume-label-control">Driving License</label>
              <input
                id="drivingLicense"
                v-model="item.driving_license"
                type="text"
                class="resume-form-control"
                @input="refreshResume"
              >
              <div class="line" />
            </div>
          </div>
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <label class="resume-label-control">Nationality</label>
              <autocomplete
                :search="searchNationality"
                :default-value="resumeNationality"
                aria-label="Search city / province"
                :get-result-value="getNationalityResultValue"
                @update="updateNationality"
                @submit="submitNationality"
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
              <label for="pob" class="resume-label-control">Place Of Birth</label>
              <input
                id="pob"
                v-model="item.pod"
                type="text"
                class="resume-form-control"
                @input="refreshResume"
              >
              <div class="line" />
            </div>
          </div>
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <label for="dob" class="resume-label-control">Date Of Birth</label>
              <datepicker
                id="dob"
                v-model="item.dob"
                placeholder="dd / MM / YYYY"
                :format="dateForm"
                input-class="resume_date_picker"
                calendar-class="resume_calendar"
                :initial-view="'year'"
                @input="refreshResume"
                @closed="selectedBirthDate"
              />
              <div class="line" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6">
            <div class="form-group">
              <label for="gender" class="resume-label-control">Gender</label>
              <select
                id="gender"
                v-model="item.gender_id"
                name="until_month"
                class="resume-form-control"
                @change="refreshResume"
              >
                <option :value="null">
                  Select your gender
                </option>
                <template v-for="(item, key) in genders">
                  <option :key="key" :value="item.id">
                    {{ item.name_en }}
                  </option>
                </template>
              </select>
              <i class="fa fa-chevron-down" />
              <div class="line" />
            </div>
          </div>
        </div>
      </template>
    </div>
    <a
      class="btn-link underline-none font-weight-bold"
      data-toggle="collapse"
      href="#showAdditionalDetail"
      role="button"
      aria-expanded="false"
      aria-controls="showAdditionalDetail"
      @click="showAdditionalDetail = !showAdditionalDetail"
    >
      Edit additional details
      <!--      <i-->
      <!--        class="fas d-inline-block"-->
      <!--        :class="showAdditionalDetail ? 'fa-angle-up' : 'fa-angle-down'"-->
      <!--        style="vertical-align: middle"-->
      <!--      />-->
<!--      <mdicon v-if="showAdditionalDetail" name="chevronUp" :size="18" />-->
<!--      <mdicon v-else name="chevronDown" :size="18" />-->
    </a>
  </div>
</template>

<script>
import UploadAvatar from '@/components/UploadAvatar'
export default {
  name: 'PersonalDetailForm',
  components: { UploadAvatar },
  props: {
    item: {
      type: Object,
      default: () => {
        return null
      }
    },
    dataProvince: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataPosition: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataCountry: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataNationality: {
      type: Array,
      default: () => {
        return []
      }
    },
    resumePosition: {
      type: String,
      default: ''
    },
    resumeCountry: {
      type: String,
      default: ''
    },
    resumeProvince: {
      type: String,
      default: ''
    },
    resumeNationality: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dateForm: 'dd, MMMM, yyyy',
      showAdditionalDetail: false,
      genders: []
    }
  },
  mounted () {
    this.getGender()
  },
  methods: {
    refreshResume () {
      this.$emit('refreshResume')
    },

    searchPosition (input) {
      this.item.position = input
      this.refreshResume()
      if (input < 3) {
        return []
      }
      return this.dataPosition.filter((position) => {
        return position.name_en.toLowerCase().startsWith(input.toLowerCase())
      })
    },
    getPositionResultValue (result) {
      return result.name_en
    },
    updatePosition (results, selectedIndex) {
      if (selectedIndex > -1) {
        if (results[selectedIndex]) {
          this.item.position = results[selectedIndex].name_en
        }
      }
    },
    submitPosition (result) {
      if (result) {
        this.item.position = result.name_en
        this.refreshResume()
      }
    },

    searchProvince (input) {
      this.item.province = input
      this.refreshResume()
      if (input < 1) {
        return []
      }
      return this.dataProvince.filter((province) => {
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

    searchNationality (input) {
      this.item.nationality = input
      this.refreshResume()
      if (input < 1) {
        return []
      }
      return this.dataNationality.filter((nationality) => {
        return nationality.name_en.toLowerCase().startsWith(input.toLowerCase())
      })
    },
    getNationalityResultValue (result) {
      return result.name_en
    },
    updateNationality (results, selectedIndex) {
      if (selectedIndex > -1) {
        if (results[selectedIndex]) {
          this.item.nationality = results[selectedIndex].name_en
        }
      }
    },
    submitNationality (result) {
      if (result) {
        this.item.nationality = result.name_en
        this.refreshResume()
      }
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

    getGender () {
      this.$axios
        .get(this.$base_api + '/api/frontend/gender/get-option')
        .then((res) => {
          this.genders = res.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    selectedBirthDate () {
      this.item.dob = this.convertDateFormat(this.item.dob, 'YYYY-MM-DD')
    }
  }
}
</script>

<style scoped>

</style>
