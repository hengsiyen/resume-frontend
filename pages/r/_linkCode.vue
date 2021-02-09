<template>
  <div class="section-body">
    <div class="text-center" style="padding-top: 15px">
      <a href="javascript:void(0)" @click="linkToIndex" class="logo mr-auto">
        <img src="~/assets/img/logo/logo-rounded-backgroundx80.png" alt="logo">
        <span class="logo mr-auto logo-text">
          {{ app_name }}
        </span>
      </a>
    </div>
    <div class="template-preview">
      <div class="d-block mx-auto">
        <template v-if="pageCount > 0">
          <pdf
            v-for="(i, k) in pageCount"
            :key="k"
            ref="viewPdfPublic"
            class="w-100 mx-auto mb-5 resume-pdf"
            :src="src"
            :page="i"
          />
        </template>
        <template v-else>
          <div class="pdf mb-0 mx-auto" style="height: 840px; width: 640px">
            <template v-if="show_sms_error">
              <div class="d-flex align-items-center justify-content-center w-100 h-100">
                <div class="d-block text-center">
                  <p style="font-size: 5rem" class="mb-0">
                    😞
                  </p>
                  <h4>Sorry, You can't open this resume</h4>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <div class="button-float button-float-bottom-right button-float-lg" v-if="pageCount > 0">
      <button
        class="btn-float"
        @click="downloadPublicResume"
      >
        <i class="fas fa-download w-100 h-100 d-flex align-items-center justify-content-center" style="font-size: 24px"></i>
      </button>
    </div>
    <SmallFooter />
  </div>
</template>

<script>

import { debounce } from 'debounce'
import SmallFooter from '~/components/section/SmallFooter'
export default {
  name: 'LinkCode',
  components: { SmallFooter },
  layout: 'secondary',
  asyncData (ctx) {
    return ctx.$axios.post(ctx.env.VUE_APP_API + '/api/frontend/resume/show', {
      link_code: ctx.params.linkCode
    }).then((res) => {
      const result = res.data.data
      const image = result ? ctx.env.VUE_APP_API + '/' + result.thumbnail : '/thumbnail.jpg'
      return {
        resume: result,
        show_image: image,
        url: ctx.env.VUE_APP_BASE_URL + ctx.route.fullPath
      }
    })
  },
  head () {
    return {
      title: this.meta.title,
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME,
      meta: this.renderMeta(this.meta)
    }
  },
  data () {
    return {
      src: null,
      pageCount: 0,
      app_name: process.env.VUE_APP_NAME,
      show_sms_error: false
    }
  },
  computed: {
    meta () {
      const data = {
        title: 'Resume',
        description: 'Powered by TalentPlus Resume',
        thumbnail: '/thumbnail.jpg',
        url: process.env.VUE_APP_BASE_URL + this.$route.fullPath
      }

      if (this.resume) {
        data.title = this.resume.first_name + ' ' + this.resume.last_name
        data.url = process.env.VUE_APP_BASE_URL + this.$route.fullPath
        data.thumbnail = this.show_image
      }
      return data
    }
  },
  mounted () {
    this.logContent()
  },
  methods: {
    logContent: debounce(function () {
      this.src = this.$pdf.createLoadingTask(this.$base_api + `/resume/preview-resume-public/${this.$route.params.linkCode}`)
      if (this.src) {
        this.src.promise.then((pdf) => {
          this.pageCount = pdf.numPages
        }).catch((err) => {
          if (err.name === 'MissingPDFException') {
            this.src = null
            this.show_sms_error = true
          }
        })
      }
    }, 800),
    linkToIndex () {
      if (localStorage.getItem(process.env.VUE_APP_TOKEN)) {
        this.$store.dispatch('user/loggedIn')
        this.$router.push({ name: 'user-dashboard' })
      } else {
        this.$store.dispatch('user/loggedOut')
        this.$router.push({ name: 'index' })
      }
    },
    downloadPublicResume () {
      window.open(this.$base_api + `/resume/download-resume-public/${this.$route.params.linkCode}`, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.section-body {
  background-color: #f2f5fa;
  min-height: 100vh;
}

.template-preview {
  position: relative;
  width: 100%;
  min-height: 90vh;
  height: 100%;
  padding: 20px 0;
}

.template-preview div {
  max-width: 992px;
}

.pdf {
  background: #fff;
  border: 3px solid #fff;
  border-radius: 6px;
  margin-bottom: 45px;
  box-shadow: 0 20px 60px 0 rgba(186,200,227,.1), 0 16px 36px 0 rgba(186,200,227,.3);
}

.logo img {
  max-height: 40px;
}

.logo-text {
  font-size: 20px;
  margin: 0;
  padding: 0;
  line-height: 1;
  font-weight: 600;
  color: #222222;
  letter-spacing: 0.8px;
  font-family: var(--font-family-sans-serif);
}

.resume-pdf {
  border: 8px solid white;
  border-radius: 8px;
}
</style>
