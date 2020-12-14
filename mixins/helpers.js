export const helpers = {
  data () {
    return {
      is_copy: false,
      resume_url: 'https://resume.io/r/MzfhECgWs',
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
    notEmptyObject (someObject) {
      return Object.keys(someObject).length > 0
    },
    concatImg (src) {
      if (src) {
        return this.$base_api_img + '/' + src
      }
      return ''
    },
    checkImageUrl (src) {
      if (src) {
        if (src.includes('https://')) {
          return src
        } else {
          return this.concatImg(src)
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
      if (error.statusText) {
        this.$toastr('error', error.statusText, this.$t('string.error'))
      } else if (error.response) {
        if (error.response.status && error.response.status === 403) {
          this.$toastr('error', error.response.data.message, this.$t('string.error'))
        } else if (error.response.status && error.response.status === 401) {
          this.$toastr('error', error.response.data.message, this.$t('string.error'))
          localStorage.clear()
          this.$store.commit('user/clearUser')
        } else {
          try {
            if (error.response.data.message && error.response.data.message['message_' + this.$i18n.locale]) {
              this.$toastr('error', error.response.data.message['message_' + this.$i18n.locale], this.$t('string.error'))
            } else {
              this.$toastr('error', error.response.statusText, this.$t('string.error'))
            }
          } catch (e) {
            this.$toastr('error', this.$t('string.somethingWentWrong'), this.$t('string.error'))
          }
        }
      }
      if (error.response === undefined) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
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
            start_date: null,
            end_date: null,
            city: null,
            description: null
          }
          break
        case 'workExperiences':
        case 'internships':
        case 'activities':
          newItem = {
            title: null,
            employer: null,
            start_date: null,
            end_date: null,
            city: null,
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
            start_date: null,
            end_date: null
          }
          break
        case 'languages':
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
            start_date: null,
            end_date: null,
            city: null,
            description: null
          }
      }
      model.push(newItem)
    },
    onCopy () {
      this.is_copy = true
      setTimeout(function () {
        this.is_copy = false
      }, 1000)
    }
  }
}

export default {
  install (Vue, options) {
    Vue.mixin(helpers)
  }
}
