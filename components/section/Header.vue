<template>
  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top">
    <div class="container-fluid d-flex align-items-center nav-container">
      <!-- Uncomment below if you prefer to use an image logo -->
      <NuxtLink :to="{name: 'index'}" class="logo mr-auto">
        <img src="~/assets/img/logo/logo-rounded-backgroundx80.png" alt="logo">
        <span class="logo mr-auto">
          {{ app_name }}
        </span>
      </NuxtLink>

      <nav class="nav-menu d-none d-lg-block">
        <ul>
          <li class="active">
            <NuxtLink :to="{name: 'index'}">
              Home
            </NuxtLink>
          </li>
          <li>|</li>
          <li class="px-0">
            <button class=" btn btn-link underline-none text-dark">
              Log in
            </button>
          </li>
          <li>
            <button href="#" class="btn btn-primary">
              Sign up
            </button>
          </li>
        </ul>
      </nav><!-- .nav-menu -->
    </div>
  </header>
  <!-- End Header -->
</template>

<script>

export default {
  name: 'Header',
  data () {
    return {
      app_name: process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>
