<template>
  <div class="resume__form">
    <div class="form__header-block">
      <NuxtLink :to="{name: 'index'}" class="logo mr-auto">
        <img src="~/assets/img/logo/logo-rounded-backgroundx80.png" alt="logo">
        <span class="mr-auto">
          {{ app_name }}
        </span>
      </NuxtLink>
      <div class="stepper d-flex align-items-center justify-content-center">
        <div class="stepper-content">
          <template v-for="(item, key) in steppers">
            <div :key="key" class="stepper-content_item">
              <div
                class="stepper-item__number d-flex align-items-center justify-content-center"
                :class="{'active': item.active}"
              >
                {{ item.number }}
              </div>
              <div class="stepper-item__label active">
                {{ item.label }}
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="form__button-remove position-absolute">
        <NuxtLink :to="{name: 'index'}">
          <i class="fas fa-times" />
        </NuxtLink>
      </div>
    </div>
    <div class="form__body_block position-relative d-flex flex-column">
      <div class="form__body-container">
        <template v-if="step === 1">
          <div class="form__body-wrapper w-100 mx-auto d-flex justify-content-center align-items-center flex-column">
            <div class="body__title">
              Connect your social profile
            </div>
            <div class="body__sub-title text-center">
              Prefill your resume with data from your social profile
            </div>
            <div class="body_content w-100">
              <div class="social-list d-flex justify-content-between flex-wrap">
                <template v-for="(item, key) in socials">
                  <a
                    :key="key"
                    href="javascript:void(0)"
                    class="d-flex justify-content-between align-items-center w-100 position-relative"
                  >
                    <div class="social-name d-flex align-items-center">
                      <div
                        class="social-icon d-flex align-items-center justify-content-center"
                        :class="item.code"
                      >
                        <i :class="item.icon" />
                      </div>
                      {{ item.label }}
                    </div>
                    <div class="social-arrow">
                      <i class="fas fa-angle-right" />
                    </div>
                  </a>
                </template>
              </div>
              <div class="d-flex align-items-center justify-content-between w-100">
                <NuxtLink :to="{name: 'index'}" class="btn btn-outline-secondary btn-lg font-weight-bold">
                  Back
                </NuxtLink>
                <button class="btn btn-primary btn-lg font-weight-bold" @click="onClickNext()">
                  Skip
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="step === 2">
          <div class="form__body-wrapper w-100 mx-auto d-flex justify-content-center align-items-center flex-column">
            <div class="body__title">
              Add your name
            </div>
            <div class="body__sub-title text-center">
              You made a great template selection! Now let’s add your name to it.
            </div>
            <div class="body_content w-100">
              <div class="form__input">
                <div class="form-group">
                  <label
                    class="resume-label-control"
                    :class="{'text-danger': checkKeyObj(validate, 'first_name')}"
                  >First Name</label>
                  <input v-model="first_name" type="text" class="resume-form-control">
                  <div class="line" :class="{'line-red': checkKeyObj(validate, 'first_name')}" />
                  <template v-if="checkKeyObj(validate, 'first_name')">
                    <small class="text-muted">{{ validate.first_name[0] }}</small>
                  </template>
                </div>

                <div class="form-group">
                  <label
                    class="resume-label-control"
                    :class="{'text-danger': checkKeyObj(validate, 'last_name')}"
                  >Last Name</label>
                  <input v-model="last_name" type="text" class="resume-form-control">
                  <div class="line" :class="{'line-red': checkKeyObj(validate, 'last_name')}" />
                  <template v-if="checkKeyObj(validate, 'last_name')">
                    <small class="text-muted">{{ validate.last_name[0] }}</small>
                  </template>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between w-100">
                <button class="btn btn-outline-secondary btn-lg font-weight-bold" @click="onClickPrev">
                  Back
                </button>
                <button class="btn btn-primary btn-lg font-weight-bold" @click="registerByName">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="step === 3">
          <div class="form__body-wrapper w-100 mx-auto d-flex justify-content-center align-items-center flex-column">
            <div class="body__title">
              Supply contact information
            </div>
            <div class="body__sub-title text-center">
              It’s important to let employers know how to contact you. Enter your email address below.
            </div>
            <div class="body_content w-100">
              <div class="form__input">
                <div class="form-group">
                  <label
                    class="resume-label-control"
                    :class="{'text-danger': checkKeyObj(validate, 'Email')}"
                  >Email</label>
                  <input v-model="email" type="email" class="resume-form-control">
                  <div class="line" :class="{'line-red': checkKeyObj(validate, 'Email')}" />
                  <template v-if="checkKeyObj(validate, 'email')">
                    <small class="text-muted">{{ validate.email[0] }}</small>
                  </template>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between w-100">
                <button class="btn btn-outline-secondary btn-lg font-weight-bold" @click="onClickPrev">
                  Back
                </button>
                <button class="btn btn-primary btn-lg font-weight-bold" @click="registerEmail">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="d-flex align-items-center justify-content-center">
      <span class="mr-1 text-muted">Copyright © 2020 All rights reserved by {{ app_name }}. Powered by</span>
      <a href="http://asorasoft.com/" class="text-muted"> Asorasoft</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Create',
  layout: 'secondary',
  data () {
    return {
      step: 1,
      first_name: null,
      last_name: null,
      email: null,
      validate: null,
      app_name: process.env.VUE_APP_NAME,
      steppers: [
        { number: 1, label: 'Enter your details', active: true },
        { number: 2, label: 'Create your resume', active: false }
      ],
      socials: [
        { id: 1, icon: 'fab fa-facebook-f', label: 'Facebook', code: 'facebook' }
        // { id: 2, icon: 'fab fa-google', label: 'Google', code: 'google' }
      ]
    }
  },
  methods: {
    clearData () {
      this.validate = null
      this.first_name = null
      this.last_name = null
      this.email = null
    },
    registerByName () {
      this.validate = {}

      if (!this.first_name) {
        this.validate.first_name = ['this field is required.']
      }
      if (!this.last_name) {
        this.validate.last_name = ['this field is required.']
      }
      if (!this.notEmptyObject(this.validate)) {
        this.onClickNext()
      }
    },
    registerEmail () {
      this.validate = {}

      if (!this.email) {
        this.validate.email = ['this field is required.']
      }
      if (!this.notEmptyObject(this.validate)) {
        this.$store.dispatch('user/setUser', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email
        })
        this.$router.push({ name: 'resume-uuid-edit', params: { uuid: '23523' } })
      }
    },
    onClickNext () {
      this.step += 1
    },

    onClickPrev () {
      this.step -= 1
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/resume.scss";

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
    width: 45px;
    height: 45px;
    vertical-align: middle;
  }
  & span {
    font-size: 20px;
    color: var(--dark);
  }
}

