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
        <NuxtLink
          :to="{name: 'resume-uuid-edit', params: {uuid: '66856'}}"
          class="btn btn-primary btn-create-new font-weight-bold"
        >
          <i class="fas fa-plus" style="margin-right: 10px" /> Create New Resume
        </NuxtLink>
      </div>
      <div class="w-100 flex-wrap">
        <div class="position-relative">
          <template v-for="(item, key) in resume_lists">
            <div :key="key" class="each-resume">
              <div style="margin-right: 30px">
                <NuxtLink :to="{name: 'resume-uuid-edit', params: {uuid: item.uuid}}">
                  <div class="resume-thumbnail" :style="`background-image: url('${item.img}')`" />
                </NuxtLink>
              </div>
              <div class="w-100" style="max-width: 226px;">
                <div class="resume-title ellipsis">
                  <div>
                    <NuxtLink :to="{name: 'resume-uuid-edit', params: {uuid: item.uuid}}">
                      {{ item.name }}
                    </NuxtLink>
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-center mb-3">
                  <div class="resume-updated">
                    Updated {{ $moment(item.updated_at).locale('en').format('DD MMMM, hh:mm' ) }}
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
                <a href="javascript:void(0)">
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
        <ModalContent />
      </div>
    </div>
  </div>
</template>

<script>
import ModalContent from '@/components/resume/ModalContent'
export default {
  name: 'Dashboard',
  components: { ModalContent },
  layout: 'default',
  data () {
    return {
      resume_lists: [
        {
          uuid: '12342dhw-qui232-3o9',
          name: 'Template 1',
          img: 'https://s3.resume.io/uploads/local_template_image/image/370/4940f3218b3f-0.jpg',
          updated_at: '2020-12-06'
        },
        {
          uuid: '22342dhw-qui232-3o9',
          name: 'Template 2',
          img: 'https://s3.resume.io/uploads/local_template_image/image/389/13c8b24d2950-0.jpg',
          updated_at: '2020-12-06'
        },
        {
          uuid: '32342dhw-qui232-3o9',
          name: 'Template 3',
          img: 'https://s3.resume.io/uploads/local_template_image/image/406/9ae3309eadcd-0.jpg',
          updated_at: '2020-12-06'
        },
        {
          uuid: '42342dhw-qui232-3o9',
          name: 'Template 4',
          img: 'https://s3.resume.io/uploads/local_template_image/image/441/f66fa998e20b-0.jpg',
          updated_at: '2020-12-06'
        },
        {
          uuid: '52342dhw-qui232-3o9',
          name: 'Template 5',
          img: 'https://s3.resume.io/uploads/local_template_image/image/481/533d164042a1-0.jpg',
          updated_at: '2020-12-06'
        },
        {
          uuid: '62342dhw-qui232-3o9',
          name: 'Template 6',
          img: 'https://s3.resume.io/uploads/local_template_image/image/488/e45b66b0a26c-0.jpg',
          updated_at: '2020-12-06'
        },
        {
          uuid: '72342dhw-qui232-3o9',
          name: 'Template 7',
          img: 'https://s3.resume.io/uploads/local_template_image/image/503/cbd4ebb3adcd-0.jpg',
          updated_at: '2020-12-06'
        },
        {
          uuid: '82342dhw-qui232-3o9',
          name: 'Template 8',
          img: 'https://s3.resume.io/uploads/local_template_image/image/160/0b9b714d9842-0.jpg',
          updated_at: '2020-12-06'
        },
        {
          uuid: '92342dhw-qui232-3o9',
          name: 'Template 9',
          img: 'https://s3.resume.io/uploads/local_template_image/image/511/eb9bc174923d-0.jpg',
          updated_at: '2020-12-06'
        },
        {
          uuid: '102342dhw-qui232-3o9',
          name: 'Template 10',
          img: 'https://s3.resume.io/uploads/local_template_image/image/504/71eefda42ffb-0.jpg',
          updated_at: '2020-12-06'
        }
      ]
    }
  },
  methods: {
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
            const index = this.resume_lists.indexOf(item)
            if (index > -1) {
              this.resume_lists.splice(index, 1)
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/elements/default";
@import "~assets/scss/user";
</style>
