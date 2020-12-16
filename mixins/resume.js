import { debounce } from 'debounce'
import { dataOptions } from '@/mixins/dataOptions'
export const resume = {
  data () {
    return {
      resume_pdf_src: null,
      currentPage: 0,
      pageCount: 0,
      provinces: [],
      resume: {
        name: 'Untitled',
        position: null,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        country: null,
        province: null,
        address: null,
        postal_code: null,
        driving_license: null,
        nationality: null,
        pod: null,
        dob: null,
        profile: null,
        link_code: null,
        sections_order: dataOptions.sectionOrders,
        resume_type_id: null,
        resume_template_id: null,
        educations: [],
        work_experiences: [],
        skills: [],
        social_profiles: [],
        courses: [],
        internships: [],
        languages: [],
        activities: [],
        hobbies: [],
        references: [],
        custom_sections: []
      }
    }
  },
  methods: {
    angleLeft () {
      if (this.currentPage > 1) {
        this.currentPage -= 1
      }
    },
    angleRight () {
      if (this.currentPage < this.pageCount) {
        this.currentPage += 1
      }
    },
    refreshResume: debounce(function () {
      this.$axios
        .post(this.$base_api + '/api/frontend/resume/store', this.resume)
        .then((res) => {
          console.log(res.data.data)
          this.logContent()
        }).catch((error) => {
          this.onResponseError(error)
        })
    }, 500),
    logContent: debounce(function () {
      this.resume_pdf_src = this.$pdf.createLoadingTask(this.$base_api + '/resume/testing/hello/world/example@gmail.com')
      if (this.resume_pdf_src) {
        this.resume_pdf_src.promise.then((pdf) => {
          this.pageCount = pdf.numPages
          this.currentPage = 1
        })
      }
    }, 800),
    getProvinces () {
      this.$axios
        .post(this.$base_api + '/api/frontend/location/get-option')
        .then((res) => {
          this.provinces = res.data.data
        })
    }
  }
}

export default {
  install (Vue, options) {
    Vue.mixin(resume)
  }
}
