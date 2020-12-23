<template>
  <div class="section-container">
    <div class="section-wrapper" style="width: 856px">
      <div class="sect-title">
        Account Settings
      </div>
      <div class="w-100" style="margin-bottom: 28px">
        <div class="resume-card-title">
          ACCOUNT
        </div>
        <div class="resume-card-body">
          <div class="row">
            <div class="col-12 col-sm-6">
              <div class="form-group">
                <label
                  for="firstName"
                  class="resume-label-control"
                  :class="{'text-danger': checkKeyObj(validate, 'first_name')}"
                >First Name</label>
                <input
                  id="firstName"
                  v-model="first_name"
                  :readonly="!is_update"
                  type="text"
                  class="resume-form-control"
                  :class="{'read-only': !is_update, 'line-red': checkKeyObj(validate, 'first_name')}"
                >
                <div class="line" :class="{'line-red': checkKeyObj(validate, 'first_name')}" />
                <template v-if="checkKeyObj(validate, 'first_name')">
                  <small class="text-muted">{{ validate.first_name[0] }}</small>
                </template>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group">
                <label
                  for="lastName"
                  class="resume-label-control"
                  :class="{'text-danger': checkKeyObj(validate, 'last_name')}"
                >Last Name</label>
                <input
                  id="lastName"
                  v-model="last_name"
                  :readonly="!is_update"
                  type="text"
                  class="resume-form-control"
                  :class="{'read-only': !is_update, 'line-red': checkKeyObj(validate, 'last_name')}"
                >
                <div class="line" :class="{'line-red': checkKeyObj(validate, 'last_name')}" />
                <template v-if="checkKeyObj(validate, 'last_name')">
                  <small class="text-muted">{{ validate.last_name[0] }}</small>
                </template>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-6">
              <div class="form-group">
                <label
                  for="email"
                  class="resume-label-control"
                  :class="{'text-danger': checkKeyObj(validate, 'email')}"
                >Email</label>
                <input
                  id="email"
                  v-model="email"
                  :readonly="!is_update"
                  type="email"
                  class="resume-form-control"
                  :class="{'read-only': !is_update, 'line-red': checkKeyObj(validate, 'email')}"
                >
                <div class="line" :class="{'line-red': checkKeyObj(validate, 'email')}" />
                <template v-if="checkKeyObj(validate, 'email')">
                  <small class="text-muted">{{ validate.email[0] }}</small>
                </template>
              </div>
            </div>
            <div class="col-12 col-sm-6" style="padding-top: 30px">
              <label class="resume-label-control">
                Use this email to log in to your TalentPlus Resume account and receive notifications.
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-right">
              <template v-if="is_update">
                <button class="btn btn-lg btn-link underline-none mr-3 font-weight-bold text-muted" @click="is_update = false">
                  Cancel
                </button>
                <button class="btn btn-lg btn-primary font-weight-bold" @click="saveUser">
                  Save
                </button>
              </template>
              <template v-else>
                <button class="btn btn-lg btn-link underline-none font-weight-bold" @click="updateUser">
                  Update
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="w-100" style="margin-bottom: 28px">
        <div class="resume-card-title">
          SOCIAL PROFILE
        </div>
        <div class="resume-card-body">
          <template v-for="(item, k) in shareSocial">
            <div :key="k" class="social-link">
              <div class="d-flex align-items-center justify-content-center mr-2">
                <div
                  class="social-icon d-flex align-items-center justify-content-center mr-1"
                  :class="item.label"
                >
                  <i :class="item.icon" />
                </div>
                <div class="social-label">
                  {{ item.label }}
                </div>
              </div>
              <div class="text-primary d-flex align-items-center justify-content-center">
                <template v-if="user.provider_id">
                  <a href="javascript:void(0)">Disconnect</a>
                </template>
                <template v-else>
                  <a href="javascript:void(0)">Connect</a>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account',
  layout: 'default',
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      uuid: null,
      is_update: false,
      validate: null
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    }
  },
  created () {
    if (!this.$store.state.user.authenticated) {
      this.$router.push({
        name: 'index',
        replace: true
      })
    }
  },
  mounted () {
    this.first_name = this.user.first_name
    this.last_name = this.user.last_name
    this.email = this.user.email
    this.uuid = this.user.uuid
  },
  methods: {
    updateUser () {
      this.is_update = true
    },
    saveUser () {
      this.$axios
        .post(this.$base_api + '/api/auth/frontend/resume-update-information', {
          uuid: this.uuid,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email
        })
        .then((res) => {
          this.$store.dispatch('user/setUser', res.data.data)
          this.is_update = false
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.validate = error.response.data.errors
          } else {
            this.onResponseError(error)
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/elements/default";
@import "~assets/scss/user";

.autocomplete-input, .resume-form-control.read-only {
  color: #707070;
}
</style>
