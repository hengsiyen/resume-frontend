<template>
  <div class="change-avatar">
    <a
      class="btn btn-link"
      style="color: white"
      @click="toggleShow"
    >
      <i class="fas fa-camera" /><br>
      <small class="label-upload">Upload</small>
    </a>
    <my-upload
      v-model="show"
      field="avatar"
      :width="200"
      :height="200"
      :lang-type="langType"
      :lang-ext="localeExt"
      :url="`${$base_api}/api/frontend/candidate/upload-avatar`"
      :params="params"
      :headers="headers"
      img-format="png"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
    />
  </div>
</template>

<script>
import 'babel-polyfill'
import myUpload from 'vue-image-crop-upload'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UploadAvatar',
  components: {
    'my-upload': myUpload
  },
  data () {
    return {
      show: false,
      params: {
        user_id: null,
        name: 'avatar'
      },
      headers: null,
      imgDataUrl: '',
      enn: {
        hint: 'Click or drag the file here to upload!',
        loading: 'Uploading…',
        noSupported: 'Browser is not supported, please use IE10+ or other browsers',
        success: 'Upload success',
        fail: 'Upload failed',
        preview: 'Preview',
        btn: {
          off: 'Cancel',
          close: 'Close',
          back: 'Back',
          save: 'Save'
        },
        error: {
          onlyImg: 'Image only',
          outOfSize: 'Image exceeds size limit: ',
          lowestPx: 'Image\'s size is too low. Expected at least: '
        }
      },
      km: {
        hint: 'ចុចឬអូសឯកសារនៅទីនេះដើម្បីផ្ទុកឡើង',
        loading: 'កំពុងផ្ទុកឡើង ...',
        noSupported: 'កម្មវិធីរុករកមិនត្រូវបានគាំទ្រសូមប្រើ IE10 + ឬកម្មវិធីរុករកផ្សេងទៀត',
        success: 'អាប់ឡូតជោគជ័យ',
        fail: 'ផ្ទុកឡើងបានបរាជ័យ',
        preview: 'មើលជាមុន',
        btn: {
          off: 'បោះបង់',
          close: 'បិទ',
          back: 'ថយក្រោយ',
          save: 'រក្សាទុក'
        },
        error: {
          onlyImg: 'រូបភាពតែប៉ុណ្ណោះ',
          outOfSize: 'រូបភាពលើសពីដែនកំណត់ទំហំ: ',
          lowestPx: 'ទំហំរូបភាពគឺទាបពេក។ បានរំពឹងថាយ៉ាងហោចណាស់: '
        }
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.data
    }),
    langType () {
      return this.$i18n.locale
    },
    localeExt () {
      return this.$i18n.locale === 'km' ? this.km : this.en
    }
  },
  methods: {
    ...mapActions([
      'setUser'
    ]),
    toggleShow () {
      this.show = !this.show
    },
    cropSuccess (imgDataUrl, field) {
    },
    cropUploadSuccess (jsonData, field) {
      this.$store.dispatch('user/setUser', { user: jsonData.data })
    },
    cropUploadFail (status, field) {
    }
  },
  mounted () {
    this.headers = {
      Authorization: 'Bearer ' + localStorage.getItem(this.$token),
      Accept: 'application/json'
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 767px) {
  .label-upload {
    display: none;
  }
}
</style>
