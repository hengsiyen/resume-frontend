<template>
  <div class="resume__form dashboard-content min-vh-100">
    <HeaderSecondary>
      <div class="form__button-remove position-absolute">
        <NuxtLink :to="{name: 'index'}">
          <i class="fas fa-times" />
        </NuxtLink>
      </div>
    </HeaderSecondary>
    <div class="stepper d-none d-md-flex align-items-center justify-content-center">
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
    <div class="form__body_block position-relative d-flex flex-column">
      <template v-if="onLoading">
        <div class="d-flex align-items-center justify-content-center" style="height: 80vh;">
          <i class="fas fa-circle-notch fa-spin fa-2x mr-2"></i>
          <p class="mb-0 fa-2x">
            Loading resume template...
          </p>
        </div>
      </template>
      <template v-else>
        <div class="form__body-container" v-if="templateLists.length > 0">
          <div class="form__body-wrapper w-100 mx-auto d-flex d-md-none justify-content-center align-items-center flex-column">
            <div class="body__title">
              Connect your social profile
            </div>
          </div>
          <slick v-bind="slick_setting" ref="carousel" @afterChange="slideIndexCarousel">
            <div v-for="(item, key) in templateLists" :key="key">
              <div class="d-block mx-1 mx-md-3 text-center position-relative">
                <div>
                  <h5><strong>{{ item.name_en }}</strong></h5>
                </div>
                <template v-if="templateLists.length > 3 && active_slide === key">
                  <div class="btn-choose-template">
                    <button
                      class="btn btn-primary font-weight-bold"
                      @click="chooseTemplate(item.name_en)"
                    >
                      Use This Template
                    </button>
                  </div>
                </template>
                <template v-else>
                  <div class="btn-choose-template">
                    <button
                      class="btn btn-primary font-weight-bold"
                      @click="chooseTemplate(item.name_en)"
                    >
                      Use This Template
                    </button>
                  </div>
                </template>
                <div
                  :key="key"
                  class="template-item-show"
                  :style="`background-image: url('${$base_api}/${item.image}')`"
                />
              </div>
            </div>
          </slick>
          <template v-if="templateLists.length > 3">
            <div class="button-float position-absolute button-float-md slick-show-prev">
              <button class="btn-float" @click="showPrev">
                <i class="fas fa-angle-left w-100 h-100 d-flex align-items-center justify-content-center" style="font-size: 24px"></i>
              </button>
            </div>
            <div class="button-float position-absolute button-float-md slick-show-next">
              <button class="btn-float" @click="showNext">
                <i class="fas fa-angle-right w-100 h-100 d-flex align-items-center justify-content-center" style="font-size: 24px"></i>
              </button>
            </div>
          </template>
        </div>
      </template>
    </div>
    <SmallFooter />
  </div>
</template>

<script>
import HeaderSecondary from '~/components/section/HeaderSecondary'
import SmallFooter from '~/components/section/SmallFooter'
export default {
  name: 'Templates',
  layout: 'secondary',
  components: { SmallFooter, HeaderSecondary },
  data () {
    return {
      templateLists: [],
      steppers: [
        {
          number: 1,
          label: 'Choose template',
          active: true
        },
        {
          number: 2,
          label: 'Enter your details',
          active: false
        },
        {
          number: 3,
          label: 'Create your resume',
          active: false
        }
      ],
      active_slide: 0,
      onLoading: true,
      slick_setting: {
        centerMode: true,
        arrows: false,
        dots: false,
        useTransform: true,
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true
            }
          },
          {
            breakpoint: 991.98,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true
            }
          }
        ]
      }
    }
  },
  created () {
    if (this.$store.state.user.authenticated) {
      this.$router.push({
        name: 'user-dashboard',
        replace: true
      })
    }
  },
  mounted () {
    this.getResumeTemplates()
  },
  methods: {
    chooseTemplate (template_name) {
      this.$store.dispatch('user/setChooseTemplate', template_name)
      localStorage.setItem('template', template_name)
      this.$router.push({ name: 'resume-create' })
    },
    slideIndexCarousel (slideIndex) {
      this.active_slide = slideIndex
    },
    showPrev () {
      this.$refs.carousel.prev()
    },
    showNext () {
      this.$refs.carousel.next()
    },
    getResumeTemplates () {
      this.$axios
        .post(this.$base_api + '/api/frontend/resume-template/get-option-for-resume')
        .then((res) => {
          this.templateLists = res.data.data
        })
        .finally(() => {
          this.onLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/resume.scss";
@import "~assets/scss/user";
@import "~assets/scss/create-resume.scss";
</style>
