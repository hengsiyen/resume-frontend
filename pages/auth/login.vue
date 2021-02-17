<template>
  <div>
    <HeaderSecondary />
    <div class="login-container">
      <div class="container">
        <div style="max-width: 400px">
          <div style="margin-bottom: 32px">
            <div class="login-title">
              Log In
            </div>
            <div style="margin-top: 12px">
              {{ sub_title }}
            </div>
          </div>
          <template v-if="log_with_email">
            <div class="row">
              <div class="col-12" v-if="message_error">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  {{ message_error.message_en }}
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <div class="col-12 col-sm-12">
                <div class="form-group">
                  <label
                    for="email"
                    class="resume-label-control"
                    :class="{'text-danger': checkKeyObj(validate, 'email')}"
                  >Email</label>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="resume-form-control"
                  >
                  <div class="line" :class="{'line-red': checkKeyObj(validate, 'email')}" />
                  <template v-if="checkKeyObj(validate, 'email')">
                    <small class="text-muted">{{ validate.email[0] }}</small>
                  </template>
                </div>
              </div>
              <div class="col-12 col-sm-12">
                <div class="form-group">
                  <label
                    for="password"
                    class="resume-label-control"
                    :class="{'text-danger': checkKeyObj(validate, 'password')}"
                  >Password</label>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    class="resume-form-control"
                  >
                  <div class="line" :class="{'line-red': checkKeyObj(validate, 'password')}" />
                  <template v-if="checkKeyObj(validate, 'password')">
                    <small class="text-muted">{{ validate.password[0] }}</small>
                  </template>
                </div>
              </div>
              <div class="col-12 col-sm-12">
                <div class="form-group">
                  <NuxtLink :to="{ name: 'auth-forget-password' }">
                    Don’t remember your password?
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 text-right">
                <button class="btn btn-link text-muted mr-3 underline-none" @click="back">
                  Back
                </button>
                <button class="btn btn-primary font-weight-bold" @click="login">
                  Continue
                </button>
              </div>
            </div>
          </template>
          <template v-else-if="log_with_phone">
            <template v-if="show_verify_code">
              <div class="row">
                <div class="col-12" v-if="message_error">
                  <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    {{ message_error.message_en }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
                <div class="col-12 col-sm-12">
                  <div class="form-group">
                    <label
                      class="resume-label-control"
                      :class="{'text-danger': checkKeyObj(validate, 'code')}"
                    >Verify Code</label>
                    <input
                      v-model="code"
                      type="text"
                      class="resume-form-control"
                      placeholder="Enter your 6-digit verification code"
                    >
                    <div class="line" :class="{'line-red': checkKeyObj(validate, 'code')}" />
                    <template v-if="checkKeyObj(validate, 'code')">
                      <template>
                        <small class="text-muted">{{ validate.code[0] }}</small>
                      </template>
                    </template>
                  </div>
                  <div class="form-group mt-0">
                    <a
                      href="javascript:void(0)"
                      @click="reSendCode"
                    > <span class="mdi mdi-cached mdi-16"></span> Didn't receive SMS?  Send code again.</a>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-right">
                  <button class="btn btn-link text-muted mr-3 underline-none" @click="back">
                    Back
                  </button>
                  <button class="btn btn-primary font-weight-bold" @click="verifyOtp">
                    Verify
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="row">
                <div class="col-12" v-if="message_error">
                  <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    {{ message_error.message_en }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
                <div class="col-12 col-sm-12">
                  <div class="form-group">
                    <label
                      class="resume-label-control"
                      :class="{'text-danger': checkKeyObj(validate, 'phone')}"
                    >Phone Number</label>
                    <vue-phone-number-input
                      v-model="phone"
                      default-country-code="KH"
                      required
                      :error="checkKeyObj(validate, 'phone')"
                      @update="inputPhoneNumber"
                    />
                    <template v-if="checkKeyObj(validate, 'phone')">
                      <small class="text-muted">{{ validate.phone[0] }}</small>
                    </template>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-right">
                  <button class="btn btn-link text-muted mr-3 underline-none" @click="back">
                    Back
                  </button>
                  <button class="btn btn-primary font-weight-bold" @click="checkPhoneNumber">
                    Continue
                  </button>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <div class="login-buttons">
              <div class="login-button">
                <a href="javascript:void(0)" @click="statusChangeCallback" class="btn-social btn-facebook">
                  <span>
                    <i class="fab fa-facebook-f"></i>
                  </span>
                  Facebook
                </a>
              </div>
              <div class="login-button">
                <a href="javascript:void(0)" @click="loginWithGoogle" class="btn-social btn-google">
                  <span>
                    <i class="fab fa-google"></i>
                  </span>
                  Google
                </a>
              </div>
              <div class="login-button">
                <a href="javascript:void(0)" @click="enterEmail" class="btn-social btn-email">
                  <span>
                    <i class="far fa-envelope"></i>
                  </span>
                  Email
                </a>
              </div>
              <div class="login-button">
                <a href="javascript:void(0)" @click="enterPhone" class="btn-social btn-email">
                  <span>
                    <i class="fas fa-mobile-alt"></i>
                  </span>
                  Phone
                </a>
              </div>
            </div>
            <div>
              I am not registered —
              <NuxtLink :to="{name: 'resume-templates'}">
                Sign Up
              </NuxtLink>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div id="recaptcha-container"></div>
  </div>
</template>

<script>
import { facebookSdkMixin } from '~/mixins/facebookSdkMixin'
import { googleSdkMixin } from '~/mixins/googleSdkMixin'
import HeaderSecondary from '~/components/section/HeaderSecondary'

export default {
  name: 'Login',
  components: { HeaderSecondary },
  layout: 'secondary',
  mixins: [facebookSdkMixin, googleSdkMixin],
  data () {
    return {
      log_with_email: false,
      email: null,
      password: null,
      sub_title: 'We are happy to see you back!',
      validate: null,
      message_error: null,

      phone: null,
      log_with_phone: false,
      has_phone_number: false,
      phone_format: null,
      appVerifier: '',
      show_verify_code: false,
      code: ''
    }
  },
  created () {
    this.initReCaptcha()
    if (this.$store.state.user.authenticated) {
      this.$router.push({
        name: 'user-dashboard',
        replace: true
      })
    }
  },
  mounted () {
    window.addEventListener('keypress', this.onPressEnter)
  },
  methods: {
    clearData () {
      this.email = null
      this.password = null
      this.validate = null
      this.message_error = null

      this.phone_format = null
      this.phone = null
      this.has_phone_number = false
      this.appVerifier = ''
      this.code = ''
    },
    enterEmail () {
      this.sub_title = 'Enter your email'
      this.log_with_email = true
    },
    enterPhone () {
      this.sub_title = 'Enter your phone number'
      this.log_with_phone = true
    },
    back () {
      this.clearData()
      this.sub_title = 'We are happy to see you back!'
      this.log_with_email = false
      this.log_with_phone = false
      this.show_verify_code = false
    },
    inputPhoneNumber (event) {
      this.phone_format = event
    },
    checkPhoneNumber () {
      this.$isLoading(true)
      this.validate = {}
      this.message_error = null
      if (!this.phone) {
        this.validate.phone = ['this field is required.']
        this.$isLoading(false)
      } else if (this.phone_format && !(this.phone_format.isValid)) {
        this.validate.phone = ['The phone number format is invalid.']
        this.$isLoading(false)
      } else {
        if (process.client) {
          this.$axios
            .post(this.$base_api + '/api/frontend/resume/check-phone', {
              phone: this.phone_format.countryCallingCode + this.phone_format.nationalNumber
            })
            .then((res) => {
              this.reSendCode()
            })
            .catch((error) => {
              if (error.response.status && error.response.status === 422) {
                this.validate = error.response.data.errors
              } else {
                if (error.response.data.message.hasOwnProperty('message_en')) {
                  this.message_error = error.response.data.message
                } else {
                  this.$toastr('error', error, 'Error')
                }
              }
              this.$isLoading(false)
            })
        }
      }
    },
    getReCaptcha () {
      return new this.$fireModule.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible'
      })
    },
    initReCaptcha () {
      if (process.client) {
        this.$nextTick(() => {
          this.appVerifier = this.getReCaptcha()
        })
      }
    },
    reSendCode () {
      if (process.client) {
        const self = this
        this.$fire.auth.signInWithPhoneNumber(this.phone_format.formattedNumber, this.appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult
            this.$toastr('success', 'The verification code has been sent to phone number: ' + this.phone_format.phoneNumber, 'The verification code')
            self.sub_title = 'We sent you a code to verity ' + this.phone_format.formatInternational
            self.show_verify_code = true
          })
          .catch((error) => {
            this.$toastr('error', error, 'The verification code')
          })
          .finally(() => {
            this.$isLoading(false)
          })
      }
    },
    verifyOtp () {
      this.$isLoading(true)
      const self = this
      if (!this.code) {
        this.validate.code = ['this field is required.']
        this.$isLoading(false)
      } else if (this.code.length !== 6) {
        this.validate.code = ['Invalid verification code format.']
        this.$isLoading(false)
      } else {
        const code = this.code
        window.confirmationResult.confirm(code)
          .then((result) => {
            this.loginWithPhone()
          }).catch((error) => {
            this.$toastr('error', error, 'The verification code')
            self.$isLoading(false)
          })
      }
    },
    loginWithPhone () {
      this.validate = null
      this.message_error = null
      const self = this
      this.$axios
        .post(this.$base_api + '/api/auth/frontend/login-with-phone', {
          phone: self.phone_format.countryCallingCode + self.phone_format.nationalNumber
        })
        .then((res) => {
          const result = res.data.data

          // set cookies
          self.$cookies.set(process.env.VUE_APP_TOKEN, result.access_token)
          self.$cookies.set(process.env.VUE_APP_REFRESH_TOKEN, result.refresh_token)

          // set token on local storage
          localStorage.setItem(process.env.VUE_APP_TOKEN, result.access_token)
          localStorage.setItem(process.env.VUE_APP_REFRESH_TOKEN, result.refresh_token)
          localStorage.setItem('user', JSON.stringify(result.user))

          // set cross-domain
          self.$setLocalStorage(process.env.VUE_APP_TOKEN, result.access_token)
          self.$setLocalStorage(process.env.VUE_APP_REFRESH_TOKEN, result.refresh_token)
          self.$setLocalStorage('user', JSON.stringify(result.user))

          // set authorization on axios
          self.$axios.setToken(result.access_token, 'Bearer')
          self.$axios.defaults.headers.common.Accept = 'application/json'

          self.$store.dispatch('user/setUser', result.user)
          self.$store.dispatch('user/loggedIn')
          self.$router.push({
            name: 'user-dashboard',
            replace: true
          })
        })
        .catch((error) => {
          const e = error.response
          if (e.status === 422) {
            this.validate = e.data.errors
          } else {
            this.message_error = e.data.message
          }
        })
    },
    login () {
      this.validate = null
      this.message_error = null
      const self = this
      this.$axios
        .post(this.$base_api + '/api/auth/frontend/login', {
          email: this.email,
          password: this.password
        })
        .then((res) => {
          const result = res.data.data

          // set cookies
          self.$cookies.set(process.env.VUE_APP_TOKEN, result.access_token)
          self.$cookies.set(process.env.VUE_APP_REFRESH_TOKEN, result.refresh_token)

          // set token on local storage
          localStorage.setItem(process.env.VUE_APP_TOKEN, result.access_token)
          localStorage.setItem(process.env.VUE_APP_REFRESH_TOKEN, result.refresh_token)
          localStorage.setItem('user', JSON.stringify(result.user))

          // set cross-domain
          self.$setLocalStorage(process.env.VUE_APP_TOKEN, result.access_token)
          self.$setLocalStorage(process.env.VUE_APP_REFRESH_TOKEN, result.refresh_token)
          self.$setLocalStorage('user', JSON.stringify(result.user))

          // set authorization on axios
          self.$axios.setToken(result.access_token, 'Bearer')
          self.$axios.defaults.headers.common.Accept = 'application/json'

          self.$store.dispatch('user/setUser', result.user)
          self.$store.dispatch('user/loggedIn')
          self.$router.push({
            name: 'user-dashboard',
            replace: true
          })
        })
        .catch((error) => {
          const e = error.response
          if (e.status === 422) {
            this.validate = e.data.errors
          } else {
            this.message_error = e.data.message
          }
        })
    },
    onPressEnter (e) {
      if (e.key === 'Enter') {
        if (this.log_with_email) {
          this.login()
        } else if (this.log_with_phone && !this.show_verify_code) {
          this.checkPhoneNumber()
        } else if (this.log_with_phone && this.show_verify_code) {
          this.verifyOtp()
        }
      }
    }
  },
  destroyed () {
    window.removeEventListener('keypress', this.onPressEnter)
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/user";
</style>
