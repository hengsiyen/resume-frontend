import { dataOptions } from '@/mixins/dataOptions'
export const resumes = {
  data () {
    return {
      resume_pdf_src: null,
      currentPage: 0,
      pageCount: 0,
      provinces: [],
      user_resume: {
        uuid: null,
        user_id: process.env.VUE_APP_USER_ID_TEST,
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
        resume_type_name: null,
        resume_template_name: null,
        educations: [],
        work_experiences: [],
        skills: [],
        social_profiles: [],
        courses: [],
        internships: [],
        langs: [],
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
    Vue.mixin(resumes)
  }
}
