<template>
  <div class="dashboard-content dashboard-content-h">
    <div class="section-container">
      <div class="section-wrapper">
        <div class="sect-title">
          Dashboard
        </div>
        <div class="position-relative block-tabs">
          <div class="position-relative d-flex tabs">
            <div class="tabs-item">
              Resume
            </div>
            <div class="tabs-resume" />
          </div>
          <a
            href="javascript:void(0)"
            class="btn btn-primary btn-create-new font-weight-bold"
            @click="createNewResume"
          >
            <span class="mdi mdi-plus mdi-18 mdi-middle" style="margin-right: 5px"></span>
            Create New Resume
          </a>
        </div>
        <div class="w-100 flex-wrap">
          <div class="position-relative">
            <template v-if="onLoading">
              <div class="d-flex align-items-center justify-content-center on-loading">
                <span class="mdi mdi-rotate-right mdi-spin mdi-28 mdi-middle mr-2"></span>
                <p class="mb-0">
                  Loading resumes...
                </p>
              </div>
            </template>
            <template v-else>
              <template v-if="resume_lists.length > 0">
                <template v-for="(item, key) in resume_lists">
                  <div :key="key" class="each-resume">
                    <div class="mr-3 mr-sm-4">
                      <a href="javascript:void(0)" @click="editResume(item)">
                        <template v-if="item.thumbnail">
                          <div class="resume-thumbnail" :style="`background-image: url('${$base_api}/${item.thumbnail}')`" />
                        </template>
                        <template v-else>
                          <div
                            class="resume-thumbnail"
                          />
                        </template>
                      </a>
                    </div>
                    <div class="w-100" style="max-width: 226px;">
                      <div class="resume-title ellipsis">
                        <div>
                          <a href="javascript:void(0)" @click="editResume(item)">
                            {{ item.name ? item.name : 'Untitled' }}
                          </a>
                        </div>
                      </div>
                      <div class="d-flex align-items-center mb-3">
                        <div class="resume-updated">
                          Updated {{ $moment(item.updated_at).locale('en').format('DD MMMM, hh:mm') }}
                        </div>
                      </div>
                      <NuxtLink :to="{name: 'resume-uuid-edit', params: {uuid: item.uuid}}">
                        <div class="resume-action">
                          <div class="icon">
                            <span class="mdi mdi-pencil-outline mdi-24 mdi-middle"></span>
                          </div>
                          Edit
                        </div>
                      </NuxtLink>
                      <a href="javascript:void(0)" @click="copyResume(item.uuid)">
                        <div class="resume-action">
                          <div class="icon">
                            <span class="mdi mdi-checkbox-multiple-blank-outline mdi-rotate-180 mdi-24 mdi-middle"></span>
                          </div>
                          Make a copy
                        </div>
                      </a>
                      <a href="javascript:void(0)" @click="downloadResume(item.uuid)">
                        <div class="resume-action">
                          <div class="icon">
                            <span class="mdi mdi-arrow-down-bold-outline mdi-24 mdi-middle"></span>
                          </div>
                          Download PDF
                        </div>
                      </a>
                      <a
                        href="javascript:void(0)"
                        data-toggle="modal"
                        data-target="#shareLinkDashboard"
                        @click="shareLink(item)"
                      >
                        <div class="resume-action">
                          <div class="icon">
                            <span class="mdi mdi-link mdi-24 mdi-middle"></span>
                          </div>
                          Share Link
                        </div>
                      </a>
                      <div class="dropdown">
                        <a
                          href="javascript:void(0)"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          class="dropdown-toggle"
                        >
                          <span class="resume-action-dropdown">
                            <span class="icon">
                              <span class="mdi mdi-dots-horizontal mdi-24 mdi-middle"></span>
                            </span>
                            More
                          </span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <button
                            class="dropdown-item"
                            type="button"
                            @click="regenerateLink(item)"
                          >
                            <span class="mdi mdi-cached mdi-24 mdi-middle"></span>
                            Regenerate Link
                          </button>
                          <button
                            class="dropdown-item"
                            type="button"
                            @click="deleteResume(item)"
                          >
                            <span class="mdi mdi-delete-outline mdi-24 mdi-middle"></span>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="d-flex align-items-center justify-content-center">
                  <div class="show_no_data">
                    <img src="/img/choose_us.png" alt="dashboard" width="100%">
                    <p class="title">
                      <strong>Your shining professional image</strong>
                    </p>
                    <p class="sub-title mb-4">
                      Custom-built, amazing resumes. Empower your job search in just a few clicks!
                    </p>
                    <button class="btn btn-primary" @click="createNewResume">
                      <span class="mdi mdi-plus mdi-18 mdi-middle" style="margin-right: 5px"></span>
                      New Resume
                    </button>
                  </div>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
      <div
        id="shareLinkDashboard"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="shareLinkDashboard"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <ModalContent :link="item_link_code" :resume="active_item" />
        </div>
      </div>
    </div>
    <SmallFooter />
  </div>
