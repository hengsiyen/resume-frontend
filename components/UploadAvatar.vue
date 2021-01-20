<template>
  <div class="change-avatar">
    <template v-if="imgDataUrl">
      <div class="d-flex upload-field">
        <div class="upload-icon" :style="`background-image: url('${checkImageUrl(imgDataUrl)}')`" />
        <div class="upload-label">
          <a
            class="d-flex align-items-center edit-photo"
            href="javascript:void(0)"
            @click="toggleShow"
          >
            <!--            <mdicon name="pencilOutline" />-->
            Edit Photo
          </a>
          <a
            class="d-flex align-items-center remove-photo"
            href="javascript:void(0)"
            @click="removePhoto"
          >
            <!--            <div><mdicon name="deleteOutline" /></div>-->
            Remove
          </a>
        </div>
      </div>
    </template>
    <template v-else>
      <a
        href="javascript:void(0)"
        class="upload-field"
        @click="toggleShow"
      >
        <div class="d-flex">
          <div class="upload-icon">
            <!--            <mdicon name="account" class="w-100 h-100 text-center" :size="45" />-->
          </div>
          <div class="upload-label">
            <label class="label-text">Upload Photo</label>
          </div>
        </div>
      </a>
    </template>
    <avatar
      v-model="show"
      field="avatar"
      :width="200"
      :height="200"
      :lang-type="'en'"
      :lang-ext="en"
      :url="`${base_api}/api/frontend/resume/upload-avatar`"
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
export default {
  name: 'UploadAvatar',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      show: false,
      base_api: this.$base_api,
      params: {
        ruuid: null,
        name: 'avatar'
      },
      headers: null,
      imgDataUrl: null,
      en: {
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
  mounted () {
    this.params = {
      ruuid: this.item.uuid,
      name: 'avatar'
    }
    if (this.item.avatar) {
      this.imgDataUrl = this.item.avatar.src
    }
    this.headers = {
      Authorization: 'Bearer ' + localStorage.getItem(process.env.VUE_APP_TOKEN),
      Accept: 'application/json'
    }
  },
  methods: {
    callMethod () {
      this.$emit('callMethod')
    },
    toggleShow () {
      this.show = !this.show
    },
    cropSuccess (imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl
    },
    cropUploadSuccess (jsonData, field) {
      this.imgDataUrl = jsonData.data.src
      this.callMethod()
    },
    cropUploadFail (status, field) {
    },

    removePhoto () {
      const self = this
      self.$swal({
        title: 'Remove Phonr',
        text: 'Are you sure you want to remove this photo?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#FF4C4C',
        cancelButtonColor: '#909090'
      }).then((result) => {
        if (result.value) {
          this.$axios
            .post(this.$base_api + '/api/frontend/resume/delete-avatar', {
              ruuid: this.params.ruuid
            })
            .then((res) => {
              this.imgDataUrl = res.data.data
              this.callMethod()
            })
            .catch((error) => {
              this.onResponseError(error)
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/elements/default";
.upload-field {
  & .upload-icon {
    flex: 0 0 60px;
    width: 60px;
    height: 60px;
    border-radius: 3px;
    margin-right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background-color: $bg-color-gray;
    background-size: cover;
    background-repeat: no-repeat;
    color: rgb(207, 214, 230);
    font-size: xx-large;
    transition: background-color 0.1s ease 0s, color 0.1s ease 0s;
  }
  &:hover {
    cursor: pointer;
    & .upload-icon {
      background-color: rgb(230, 244, 255);
      color: $resume-blue;
    }

    & .upload-label .label-text {
      color: $resume-blue;
    }
  }

  & .upload-label {
    display: flex;
    flex-flow: column nowrap;
    -webkit-box-pack: center;
    justify-content: center;
    & .label-text {
      margin-bottom: 0;
      font-size: 16px;
      line-height: 20px;
      color: $resume-blue;
      transition: color 0.1s ease 0s
    }
  }
}

.remove-photo,
.edit-photo {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  transition: color 0.1s ease 0s;
  color: $resume-gray;
  padding: 2px 0;
  cursor: pointer;
  font-size: 16px;
  line-height: 1.5;
  & div i {
    margin-right: 4px;
  }
}

.edit-photo:hover {
  color: $resume-blue;
}

.remove-photo:hover {
  color: $resume-red;
}
@media screen and (max-width: 767px) {
  .label-upload {
    display: none;
  }
}
</style>
