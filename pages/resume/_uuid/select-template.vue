<template>
  <!-- ======= Header ======= -->
  <div>
    <header>
      <div
        class="container-fluid d-flex align-items-center justify-content-between nav-container bg-dark"
        style="height: 64px"
      >
        <!-- Uncomment below if you prefer to use an image logo -->
        <div class="btn-select-template d-flex align-items-center justify-content-center">
          <div class="btn-select-template-icon d-flex align-items-center justify-content-center">
            <i class="fas fa-angle-left" />
          </div>
          <NuxtLink
            :to="{name: 'resume-uuid-edit', params: {uuid: $route.params.uuid}}"
            class="btn-select-template-label"
          >
            Back to editor
          </NuxtLink>
        </div>
        <div>
          <button class="btn bnt-lg btn-primary font-weight-bold">
            Download PDF
          </button>
          <button
            id="dropdownMenuButton"
            class="btn bnt-lg btn-primary font-weight-bold dropdown-toggle no-icon"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-ellipsis-h" />
          </button>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
          >
            <button
              class="dropdown-item"
              type="button"
              data-toggle="modal"
              data-target="#shareLink"
            >
              <i class="fas fa-link" /> Share a link
            </button>
          </div>
        </div>
      </div>
    </header>
    <div class="d-flex section-body">
      <div class="template-list">
        <div class="template-list-content">
          <div class="d-flex flex-wrap justify-content-between">
            <template v-for="(item, k) in templateLists">
              <div class="template-item" :key="k">
                <div class="template-name">
                  {{ item.name }}
                </div>
                <div class="template-item-show" :style="`background-image: url('${item.img}')`" />
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="template-preview">
<!--        <div class="top_pdf">-->
<!--          <button class="btn angle-l" @click="angleLeft">-->
<!--            <i class="fas fa-angle-left" />-->
<!--          </button>-->
<!--          <div class="page_count">-->
<!--            {{ currentPage }} / {{ pageCount }}-->
<!--          </div>-->
<!--          <button class="btn angle-r" @click="angleRight">-->
<!--            <i class="fas fa-angle-right" />-->
<!--          </button>-->
<!--        </div>-->
        <div class="resume__preview-container">
          <div class="viewer-content position-relative w-75 mx-auto">
            <template v-if="pageCount > 0">
              <pdf
                v-for="(i, k) in pageCount"
                :key="k"
                ref="myPdfComponent"
                class="show_pdf"
                :src="src"
                :page="currentPage"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
    <!--      model share resume-->
    <div
      id="shareLink"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="shareLink"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header custom-padding">
            <h5 id="exampleModalLabel" class="modal-title">
              Share
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body custom-padding">
            <h4><strong>Share a Link to Your Resume</strong></h4>
            <h5 class="mb-4">
              Share this link on social media or copy and paste the URL to send your resume via text, email or to
              share your resume on your personal website.
            </h5>
            <div class="form-group">
              <label class="resume-label-control">Copy this private URL</label>
              <input
                readonly
                class="resume-form-control"
                :value="resume_url"
                style="pointer-events: unset"
              >
              <div class="line" />
            </div>
          </div>
          <div class="modal-footer no-border justify-content-between custom-padding">
            <template v-for="(item, k) in shareSocial">
              <div :key="k" class="share-social" :class="item.label">
                <a
                  target="_blank"
                  :href="item.url"
                  :class="item.label"
                >
                  <i :class="item.icon" />
                </a>
              </div>
            </template>
            <div>
              <a
                :href="resume_url"
                type="button"
                class="btn btn-link btn-lg font-weight-bold a-no-underline"
                data-dismiss="modal"
              >
                Open Link
              </a>
              <button
                v-clipboard:copy="resume_url"
                v-clipboard:success="onCopy"
                type="button"
                class="btn btn-primary btn-lg font-weight-bold"
              >
                {{is_copy ? 'Copied!' :'Copy Link'}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Header -->
</template>

<script>

import { debounce } from 'debounce'
import { mapState } from 'vuex'

export default {
  name: 'SelectTemplate',
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  data () {
    return {
      src: null,
      currentPage: 0,
      pageCount: 0,
      first_name: null,
      last_name: null,
      email: null,
      templateLists: [
        { name: 'Template 1', img: 'https://s3.resume.io/uploads/local_template_image/image/370/4940f3218b3f-0.jpg' },
        { name: 'Template 2', img: 'https://s3.resume.io/uploads/local_template_image/image/389/13c8b24d2950-0.jpg' },
        { name: 'Template 3', img: 'https://s3.resume.io/uploads/local_template_image/image/406/9ae3309eadcd-0.jpg' },
        { name: 'Template 4', img: 'https://s3.resume.io/uploads/local_template_image/image/441/f66fa998e20b-0.jpg' },
        { name: 'Template 5', img: 'https://s3.resume.io/uploads/local_template_image/image/481/533d164042a1-0.jpg' },
        { name: 'Template 6', img: 'https://s3.resume.io/uploads/local_template_image/image/488/e45b66b0a26c-0.jpg' },
        { name: 'Template 7', img: 'https://s3.resume.io/uploads/local_template_image/image/503/cbd4ebb3adcd-0.jpg' },
        { name: 'Template 8', img: 'https://s3.resume.io/uploads/local_template_image/image/160/0b9b714d9842-0.jpg' },
        { name: 'Template 9', img: 'https://s3.resume.io/uploads/local_template_image/image/511/eb9bc174923d-0.jpg' },
        { name: 'Template 10', img: 'https://s3.resume.io/uploads/local_template_image/image/504/71eefda42ffb-0.jpg' }
      ]
    }
  },
  mounted () {
    this.first_name = this.user.first_name
    this.last_name = this.user.last_name
    this.email = this.user.email
    this.logContent()
  },
  methods: {
    angleLeft () {
      if (this.currentPage > 1) {
        this.currentPage -= 1
      }
    },
    angleRight () {
      if (this.currentPage < this.pageCount) {
        this.currentPage += 1
      }
    },
    logContent: debounce(function () {
      this.src = this.$pdf.createLoadingTask(this.$base_api + `/resume/testing/${this.first_name}/${this.last_name}/${this.email}`)
      if (this.src) {
        this.src.promise.then((pdf) => {
          this.pageCount = pdf.numPages
          this.currentPage = 1
        })
      }
    }, 800)
  }
}
</script>

<style scoped lang="scss">
.section-body {
  max-height: 94.25vh;
  background-color: #262b33;
}
.template-list {
  width: 409px;
  flex-shrink: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
  &-content {
    overflow-y: auto;
    height: 100%;
    padding: 32px 32px 18px;
  }
}

.template-preview {
  position: relative;
  flex-grow: 1;
  min-width: 0;
  overflow: auto;
}

.template-item {
  width: calc(50% - 12px);
  margin-bottom: 20px;
  cursor: pointer;
}

.template-name {
  color: rgb(255, 255, 255);
  margin-bottom: 4px;
  text-align: center;
}

.template-item-show {
  position: relative;
  width: 100%;
  height: 225px;
  border-radius: 3px;
  background-color: rgb(255, 255, 255);
  background-size: cover;
}
</style>
