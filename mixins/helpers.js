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
      if (error.response) {
        this.$toastr('error', error.response.data.message, error.response.status)
      }
      console.log(error)
    },
    renderMeta ({ title, description, thumbnail, url }) {
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
      let result = null
      if (format) {
        if (format.includes('Y')) {
          result = 'yyyy'
        }
        if (format.includes('m')) {
          if (result) {
            result = 'MMM ' + result
          } else {
            result = 'MMM'
          }
        }
        if (format.includes('d')) {
          if (result) {
            result = 'DD ' + result
          } else {
            result = 'DD'
          }
        }
      } else {
        result = 'DD MMM yyyy'
      }
      return result
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
    addSectionItemSkill (model, value = null) {
      const newItem = {
        skill: null,
        level: null,
        active_tab: true
      }
      if (value) {
        newItem.skill = value
        newItem.level = 'Expert'
      }
      model.push(newItem)
    },
    addSectionItem (model, type) {
      let newItem = null
      const current_date = this.$moment().locale('en').format('YYYY-MM-DD')
      switch (type) {
        case 'educations':
          newItem = {
            school: null,
            degree: null,
            country: null,
            province: null,
            description: null,
            is_date_until_present: false,
            date_from: current_date,
            date_from_format: 'Y-m-d',
            date_until: null,
            date_until_format: null,
            active_tab: true
          }
          break
        case 'activities':
          newItem = {
            job_title: null,
            employer: null,
            province: null,
            description: null,
            is_date_until_present: false,
            date_from: current_date,
            date_from_format: 'Y-m-d',
            date_until: null,
            date_until_format: null,
            active_tab: true
          }
          break
        case 'workExperiences':
        case 'internships':
          newItem = {
            job_title: null,
            employer: null,
            country: null,
            province: null,
            description: null,
            is_date_until_present: false,
            date_from: current_date,
            date_from_format: 'Y-m-d',
            date_until: null,
            date_until_format: null,
            active_tab: true
          }
          break
        case 'socialProfiles':
          newItem = {
            label: null,
            link: null,
            active_tab: true
          }
          break
        case 'skills':
          newItem = {
            skill: null,
            level: null,
            active_tab: true
          }
          break
        case 'courses':
          newItem = {
            course: null,
            institution: null,
            is_date_until_present: false,
            date_from: current_date,
            date_from_format: 'Y-m-d',
            date_until: null,
            date_until_format: null,
            active_tab: true
          }
          break
        case 'langs':
          newItem = {
            language: null,
            level: null,
            active_tab: true
          }
          break
        case 'references':
          newItem = {
            name: null,
            company: null,
            phone: null,
            email: null,
            active_tab: true
          }
          break
        case 'custom':
          newItem = {
            title: null,
            province: null,
            description: null,
            is_date_until_present: false,
            date_from: current_date,
            date_from_format: 'Y-m-d',
            date_until: null,
            date_until_format: null,
            active_tab: true
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
