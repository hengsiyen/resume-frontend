<template>
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
            <div class="col-12 col-sm-12">
              <div class="form-group">
                <label for="email" class="resume-label-control">Email</label>
                <input
                  id="email"
                  v-model="email"
                  type="text"
                  class="resume-form-control"
                >
                <div class="line" />
              </div>
            </div>
            <div class="col-12 col-sm-12">
              <div class="form-group">
                <label for="password" class="resume-label-control">Password</label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  class="resume-form-control"
                >
                <div class="line" />
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
        <template v-else>
          <div class="login-buttons">
            <div class="login-button">
              <a href="#" class="btn-facebook">
                <span>
                  <i class="fab fa-facebook-f"></i>
                </span>
                Facebook
              </a>
            </div>
            <div class="login-button">
              <a href="javascript:void(0)" class="btn-email" @click="enterEmail">
                <span>
                  <i class="far fa-envelope"></i>
                </span>
                Email
              </a>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  layout: 'default',
  data () {
    return {
      log_with_email: false,
      email: null,
      password: null,
      sub_title: 'We are happy to see you back!',
      validate: null
    }
  },
  methods: {
    clearData () {
      this.email = null
      this.password = null
      this.validate = {}
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
      this.$axios
        .post(this.$base_api + '/api/auth/frontend/login', {
          email: this.email,
          password: this.password
        })
        .then((res) => {
          const result = res.data.data
          // set token on local storage
          localStorage.setItem(process.env.VUE_APP_TOKEN, result.access_token)
          localStorage.setItem(process.env.VUE_APP_REFRESH_TOKEN, result.refresh_token)
          localStorage.setItem('user', JSON.stringify(result.user))

          // set authorization on axios
          this.$axios.setToken(result.access_token, 'Bearer')
          this.$axios.defaults.headers.common.Accept = 'application/json'

          this.$store.dispatch('user/setUser', result.user)
          this.$store.dispatch('user/loggedIn')
          this.$router.push({
            name: 'user-dashboard',
            replace: true
          })
        })
        .catch((error) => {
          if (error) {
            console.log(error)
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/elements/default";
@import "@/assets/scss/user";
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;
  -webkit-box-flex: 1;
  flex-grow: 1;
  padding: 40px 32px 220px;
  height: 92.5vh;
}

.login-title {
  font-size: 46px;
  line-height: 48px;
  color: rgb(33, 150, 243);
  font-weight: bold;
}

.login-buttons {
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-bottom: 18px;
}

.login-button {
  width: 50%;
  margin-bottom: 18px;
}
.login-button:nth-child(2n+1) {
  padding-right: 8px;
}

.btn-email,
.btn-facebook {
  position: relative;
  display: block;
  width: 100%;
  padding: 13px 10px 13px 30px;
  border-radius: 4px;
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s ease 0s, border-color 0.2s ease 0s, color 0.2s ease 0s;
}

.btn-email span,
.btn-facebook span {
  position: absolute;
  left: 24px;
  top: 55%;
  margin-top: -12px;
}

.btn-facebook {
  border: 1px solid rgb(59, 89, 152);
  background-color: rgb(59, 89, 152);
  color: white;
}

.btn-email {
  border: 1px solid rgb(221, 227, 240);
  background-color: white;
  color: rgb(38, 43, 51);

  &:hover {
    color: $resume-blue;
    border-color: $resume-blue;
  }
}

.btn-email span {
  color: $resume-blue;
}
</style>
