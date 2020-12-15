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
          {{ is_copy ? 'Copied!' :'Copy Link' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalContent'
}
</script>

<style scoped>

</style>
