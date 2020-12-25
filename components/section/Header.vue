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
        <ul>
          <template v-if="checkAuth">
            <li :class="{'active' : $route.name === 'user-dashboard'}">
              <NuxtLink :to="{name: 'user-dashboard'}" class="nav_bar_item">
                Dashboard
              </NuxtLink>
            </li>
            <li>|</li>
            <li>
              <button
                id="dropdownMenuButton"
                class="btn bnt-lg btn-primary font-weight-bold dropdown-toggle no-icon"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                My Account
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
            <template v-if="$route.name != 'user-login'">
              <li class="px-0">
                <NuxtLink :to="{name: 'user-login'}" class="btn btn-link underline-none text-dark">
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
    }
  },
  data () {
    return {
      app_name: process.env.VUE_APP_NAME
    }
  },
  methods: {
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
