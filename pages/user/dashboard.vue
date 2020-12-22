<template>
  <div class="section-container">
    <div class="section-wrapper">
      <div class="sect-title">
        Dashboard
      </div>
      <div class="position-relative" style="margin-bottom: 40px">
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
          <i class="fas fa-plus" style="margin-right: 10px" /> Create New Resume
        </a>
      </div>
      <div class="w-100 flex-wrap">
        <div class="position-relative">
          <template v-for="(item, key) in resume_lists">
            <div :key="key" class="each-resume">
              <div style="margin-right: 30px">
                <NuxtLink :to="{name: 'resume-uuid-edit', params: {uuid: item.uuid}}">
                  <template v-if="item.img">
                    <div class="resume-thumbnail" :style="`background-image: url('${item.img}')`" />
                  </template>
                  <template v-else>
                    <div
                      class="resume-thumbnail"
                      style="background-image: url('https://s3.resume.io/uploads/local_template_image/image/389/13c8b24d2950-0.jpg')"
                    />
                  </template>
                </NuxtLink>
              </div>
              <div class="w-100" style="max-width: 226px;">
                <div class="resume-title ellipsis">
                  <div>
                    <NuxtLink :to="{name: 'resume-uuid-edit', params: {uuid: item.uuid}}">
                      {{ item.name ? item.name : 'Untitled' }}
                    </NuxtLink>
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-center mb-3">
                  <div class="resume-updated">
                    Updated {{ $moment(item.updated_at).locale('en').format('DD MMMM, hh:mm') }}
                  </div>
                </div>
                <NuxtLink :to="{name: 'resume-uuid-edit', params: {uuid: item.uuid}}">
                  <div class="resume-action">
                    <div class="icon">
                      <i class="fas fa-pencil-alt" />
                    </div>
                    Edit
                  </div>
                </NuxtLink>
                <a href="javascript:void(0)">
                  <div class="resume-action">
                    <div class="icon">
                      <i class="fas fa-clone" />
                    </div>
                    Make a copy
                  </div>
                </a>
                <a href="javascript:void(0)" @click="downloadResume(item.uuid)">
                  <div class="resume-action">
                    <div class="icon">
                      <i class="fas fa-download" />
                    </div>
                    Download PDF
                  </div>
                </a>
                <a
                  href="javascript:void(0)"
                  type="button"
                  data-toggle="modal"
                  data-target="#shareLink"
                  @click="shareLink(item.link_code)"
                >
                  <div class="resume-action">
                    <div class="icon">
                      <i class="fas fa-link" />
                    </div>
                    Share Link
                  </div>
                </a>
                <a href="javascript:void(0)" @click="deleteResume(item)">
                  <div class="resume-action">
                    <div class="icon">
                      <i class="fas fa-trash-alt" />
                    </div>
                    Delete
                  </div>
                </a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div
      id="shareLink"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="shareLink"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <ModalContent :link="item_link_code" />
      </div>
    </div>
  </div>
</template>

<script>
import ModalContent from '@/components/resume/ModalContent'
import { dataOptions } from '@/mixins/dataOptions'
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  layout: 'default',
  components: { ModalContent },
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
        sections_order: dataOptions.sectionOrders,
        resume_type_name: dataOptions.resume_type_name,
        resume_template_name: dataOptions.resume_template_name
      }
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
    this.listResume()
  },
  methods: {
    listResume () {
      this.$axios
        .post(this.$base_api + '/api/frontend/resume/list')
        .then((res) => {
          this.resume_lists = res.data.data
        })
    },
    deleteResume (item) {
      if (this.resume_lists.includes(item)) {
        const self = this
        self.$swal({
          title: 'Delete Resume',
          text: 'Are you sure you want to delete this resume? Once deleted this resume cannot be restored.',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#FF4C4C',
          cancelButtonColor: '#909090'
        }).then((result) => {
          if (result.value) {
            this.$axios
              .post(this.$base_api + '/api/frontend/resume/delete', {
                uuid: item.uuid
              })
              .then((res) => {
                this.listResume()
              })
              .catch((error) => {
                this.onResponseError(error)
              })
          }
        })
      }
    },
    createNewResume () {
      this.user.user_id = this.logged_user.id
      this.user.first_name = this.logged_user.first_name
      this.user.last_name = this.logged_user.last_name
      this.user.email = this.logged_user.email
      this.$axios
        .post(this.$base_api + '/api/frontend/resume/store', this.user)
        .then((res) => {
          const data = res.data.data
          this.$router.push({
            name: 'resume-uuid-edit',
            params: { uuid: data.uuid }
          })
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/elements/default";
@import "~assets/scss/user";
</style>
