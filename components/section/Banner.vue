<template>
  <section id="hero" class="d-flex align-items-center">
    <div class="container" data-aos="zoom-out" data-aos-delay="100">
      <div class="banner-content">
        <h1 class="banner-content_title">Job-winning resume templates</h1>
        <p>
          Each template is expertly designed and follows the exact “resume rules” hiring managers look for.
          Stand out and get hired faster with field-tested resume templates.
        </p>
        <div class="banner-content_action">
          <a href="#" class="btn btn-primary">Create My Resume</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style scoped>
.banner-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 262px;
  max-width: 670px;
  margin: 0 auto 48px;
  text-align: center;
}

.banner-content_title {
  font-weight: 700;
  font-size: 54px;
  line-height: 52px;
  margin-bottom: 12px;
}

.banner-content_action {
  margin-top: 24px;
}
</style>
