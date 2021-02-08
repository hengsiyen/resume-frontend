<template>
  <div class="resume__form">
    <HeaderSecondary>
      <div class="form__button-remove position-absolute">
        <NuxtLink :to="{name: 'index'}">
          <i class="fas fa-times" />
        </NuxtLink>
      </div>
    </HeaderSecondary>
    <div class="stepper d-none d-md-flex align-items-center justify-content-center">
      <div class="stepper-content">
        <template v-for="(item, key) in steppers">
          <div :key="key" class="stepper-content_item">
            <div
              class="stepper-item__number d-flex align-items-center justify-content-center"
              :class="{'active': item.active}"
            >
              {{ item.number }}
            </div>
            <div class="stepper-item__label active">
              {{ item.label }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="form__body_block position-relative d-flex flex-column">
      <div class="form__body-container">
        <template v-if="step === 1">
          <div class="form__body-wrapper w-100 mx-auto d-flex justify-content-center align-items-center flex-column">
            <div class="body__title d-block d-md-none">
              Connect your social profile
            </div>
            <div class="body__sub-title text-center d-block d-md-none">
              Prefill your resume with data from your social profile
            </div>
            <div class="body_content w-100">
              <div class="social-list d-flex justify-content-between flex-wrap">
                <a
                  href="javascript:void(0)"
                  @click="statusChangeCallback"
                  class="d-flex justify-content-between align-items-center w-100 position-relative"
                >
                  <div class="social-name d-flex align-items-center">
                    <div class="social-icon d-flex align-items-center justify-content-center facebook">
                      <i class="fab fa-facebook-f" />
                    </div>
                    Facebook
                  </div>
                  <div class="social-arrow">
                    <i class="fas fa-angle-right" />
                  </div>
                </a>
                <a
                  href="javascript:void(0)"
                  @click="loginWithGoogle"
                  class="d-flex justify-content-between align-items-center w-100 position-relative"
                >
                  <div class="social-name d-flex align-items-center">
                    <div class="social-icon d-flex align-items-center justify-content-center google">
                      <i class="fab fa-google" />
                    </div>
                    Google
                  </div>
                  <div class="social-arrow">
                    <i class="fas fa-angle-right" />
                  </div>
                </a>
              </div>
              <div class="d-flex align-items-center justify-content-between w-100">
                <NuxtLink :to="{name: 'resume-templates'}" class="btn btn-outline-secondary font-weight-bold">
                  Back
                </NuxtLink>
                <button class="btn btn-primary font-weight-bold" @click="onClickNext()">
                  Skip
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="step === 2">
          <div class="form__body-wrapper w-100 mx-auto d-flex justify-content-center align-items-center flex-column">
            <div class="body__title">
              Add your name
            </div>
            <div class="body__sub-title text-center">
              You made a great template selection! Now let’s add your name to it.
            </div>
            <div class="body_content w-100">
              <div class="form__input">
                <div class="form-group">
                  <label
                    class="resume-label-control"
                    :class="{'text-danger': checkKeyObj(validate, 'first_name')}"
                  >First Name</label>
                  <input v-model="first_name" type="text" class="resume-form-control">
                  <div class="line" :class="{'line-red': checkKeyObj(validate, 'first_name')}" />
                  <template v-if="checkKeyObj(validate, 'first_name')">
                    <small class="text-muted">{{ validate.first_name[0] }}</small>
                  </template>
                </div>

                <div class="form-group">
                  <label
                    class="resume-label-control"
                    :class="{'text-danger': checkKeyObj(validate, 'last_name')}"
                  >Last Name</label>
                  <input v-model="last_name" type="text" class="resume-form-control">
                  <div class="line" :class="{'line-red': checkKeyObj(validate, 'last_name')}" />
                  <template v-if="checkKeyObj(validate, 'last_name')">
                    <small class="text-muted">{{ validate.last_name[0] }}</small>
                  </template>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between w-100">
                <button class="btn btn-outline-secondary font-weight-bold" @click="onClickPrev">
                  Back
                </button>
                <button class="btn btn-primary font-weight-bold" @click="registerByName">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="step === 3">
          <div class="form__body-wrapper w-100 mx-auto d-flex justify-content-center align-items-center flex-column">
            <div class="body__title">
              Supply contact information
            </div>
            <div class="body__sub-title text-center">
              It’s important to let employers know how to contact you. Enter your email address below.
            </div>
            <div class="body_content w-100">
              <div class="form__input">
                <div class="form-group">
                  <label
                    class="resume-label-control"
                    :class="{'text-danger': checkKeyObj(validate, 'email')}"
                  >Email</label>
                  <input v-model="email" type="email" class="resume-form-control">
                  <div class="line" :class="{'line-red': checkKeyObj(validate, 'email')}" />
                  <template v-if="checkKeyObj(validate, 'email')">
                    <template v-if="validate.email[0].includes('taken')">
                      <small class="text-muted" style="font-size: 15px">
                        This email is already registered.
                        <NuxtLink :to="{name: 'user_login'}">Log In</NuxtLink>
                        or try another email
                      </small>
                    </template>
                    <template v-else>
                      <small class="text-muted">{{ validate.email[0] }}</small>
                    </template>
                  </template>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between w-100">
                <button class="btn btn-outline-secondary font-weight-bold" @click="onClickPrev">
                  Back
                </button>
                <button class="btn btn-primary font-weight-bold" @click="registerEmail">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <SmallFooter />
  </div>
</template>

<script>
import { dataOptions } from '@/mixins/dataOptions'
import { facebookSdkMixin } from '~/mixins/facebookSdkMixin'
import { googleSdkMixin } from '~/mixins/googleSdkMixin'
import SmallFooter from '~/components/section/SmallFooter'
import HeaderSecondary from '~/components/section/HeaderSecondary'

export default {
  name: 'Create',
  components: { HeaderSecondary, SmallFooter },
  layout: 'secondary',
  mixins: [facebookSdkMixin, googleSdkMixin],
  data () {
    return {
      step: 1,
      first_name: null,
      last_name: null,
      email: null,
      validate: null,
      steppers: [
        {
          number: 1,
          label: 'Choose template',
          active: false
        },
        {
          number: 2,
          label: 'Enter your details',
          active: true
        },
        {
          number: 3,
          label: 'Create your resume',
          active: false
        }
      ],
      sections_order: dataOptions.sectionOrders,
      resume_type_name: dataOptions.resume_type_name,
      resume_template_name: dataOptions.resume_template_name
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
      this.validate = null
      this.first_name = null
      this.last_name = null
      this.email = null
    },
    registerByName () {
      this.validate = {}

      if (!this.first_name) {
        this.validate.first_name = ['this field is required.']
      }
      if (!this.last_name) {
        this.validate.last_name = ['this field is required.']
      }
      if (!this.notEmptyObject(this.validate)) {
        this.onClickNext()
      }
    },
    registerEmail () {
      this.$isLoading(true)
      this.validate = {}
      const self = this
      this.$axios
        .post(this.$base_api + '/api/auth/frontend/resume-register', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email
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

          // set value on vuex
          self.$store.dispatch('user/loggedIn')
          self.$store.dispatch('user/setUser', result.user)
          this.createResume(result.user)
        })
        .catch((error) => {
          const e = error.response
          if (e.status === 422) {
            this.validate = e.data.errors
          } else {
            this.onResponseError(error)
          }
          this.$isLoading(false)
        })
    },
    createResume (data) {
      let choose_template = this.$store.state.user.choose_template
      if (!choose_template) {
        if (localStorage.hasOwnProperty('template')) {
          choose_template = localStorage.getItem('template')
        } else {
          choose_template = dataOptions.resume_template_name
        }
      }
      this.$axios
        .post(this.$base_api + '/api/frontend/resume/store', {
          user_id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          sections_order: this.sections_order,
          resume_type_name: this.resume_type_name,
          resume_template_name: choose_template,
          hide_refs: false,
          hide_social: false,
          spacing: '0'
        })
        .then((res) => {
          const result = res.data.data
          this.$router.push({
            name: 'resume-uuid-edit',
            params: { uuid: result.uuid }
          })
        })
        .catch((error) => {
          this.onResponseError(error)
        })
        .finally(() => {
          this.$isLoading(false)
        })
    },
    onClickNext () {
      this.step += 1
    },
    onClickPrev () {
      this.step -= 1
    },
    onPressEnter (e) {
      if (e.key === 'Enter' && this.step === 2) {
        this.registerByName()
      } else if (e.key === 'Enter' && this.step === 3) {
        this.registerEmail()
      }
    }
  },
  destroyed () {
    window.removeEventListener('keypress', this.onPressEnter)
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/resume.scss";
@import "~assets/scss/create-resume.scss";
</style>
