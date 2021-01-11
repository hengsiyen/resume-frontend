<template>
  <nav id="header" class="navbar navbar-expand-lg navbar-light">
    <NuxtLink
      :to="{name: checkAuth ? 'user-dashboard' : 'index'}"
      class="navbar-brand logo mr-auto d-flex align-items-center"
    >
      <img
        src="~/assets/img/logo/logo-rounded-backgroundx80.png"
        class="d-inline-block align-top mr-2"
        alt="logo"
        loading="lazy"
      >
      <span class="logo mr-auto">{{ app_name }}</span>
    </NuxtLink>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="fas fa-bars"></span>
    </button>
    <div class="collapse navbar-collapse nav-menu" id="navbarNavAltMarkup">
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <template v-if="checkAuth">
          <li class="nav-item d-block d-lg-none" :class="{'active' : $route.name === 'user-dashboard'}">
            <div class="nav_user_name">
              {{ getUserName }}
            </div>
          </li>
          <li class="nav-item" :class="{'active' : $route.name === 'user-dashboard'}">
            <NuxtLink :to="{name: 'user-dashboard'}" class="nav-link nav_bar_item">
              Dashboard
            </NuxtLink>
          </li>
          <li class="nav-item d-none d-lg-block">
            <div class="nav-link">
              |
            </div>
          </li>
          <li class="nav-item d-block d-lg-none" :class="{'active' : $route.name === 'user-account'}">
            <NuxtLink :to="{name: 'user-account'}" class="nav-link nav_bar_item">
              Account Settings
            </NuxtLink>
          </li>
          <li class="nav-item d-block d-lg-none">
            <a href="javascript:void(0)" @click="logout" class="nav-link nav_bar_item">
              Log Out
            </a>
          </li>
          <li class="nav-item dropdown d-none d-lg-block">
            <button
              id="dropdownMenuButton1"
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
            <li class="nav-item">
              <NuxtLink :to="{name: 'auth-login'}" class="nav-link nav_bar_item">
                Log In
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink :to="{name: 'resume-templates'}" class="btn btn-primary font-weight-bold">
                Sign up
              </NuxtLink>
            </li>
          </template>
        </template>
      </ul>
    </div>
  </nav>
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
