<template>
  <div class="login-container">
    <div class="container">
      <template v-if="email_sent">
        <div class="sent_email">
          <img src="/img/send_mail.png" alt="send email" width="100%">
          <div class="sent_email-title">
            Check your inbox
          </div>
          <div class="sent_email-sub-title">
            <p>
              We just emailed a confirmation link to <strong>{{ email }}</strong>.<br>
              Click the link, and you can reset your password.
            </p>
          </div>
        </div>
      </template>
      <template v-else>
        <div style="max-width: 400px">
          <div style="margin-bottom: 32px">
            <div class="login-title">
              Forget Password
            </div>
            <div style="margin-top: 12px">
              {{ sub_title }}
            </div>
          </div>
          <template>
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
            </div>
            <div class="row">
              <div class="col-12 text-right">
                <button class="btn btn-link btn-lg font-weight-bold mr-3" @click="back">
                  Back
                </button>
                <button class="btn btn-lg btn-primary font-weight-bold" @click="login">
                  Continue
                </button>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ForgetPassword',
  layout: 'default',
  data () {
    return {
      email_sent: false,
      email: null,
      sub_title: 'Enter your email for reset password.',
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
  methods: {
    clearData () {
      this.email = null
      this.validate = null
      this.message_error = null
    },
    back () {
      this.$router.push({ name: 'auth-login' })
    },
    login () {
      this.validate = null
      this.message_error = null
      this.$axios
        .post(this.$base_api + '/api/auth/frontend/request-forget-password', {
          email: this.email
        })
        .then((res) => {
          const result = res.data.data
          this.email_sent = true
        })
        .catch((error) => {
          const e = error.response
          if (e.status === 422) {
            this.validate = e.data.errors
          } else {
            this.message_error = e.data.message
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/user";

.sent_email {
  text-align: center;
  & img {
    width: 458px;
    margin: 0 auto 32px;
  }
  &-title {
    font-size: 38px;
    line-height: 40px;
    margin-bottom: 12px;
    font-weight: 600;
  }
}
</style>
