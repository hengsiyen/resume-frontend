<template>
  <!-- ======= Header ======= -->
  <div style="height: 100vh;">
    <div
      class="container-fluid d-flex align-items-center justify-content-between nav-container bg-dark nav-container-h"
    >
      <!-- Uncomment below if you prefer to use an image logo -->
      <div class="btn-select-template d-none d-md-flex align-items-center justify-content-center">
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
      <div class="d-flex d-md-none">
        <a
          href="javascript:void(0)"
          @click="show_template_list = !show_template_list"
          class="btn-select-template-label"
        >
          <i class="fas fa-sliders-h" />
        </a>
      </div>
      <div>
        <button class="btn sm btn-primary font-weight-bold" @click="downloadResume($route.params.uuid)">
          Download PDF
        </button>
        <button
          id="dropdownMenuButton"
          class="btn sm btn-primary font-weight-bold dropdown-toggle no-icon"
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
            data-target="#shareLinkTemplate"
          >
            <i class="fas fa-link" /> Share a link
          </button>
        </div>
      </div>
      <div class="d-flex d-md-none">
        <NuxtLink
          :to="{name: 'resume-uuid-edit', params: {uuid: $route.params.uuid}}"
          class="btn-select-template-label"
        >
          <i class="fas fa-times" />
        </NuxtLink>
      </div>
    </div>
    <div class="d-flex section-body">
      <div class="template-list" :class="{'show': show_template_list}">
        <div class="template-list-content">
          <div class="d-flex flex-wrap justify-content-between">
            <template v-for="(item, k) in templateLists">
              <div :key="k" class="template-item">
                <div class="template-name">
                  {{ item.name_en }}
                </div>
                <a href="javascript:void(0)" class="position-relative d-block" @click="selectTemplate(item.id)">
                  <div
                    class="template-item-show"
                    :class="{'template-item-show-selected': item.id === selected_id}"
                    :style="`background-image: url('${$base_api}/${item.image}')`"
                  />
                  <div :class="{'selected': item.id === selected_id}">
                    <i class="fas fa-check" v-if="item.id === selected_id"></i>
                  </div>
                </a>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="template-preview d-block">
        <div class="d-flex justify-content-center resume__preview-container w-100 mx-auto">
          <template v-if="pageCount > 0">
            <pdf
              v-for="(i, k) in pageCount"
              :key="k"
              ref="viewPdfTemplate"
              class="position-absolute d-inline-block pdf"
              :src="src"
              :page="currentPage"
            />
          </template>
        </div>
        <div class="link_page">
          <button
            class="btn angle-l text-white"
            :class="currentPage === 1 ? 'deactive' : ''"
            @click="angleLeft"
          >
            <i class="fas fa-chevron-left" />
          </button>
          <div class="page_count">
            {{ currentPage }} / {{ pageCount }}
          </div>
          <button
            class="btn angle-r text-white"
            :class="currentPage === pageCount ? 'deactive' : ''"
            @click="angleRight"
          >
            <i class="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </div>
    <!--      model share resume-->
    <div
      id="shareLinkTemplate"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="shareLinkTemplate"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" v-if="fetchDataResume">
        <ModalContent :link="fetchDataResume.link_code" :resume="fetchDataResume" />
      </div>
    </div>
  </div>
  <!-- End Header -->
</template>

<script>

import { debounce } from 'debounce'
import { mapState } from 'vuex'
import ModalContent from '@/components/resume/ModalContent'

