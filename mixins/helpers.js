export const helpers = {
  data () {
    return {
      is_copy: false,
      resume_url: process.env.VUE_APP_BASE_URL + '/r/',
      item_link_code: null,
      shareSocial: [
        {
          icon: 'fab fa-facebook-f',
          label: 'facebook',
          url: 'https://www.facebook.com'
        }
      ]
    }
  },
  methods: {
    downloadResume (item_uuid) {
      console.log(item_uuid)
      window.open(this.$base_api + `/resume/download-resume/${item_uuid}`, '_blank')
    },
    shareLink (item) {
      this.item_link_code = null
      this.item_link_code = item
    },
    notEmptyObject (someObject) {
      return Object.keys(someObject).length > 0
    },
    concatImg (src) {
      if (src) {
        return this.$base_api + '/' + src
      }
      return ''
    },
    checkImageUrl (src) {
      if (src) {
        if (src.includes('storage')) {
          return this.concatImg(src)
        } else {
          return src
        }
      }
      return ''
    },
    checkKeyObj (model, key = '') {
      if (model) {
        // eslint-disable-next-line no-prototype-builtins
        return model.hasOwnProperty(key)
      }
      return false
    },
    onResponseError (error) {
      // if (error.statusText) {
      //   this.$toastr('error', error.statusText, this.$t('string.error'))
      // } else if (error.response) {
      //   if (error.response.status && error.response.status === 403) {
      //     this.$toastr('error', error.response.data.message, this.$t('string.error'))
      //   } else if (error.response.status && error.response.status === 401) {
      //     this.$toastr('error', error.response.data.message, this.$t('string.error'))
      //     localStorage.clear()
      //     this.$store.commit('user/clearUser')
      //   } else {
      //     try {
      //       if (error.response.data.message && error.response.data.message['message_' + this.$i18n.locale]) {
      //         this.$toastr('error', error.response.data.message['message_' + this.$i18n.locale], this.$t('string.error'))
      //       } else {
      //         this.$toastr('error', error.response.statusText, this.$t('string.error'))
      //       }
      //     } catch (e) {
      //       this.$toastr('error', this.$t('string.somethingWentWrong'), this.$t('string.error'))
      //     }
      //   }
      // }
      // if (error.response === undefined) {
      // eslint-disable-next-line no-console
      console.log(error)
      // }
    },
    makeExternalId (length) {
      let result = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    convertDateFormat (date, format = 'MMM yyyy', locale = 'en') {
      if (date) {
        return this.$moment(date).locale(locale).format(format)
      }
      return null
    },
    concatDates (startDate, endDate) {
      const d1 = this.convertDateFormat(startDate)
      const d2 = this.convertDateFormat(endDate)
      if (d1 && d2) {
        return d1 + ' - ' + d2
      } else if (d1 && !d2) {
        return d1
      } else if (!d1 && d2) {
        return d2
      }
      return null
    },
    addSectionItem (model, type) {
      let newItem = null
      switch (type) {
        case 'educations':
          newItem = {
            school: null,
            degree: null,
            date_from: null,
            date_until: null,
            province: null,
            description: null
          }
          break
        case 'activities':
          newItem = {
            job_title: null,
            employer: null,
            date_from: null,
            date_until: null,
            province: null,
            description: null
          }
          break
        case 'workExperiences':
        case 'internships':
          newItem = {
            job_title: null,
            employer: null,
            date_from: null,
            date_until: null,
            province: null,
            description: null
          }
          break
        case 'socialProfiles':
          newItem = {
            label: null,
            link: null
          }
          break
        case 'skills':
          newItem = {
            skill: null,
            level: null
          }
          break
        case 'courses':
          newItem = {
            course: null,
            institution: null,
            date_from: null,
            date_until: null
          }
          break
        case 'langs':
          newItem = {
            language: null,
            level: null
          }
          break
        case 'references':
          newItem = {
            name: null,
            company: null,
            phone: null,
            email: null
          }
          break
        case 'custom':
          newItem = {
            title: null,
            date_from: null,
            date_until: null,
            province: null,
            description: null
          }
          break
      }
      model.push(newItem)
    },
    onCopy () {
      this.is_copy = true
    }
  }
}

export default {
  install (Vue, options) {
    Vue.mixin(helpers)
  }
}
