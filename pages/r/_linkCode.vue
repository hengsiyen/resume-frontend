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

    <!--    <div>-->
    <!--      <input type="checkbox" v-model="show">-->
    <!--      <select v-model="src" style="width: 30em" @change="test">-->
    <!--        <option v-for="(item, key) in pdfList" :value="item" :key="key">-->
    <!--          {{ item }}-->
    <!--        </option>-->
    <!--      </select>-->
    <!--      <input v-model.number="page" type="number" style="width: 5em"> /{{ numPages }}-->
    <!--      <button @click="rotate += 90">-->
    <!--        &#x27F3;-->
    <!--      </button>-->
    <!--      <button @click="rotate -= 90">-->
    <!--        &#x27F2;-->
    <!--      </button>-->
    <!--      <button @click="$refs.pdf.print()">-->
    <!--        print-->
    <!--      </button>-->
    <!--      <div style="width: 50%">-->
    <!--        <div-->
    <!--          v-if="loadedRatio > 0 && loadedRatio < 1"-->
    <!--          style="background-color: green; color: white; text-align: center"-->
    <!--          :style="{ width: loadedRatio * 100 + '%'}"-->
    <!--        >-->
    <!--          {{ Math.floor(loadedRatio * 100) }}%-->
    <!--        </div>-->
    <!--        <pdf-->
    <!--          v-if="show"-->
    <!--          ref="pdf"-->
    <!--          style="border: 1px solid red"-->
    <!--          :src="src"-->
    <!--          :page="page"-->
    <!--          :rotate="rotate"-->
    <!--          @password="password"-->
    <!--          :style="progress ? 'opacity: 1; transition: opacity .5s ease 0s;' : 'opacity: 0; transition: opacity .5s ease 0s'"-->
    <!--          @error="error"-->
    <!--          @page-loaded="inProgress"-->
    <!--          @num-pages="numPages = $event"-->
    <!--          @link-clicked="page = $event"-->
    <!--        ></pdf>-->
    <!--      </div>-->
    <!--    </div>-->
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
      // show: true,
      // pdfList: [
      //   'https://api-talentplus-job.asoradev.com/resume/preview-resume/44cefb9c-f7a9-479d-aa0f-347e04db84ef',
      //   'https://api-talentplus-job.asoradev.com/resume/preview-resume/44cefb9c-f7a9-479d-aa0f-347e04db84ef',
      //   'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
      //   'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/freeculture.pdf',
      //   'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/annotation-link-text-popup.pdf',
      //   'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/calrgb.pdf',
      //   'https://cdn.rawgit.com/sayanee/angularjs-pdf/68066e85/example/pdf/relativity.protected.pdf',
      //   'data:application/pdf;base64,JVBERi0xLjUKJbXtrvsKMyAwIG9iago8PCAvTGVuZ3RoIDQgMCBSCiAgIC9GaWx0ZXIgL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQp4nE2NuwoCQQxF+/mK+wMbk5lkHl+wIFislmIhPhYEi10Lf9/MVgZCAufmZAkMppJ6+ZLUuFWsM3ZXxvzpFNaMYjEriqpCtbZSBOsDzw0zjqPHZYtTrEmz4eto7/0K54t7GfegOGCBbBdDH3+y2zsMsVERc9SoRkXORqKGJupS6/9OmMIUfgypJL4KZW5kc3RyZWFtCmVuZG9iago0IDAgb2JqCiAgIDEzOAplbmRvYmoKMiAwIG9iago8PAogICAvRXh0R1N0YXRlIDw8CiAgICAgIC9hMCA8PCAvQ0EgMC42MTE5ODcgL2NhIDAuNjExOTg3ID4+CiAgICAgIC9hMSA8PCAvQ0EgMSAvY2EgMSA+PgogICA+Pgo+PgplbmRvYmoKNSAwIG9iago8PCAvVHlwZSAvUGFnZQogICAvUGFyZW50IDEgMCBSCiAgIC9NZWRpYUJveCBbIDAgMCA1OTUuMjc1NTc0IDg0MS44ODk3NzEgXQogICAvQ29udGVudHMgMyAwIFIKICAgL0dyb3VwIDw8CiAgICAgIC9UeXBlIC9Hcm91cAogICAgICAvUyAvVHJhbnNwYXJlbmN5CiAgICAgIC9DUyAvRGV2aWNlUkdCCiAgID4+CiAgIC9SZXNvdXJjZXMgMiAwIFIKPj4KZW5kb2JqCjEgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzCiAgIC9LaWRzIFsgNSAwIFIgXQogICAvQ291bnQgMQo+PgplbmRvYmoKNiAwIG9iago8PCAvQ3JlYXRvciAoY2Fpcm8gMS4xMS4yIChodHRwOi8vY2Fpcm9ncmFwaGljcy5vcmcpKQogICAvUHJvZHVjZXIgKGNhaXJvIDEuMTEuMiAoaHR0cDovL2NhaXJvZ3JhcGhpY3Mub3JnKSkKPj4KZW5kb2JqCjcgMCBvYmoKPDwgL1R5cGUgL0NhdGFsb2cKICAgL1BhZ2VzIDEgMCBSCj4+CmVuZG9iagp4cmVmCjAgOAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDA1ODAgMDAwMDAgbiAKMDAwMDAwMDI1MiAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAyMzAgMDAwMDAgbiAKMDAwMDAwMDM2NiAwMDAwMCBuIAowMDAwMDAwNjQ1IDAwMDAwIG4gCjAwMDAwMDA3NzIgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSA4CiAgIC9Sb290IDcgMCBSCiAgIC9JbmZvIDYgMCBSCj4+CnN0YXJ0eHJlZgo4MjQKJSVFT0YK'
      // ],
      // src: '',
      // loadedRatio: 0,
      // page: 1,
      // numPages: 0,
      // rotate: 0,
      // progress: 0
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
    // test () {
    //   this.progress = 0
    //   console.log(this.progress)
    // },
    // inProgress ($event) {
    //   this.progress = $event
    //   console.log(this.progress)
    // },
    // password (updatePassword, reason) {
    //   updatePassword(prompt('password is "test"'))
    // },
    // error (err) {
    //   console.log(err)
    // }
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