export default {
  name: 'SelectTemplate',
  components: { ModalContent },
  layout: 'secondary',
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
      fetchDataResume: null,
      templateLists: [],
      selected_id: null,
      show_template_list: false
    }
  },
  created () {
    if (!this.$store.state.user.authenticated) {
      this.$router.push({
        name: 'index',
        replace: true
      })
    }
  },
  beforeMount () {
    this.$axios.post(this.$base_api + '/api/frontend/resume/show', {
      uuid: this.$route.params.uuid
    }).then((res) => {
      this.fetchDataResume = res.data.data
      this.selectTemplate(this.fetchDataResume.resume_template_id, true)
    })
  },
  mounted () {
    this.first_name = this.user.first_name
    this.last_name = this.user.last_name
    this.email = this.user.email
    this.logContent()
    this.getResumeTemplates()
  },
  methods: {
    selectTemplate (template_id, fetchData = false) {
      this.selected_id = template_id
      if (!fetchData) {
        this.$isLoading(true)
        this.$axios
          .post(this.$base_api + '/api/frontend/resume/select-resume-template', {
            tid: template_id,
            resume_uuid: this.$route.params.uuid
          })
          .then((res) => {
            this.logContent()
          })
          .catch((error) => {
            this.onResponseError(error)
            this.$isLoading(false)
          })
      }
    },
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
      this.src = this.$pdf.createLoadingTask(this.$base_api + `/resume/preview-resume/${this.$route.params.uuid}`)
      if (this.src) {
        this.src.promise.then((pdf) => {
          this.pageCount = pdf.numPages
          this.currentPage = 1
          this.$isLoading(false)
        }).catch((err) => {
          console.log(err)
          this.$isLoading(false)
        })
      }
    }, 1000),
    getResumeTemplates () {
      this.$axios
        .post(this.$base_api + '/api/frontend/resume-template/get-option-for-resume')
        .then((res) => {
          this.templateLists = res.data.data
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/elements/default";
.section-body {
  height: 94vh;
  background-color: #4f5259;
}
.nav-container-h {
  height: 6vh;
}
.template-list {
  width: 610px;
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
  width: 100%;
  height: 100%;
  padding: 34px 0 42px;
  overflow-y: auto;
}

.template-item {
  width: calc(50% - 12px);
  margin-bottom: 20px;
  cursor: pointer;
}

.template-name {
  color: white;
  margin-bottom: 4px;
  text-align: center;
}

.template-item-show {
  position: relative;
  width: 100%;
  border-radius: 3px;
  background-color: white;
  background-size: cover;
  background-repeat: no-repeat;
}

.template-item-show:before {
  content: "";
  display: block;
  padding-bottom: 140.845%;
}

.resume__preview-container {
  position: relative;
  height: 1313px;
}

.pdf {
  width: 928px;
  background: white;
  border: 3px solid white;
  border-radius: 6px;
  height: 1313px;
}

.link_page {
  display: flex;
  align-items: center;
  position: fixed !important;
  background: var(--dark);
  bottom: 3%;
  left: 60%;
  transform: translate(40%, 0);
  font-size: 20px;
  color: white;
  border-radius: 30px;
  & button:active,
  & button:focus {
    box-shadow: unset;
  }
}

.deactive {
  color: #a9a9a9 !important;
  cursor: alias !important;
}
.selected {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 50%;
  top: 50%;
  margin-left: -20px;
  margin-top: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $resume-blue;
  color: white;
  border-radius: 50%;
  opacity: 1;
}

.template-item-show-selected:after {
  content: "";
  position: absolute;
  inset: -4px;
  border-width: 4px;
  border-style: solid;
  border-color: $resume-blue;
  border-radius: 7px;
  opacity: 1;
  transition: opacity 0.15s ease 0s;
}

@media screen and (max-width: 1555px) {
  .template-list {
    width: 325px;
  }
  .template-item {
    width: 100%;
  }

  .link_page {
    left: 50%;
    transform: translate(50%, 0);
  }
}

@media screen and (max-width: 1354px) {
  .resume__preview-container {
    height: auto;
  }
  .pdf {
    width: 85%;
    height: auto;
  }

  .resume__preview-container {
    height: 800px;
  }
}

@media screen and (max-width: 991.98px) {
  .template-list {
    width: 240px;
  }

  .template-list-content {
    height: 92.5vh;
    padding: 32px 16px 18px;
  }
  .link_page {
    left: 50%;
    transform: translate(-50%, 0);
  }
}

@media screen and (max-width: 767px) {
  .nav-container {
    padding: 5px 16px;
  }
}

@media screen and (max-width: 576px) {
  .section-body {
    height: 93vh;
  }
  .nav-container-h {
    height: 7vh;
  }

  .template-preview {
    overflow-y: hidden;
  }
  .resume__preview-container {
    height: 450px;
  }
  .btn.sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
  }

  .template-list {
    display: block;
    left: -325px;
    position: absolute;
    opacity: 0;
    transition: opacity .2s ease-in;

    &.show {
      left: 0;
      opacity: 1;
      transition: opacity .2s ease-out;
      width: 100%;
      z-index: 1;
      background: #4f5259;
    }
  }
  .template-item {
    width: 48%;
  }
}
</style>
