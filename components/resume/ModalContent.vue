<template>
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
          :value="resume_url + link"
          style="pointer-events: unset"
        >
        <div class="line" />
      </div>
    </div>
    <div class="modal-footer no-border justify-content-between custom-padding">
      <template v-if="resume">
        <ShareNetwork
          network="facebook"
          class="share-social"
          :url="`${base_api}/r/${resume.link_code}`"
          :title="resume.name ? resume.name : 'Untitled'"
          description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
          hashtags="TalentPlus_Resume"
        >
          <i class="fab fa-facebook-f" />
        </ShareNetwork>
      </template>
      <div>
        <a
          href="javascript:void(0)"
          type="button"
          class="btn btn-link btn-lg font-weight-bold a-no-underline"
          @click="showResumeLink"
          data-dismiss="modal"
        >
          Open Link
        </a>
        <button
          v-clipboard:copy="resume_url + link"
          v-clipboard:success="onCopy"
          type="button"
          class="btn btn-primary btn-lg font-weight-bold"
        >
          {{ is_copy ? 'Copied!' :'Copy Link' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalContent',
  props: {
    link: {
      type: String,
      default: ''
    },
    resume: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {
      base_api: process.env.VUE_APP_BASE_URL
    }
  },
  methods: {
    // changeCopyLabel () {
    //   if (this.is_copy) {
    // this.$nextTick(() => {
    //   setTimeout(function () {
    //     this.is_copy = false
    //   }, 1000)
    // })
    //   }
    // },
    showResumeLink () {
      window.open(`${this.resume_url}${this.link}`, '_blank')
    }
  }
}
</script>

<style scoped>

</style>
