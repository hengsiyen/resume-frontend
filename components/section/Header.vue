<template>
  <!-- ======= Header ======= -->
  <header id="header">
    <div class="container-fluid d-flex align-items-center nav-container">
      <!-- Uncomment below if you prefer to use an image logo -->
      <NuxtLink :to="{name: checkAuth ? 'user-dashboard' : 'index'}" class="logo mr-auto">
        <img src="~/assets/img/logo/logo-rounded-backgroundx80.png" alt="logo">
        <span class="logo mr-auto">
          {{ app_name }}
        </span>
      </NuxtLink>

      <nav class="nav-menu d-none d-lg-block">
        <div class="nav_user_name">
          {{ getUserName }}
        </div>
        <ul>
          <template v-if="checkAuth">
            <li :class="{'active' : $route.name === 'user-dashboard'}">
              <NuxtLink :to="{name: 'user-dashboard'}" class="nav_bar_item">
                Dashboard
              </NuxtLink>
            </li>
            <li class="d-block d-lg-none" :class="{'active' : $route.name === 'user-account'}">
              <NuxtLink :to="{name: 'user-account'}" class="nav_bar_item">
                Account Settings
              </NuxtLink>
            </li>
            <li class="d-block d-lg-none">
              <a
                href="javascript:void(0)"
                @click="test"
                class="nav_bar_item"
              >
                Log Outg
              </a>
            </li>
            <li class="d-none d-lg-block">
              |
            </li>
            <li class="d-none d-lg-block">
              <button
                id="dropdownMenuButton"
                class="btn bnt-lg btn-primary font-weight-bold dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ getUserName }}
              </button>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenuButton"
              >
                <NuxtLink :to="{name: 'user-account'}" class="dropdown-item">
                  Account Settings
                </NuxtLink>
                <a
                  href="javascript:void(0)"
                  @click="logout"
                  class="dropdown-item"
                >
                  Log Out
                </a>
              </div>
            </li>
          </template>
          <template v-else>
            <template v-if="!$route.name.includes('auth')">
              <li class="px-0">
                <NuxtLink :to="{name: 'auth-login'}" class="btn btn-link underline-none text-dark">
                  Log In
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="{name: 'resume-create'}" class="btn btn-primary">
                  Sign up
                </NuxtLink>
              </li>
            </template>
          </template>
        </ul>
      </nav><!-- .nav-menu -->
    </div>
  </header>
  <!-- End Header -->
</template>

<script>

export default {
  name: 'Header',
  computed: {
    checkAuth () {
      return this.$store.state.user.authenticated
    },
    getUserName () {
      const first_name = this.$store.state.user.user.first_name
      const last_name = this.$store.state.user.user.last_name
      return first_name + ' ' + last_name
    }
  },
  data () {
    return {
      app_name: process.env.VUE_APP_NAME
    }
  },
  methods: {
    test () {
      console.log('asdas')
    },
    logout () {
      this.$axios.post(this.$base_api + '/api/auth/frontend/logout')
        .finally(() => {
          localStorage.clear()
          this.$store.dispatch('user/loggedOut')
          this.$router.push({ name: 'index', replace: true })
        })
    }
  }
}
</script>

<style scoped>

</style>
