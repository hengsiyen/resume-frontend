export const helpers = {
  data () {
    return {
      is_copy: false,
      resume_url: process.env.VUE_APP_BASE_URL + '/r/',
      item_link_code: null,
      active_item: null,
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
      window.open(this.$base_api + `/resume/download-resume/${item_uuid}`, '_blank')
    },
    shareLink (item) {
      this.item_link_code = null
      this.active_item = item
      this.item_link_code = item.link_code
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
    renderMeta ({ title, description, thumbnail, url }) {
      console.log(thumbnail)
      return [
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          keywords: 'ecommerce, commerce, shopping, online shopping'
        },
        {
          hid: 'al:ios:url',
          property: 'al:ios:url',
          content: ''
        },
        {
          hid: 'al:ios:app_store_id',
          property: 'al:ios:app_store_id',
          content: ''
        },
        {
          hid: 'al:ios:app_name',
          property: 'al:ios:app_name',
          content: ''
        },
        {
          hid: 'al:android:url',
          property: 'al:android:url',
          content: ''
        },
        {
          hid: 'al:android:package',
          property: 'al:android:package',
          content: ''
        },
        {
          hid: 'al:android:app_name',
          property: 'al:android:app_name',
          content: ''
        },
        {
          hid: 'fb:pages',
          property: 'fb:pages',
          content: ''
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: thumbnail
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: url
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'Ecommerce'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: thumbnail
        },
        {
          hid: 'og:image:with',
          property: 'og:image:with',
          content: 1200
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: 630
        }
      ]
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
    concatDates (startDate, endDate, sdf, edf) {
      let d1 = null
      let d2 = null
      sdf = this.displayDateFormat(sdf)
      edf = this.displayDateFormat(edf)
      d1 = this.convertDateFormat(startDate, sdf)
      d2 = this.convertDateFormat(endDate, edf)
      if (d1 && d2) {
        return d1 + ' - ' + d2
      } else if (d1 && !d2) {
        return d1
      } else if (!d1 && d2) {
        return d2
      }
      return null
    },
    displayDateFormat (format) {
      if (format) {
        if (format === 'Y-m-d') {
          return 'DD MMM yyyy'
        } else if (format === 'Y-m') {
          return 'MMM yyyy'
        } else if (format === 'Y') {
          return 'yyyy'
        }
      }
      return 'yyyy'
    },
    explodeDate (date, origin_format) {
      const result = {
        year: null,
        month: null,
        day: null
      }
      if (date && origin_format) {
        if (origin_format.includes('Y')) {
          result.year = this.convertDateFormat(date, 'YYYY')
        }
        if (origin_format.includes('m')) {
          result.month = this.convertDateFormat(date, 'MM')
        }
        if (origin_format.includes('d')) {
          result.day = this.convertDateFormat(date, 'DD')
        }
      }
      return result
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
            description: null,
            is_date_until_present: false,
            date_from_format: null,
            date_until_format: null
          }
          break
        case 'activities':
          newItem = {
            job_title: null,
            employer: null,
            date_from: null,
            date_until: null,
            province: null,
            description: null,
            is_date_until_present: false,
            date_from_format: null,
            date_until_format: null
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
            description: null,
            is_date_until_present: false,
            date_from_format: null,
            date_until_format: null
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
            date_until: null,
            is_date_until_present: false,
            date_from_format: null,
            date_until_format: null
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
            description: null,
            is_date_until_present: false
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
