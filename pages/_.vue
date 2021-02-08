<template>
  <div class="error404">
    <div class="page-404-content">
      <div class="container">
        <div class="row  full-height">
          <div class="col-md-12 text-center">
            <div class="error-image w-75 mx-auto">
              <!--<img class="img-fluid" src="~/assets/img/other/page-404-image.png" alt="Not Found Image">-->
            </div>
            <h1 class="error-404-title font-weight--light text-dark">
              Oops! Page not found!
            </h1>
            <div class="error-buttons section-space--mt_50">
              <nuxt-link class="ht-btn ht-btn-md" to="/">
                <span class="button-icon mr-2">
                  <i class="fa fa-home" />
                </span>
                <span class="button-text">Go back to homepage</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: String,
      default: ''
    }
  },
  layout: 'secondary'
}
</script>
