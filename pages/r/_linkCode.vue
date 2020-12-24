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
            class="w-100 mx-auto pdf"
            :src="src"
            :page="i"
          />
        </template>
      </div>
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
  data () {
    return {
      src: null,
      pageCount: 0,
      app_name: process.env.VUE_APP_NAME
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
          if (err) {
            this.$router.push({ name: 'all', params: 0 })
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
  min-height: 80vh;
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
</style>
