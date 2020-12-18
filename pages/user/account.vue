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
                <label for="firstName" class="resume-label-control">First Name</label>
                <input
                  id="firstName"
                  v-model="first_name"
                  type="text"
                  class="resume-form-control"
                >
                <div class="line" />
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group">
                <label for="lastName" class="resume-label-control">Last Name</label>
                <input
                  id="lastName"
                  v-model="last_name"
                  type="text"
                  class="resume-form-control"
                >
                <div class="line" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-6">
              <div class="form-group">
                <label for="email" class="resume-label-control">Email</label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  class="resume-form-control"
                >
                <div class="line" />
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="form-group">
                <label for="phone" class="resume-label-control">Phone</label>
                <input id="phone" type="text" class="resume-form-control">
                <div class="line" />
              </div>
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
                <a href="javascript:void(0)">Connect</a>
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
      phone: ''
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/elements/default";
@import "~assets/scss/user";
</style>