</template>

<script>
import ModalContent from '@/components/resume/ModalContent'
import { dataOptions } from '@/mixins/dataOptions'
import { mapState } from 'vuex'
import SmallFooter from '~/components/section/SmallFooter'

export default {
  name: 'Dashboard',
  layout: 'default',
  components: { SmallFooter, ModalContent },
  computed: {
    ...mapState({
      logged_user: state => state.user.user
    })
  },
  data () {
    return {
      resume_lists: [],
      user: {
        user_id: null,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        sections_order: dataOptions.sectionOrders,
        resume_type_name: dataOptions.resume_type_name,
        resume_template_name: dataOptions.resume_template_name
      },
      onLoading: true
    }
  },
  created () {
    if (this.$store.state.user.authenticated) {
      this.$router.push({
        name: 'user-dashboard',
        replace: true
      })
    } else {
      this.$router.push({
        name: 'index',
        replace: true
      })
    }
  },
  mounted () {
    if (this.$store.state.user.authenticated) {
      this.listResume()
    }
  },
  methods: {
    listResume () {
      let last_visited = null
      if (process.client && localStorage.hasOwnProperty('last_visited')) {
        last_visited = localStorage.getItem('last_visited')
      }
      this.$axios
        .post(this.$base_api + '/api/frontend/resume/list', {
          last_visited_resume: last_visited
        })
        .then((res) => {
          this.resume_lists = res.data.data
        })
        .finally(() => {
          this.onLoading = false
          this.$isLoading(false)
        })
    },
    editResume (item) {
      this.$isLoading(true)
      setTimeout(() => {
        if (!this.$store.state.user.authenticated) {
          this.$router.push({
            name: 'index',
            replace: true
          })
          this.$isLoading(false)
        } else {
          this.$router.push({ name: 'resume-uuid-edit', params: { uuid: item.uuid } })
          this.$isLoading(false)
        }
      }, 2500)
    },
    deleteResume (item) {
      if (this.resume_lists.includes(item)) {
        const self = this
        self.$swal({
          title: 'Delete Resume',
          text: 'Are you sure you want to delete this resume?\nOnce deleted this resume cannot be restored.',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#FF4C4C',
          cancelButtonColor: '#909090'
        }).then((result) => {
          if (result.value) {
            this.$isLoading(true)
            this.$axios
              .post(this.$base_api + '/api/frontend/resume/delete', {
                uuid: item.uuid
              })
              .then((res) => {
                this.listResume()
              })
              .catch((error) => {
                this.onResponseError(error)
                this.$isLoading(false)
              })
          }
        })
      }
    },
    regenerateLink (item) {
      if (this.resume_lists.includes(item)) {
        const self = this
        self.$swal({
          title: 'Regenerate Resume Link',
          text: 'Are you sure you want to regenerate link for this resume?\n' +
            'The previous link that you shared no longer can be open with this resume.',
          showCancelButton: true,
          confirmButtonText: 'Regenerate',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#FF4C4C',
          cancelButtonColor: '#909090'
        }).then((result) => {
          if (result.value) {
            this.$isLoading(true)
            this.$axios
              .post(this.$base_api + '/api/frontend/resume/regenerate-link', {
                uuid: item.uuid
              })
              .then((res) => {
                this.listResume()
              })
              .catch((error) => {
                this.onResponseError(error)
                this.$isLoading(false)
              })
          }
        })
      }
    },
    copyResume (uuid) {
      this.$isLoading(true)
      this.$axios
        .post(this.$base_api + '/api/frontend/resume/copy-resume', {
          uuid
        })
        .then((res) => {
          this.listResume()
        })
        .catch((error) => {
          this.onResponseError(error)
          this.$isLoading(false)
        })
    },
    createNewResume () {
      this.$isLoading(true)
      let choose_template = this.$store.state.user.choose_template
      if (!choose_template) {
        if (localStorage.hasOwnProperty('template')) {
          choose_template = localStorage.getItem('template')
        } else {
          choose_template = dataOptions.resume_template_name
        }
      }
      this.user.user_id = this.logged_user.id
      this.user.first_name = this.logged_user.first_name
      this.user.last_name = this.logged_user.last_name
      this.user.email = this.logged_user.email
      this.user.phone = this.logged_user.phone
      this.user.resume_template_name = choose_template
      this.user.hide_refs = false
      this.user.hide_social = false
      this.user.spacing = '0'
      this.$axios
        .post(this.$base_api + '/api/frontend/resume/store', this.user)
        .then((res) => {
          const data = res.data.data
          this.$isLoading(false)
          this.$router.push({
            name: 'resume-uuid-edit',
            params: { uuid: data.uuid }
          })
        }).catch((error) => {
          this.onResponseError(error)
          this.$isLoading(false)
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/user.scss";
.dashboard-content-h {
  min-height: 93vh;
}
</style>
