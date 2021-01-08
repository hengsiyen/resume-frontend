<template>
  <div class="form__header-block">
    <NuxtLink :to="{name: 'index'}" class="logo mr-auto">
      <img src="~/assets/img/logo/logo-rounded-backgroundx80.png" alt="logo">
      <span class="mr-auto">
        {{ app_name }}
      </span>
    </NuxtLink>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'HeaderSecondary',
  data () {
    return {
      app_name: process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/resume.scss";

.form__header-block {
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-shrink: 0;
  width: 100%;
  height: 54px;
  padding: 0 32px;
}

.logo {
  & img {
    display: inline-block;
    width: 40px;
    height: 40px;
    vertical-align: middle;
  }

  & span {
    font-size: 24px;
    color: var(--dark);
    font-weight: 600;
  }
}
</style>
