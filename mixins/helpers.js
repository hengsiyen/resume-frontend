const helpers = {
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
    }
  }
}

export default {
  install (Vue, options) {
    Vue.mixin(helpers)
  }
}
