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
                    type="text"
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
                <button class="btn btn-link text-muted btn-lg mr-3 underline-none" @click="back">
                  Back
                </button>
                <button class="btn btn-lg btn-primary font-weight-bold" @click="login">
                  Continue
                </button>
              </div>
            </div>
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
      message_error: null
    }
  },
  created () {
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
    },
    enterEmail () {
      this.sub_title = 'Enter your email'
      this.log_with_email = true
    },
    back () {
      this.clearData()
      this.sub_title = 'We are happy to see you back!'
      this.log_with_email = false
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
      if (e.key === 'Enter' && this.log_with_email) {
        this.login()
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