.stepper {
  position: absolute;
  width: 700px;
  left: calc(50% - 350px);
  &-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &_item {
      display: flex;
      align-items: center;
      &:after {
        content: "";
        width: 32px;
        height: 1px;
        background-color: rgb(221, 227, 240);
        margin: 0px 8px;
        color: rgb(221, 227, 240);
      }
      &:last-child:after {
        content: unset;
      }
    }
  }
  &-item__number {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: rgb(221, 227, 240);
    font-size: 16px;
    line-height: 20px;
    color: rgb(255, 255, 255);
    font-weight: 600;
    margin-right: 12px;
    transition: background-color 0.2s ease 0s, color 0.2s ease 0s;
    &.active {
      background-color: rgb(33, 150, 243);
    }
  }
  &-item__label {
    font-size: 20px;
    color: rgb(152, 161, 179);
    transition: color 0.2s ease 0s;
    &.active {
      color: rgb(38, 43, 51);
    }
  }
}

.form__button-remove {
  width: 30px;
  height: 30px;
  right: 32px;
  bottom: 10px;
  cursor: pointer;
  transition: color 0.2s ease 0s;
  font-size: 24px;
  & a {
    color: #cfd6e6;
  }
}

.form__body_block {
  min-height: calc(100vh - 80px);
}
.form__body-container {
  padding: 64px 44px 48px;
}

.form__body-wrapper {
  max-width: 1120px;
  & .body__title {
    font-size: 46px;
    line-height: 48px;
    font-weight: 700;
    color: rgb(33, 150, 243);
    margin-bottom: 12px;
  }
  & .body__sub-title {
    margin-bottom: 32px;
  }
  & .body_content {
    max-width: 416px;
    & .social-list {
      background-color: rgb(242, 245, 250);
      border-radius: 8px;
      & a {
        font-size: 19px;
        color: var(--dark);
        font-weight: 600;
        border-radius: 8px 8px 0 0;
        padding: 20px 32px;
        border-bottom: 1px solid rgb(221, 227, 240);
        transition: background-color 0.1s ease 0s, color 0.1s ease 0s;

        &:hover {
          color: rgb(33, 150, 243);
          background-color: rgba(204, 232, 255, 0.5);
        }
        &:last-child {
          border: none;
          margin: 0;
          border-radius: 0 0 8px 8px;
        }
      }
    }

    & .social-list,
    & .form__input {
      margin-bottom: 48px;
    }
  }
}
</style>
