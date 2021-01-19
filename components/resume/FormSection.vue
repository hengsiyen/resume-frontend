<template>
  <div class="rf-section" v-if="sectionLabel">
    <div class="rf-section__title" :style="!(sectionLabel.sub_title) ? 'margin-bottom: 1.5rem;' : ''">
      <template v-if="editable">
        <div class="form-group mb-0 mr-2">
          <input v-model="section_title" type="text" class="resume-form-control ">
          <div class="line" />
        </div>
      </template>
      <template v-else>
        <div class="ellipsis mr-2">
          {{ sectionLabel.title }}
        </div>
      </template>
      <template v-if="hasEditButton">
        <template v-if="editable">
          <a
            href="javascript:void(0)"
            class="rf-section__confirm mr-2"
            @click="onConfirm"
          ><i class="fas fa-check-circle" /></a>
          <a
            href="javascript:void(0)"
            class="rf-section__cancel mr-2"
            @click="onCancel"
          ><i class="fas fa-times-circle" /></a>
        </template>
        <template v-else>
          <a
            href="javascript:void(0)"
            class="rf-section__edit mr-2"
            @click="onEdit"
          ><mdicon name="pencilOutline" /></a>
        </template>
      </template>
      <template v-if="hasDeleteButton && !editable">
        <a
          href="javascript:void(0)"
          class="rf-section__delete"
          @click="onDelete"
        ><mdicon name="deleteOutline" /></a>
      </template>

    </div>
    <div class="rf-section__sub-title" v-if="sectionLabel.sub_title">
      <div>
        {{ sectionLabel.sub_title }}
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import { dataOptions } from '~/mixins/dataOptions'

export default {
  name: 'FormSection',
  props: {
    draggable: {
      type: Boolean,
      default: false
    },
    hasDeleteButton: {
      type: Boolean,
      default: false
    },
    hasEditButton: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Untitled'
    },
    customTitle: {
      type: String,
      default: 'Untitled'
    },
    item: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {
      section_title: null,
      sectionsTitle: dataOptions.sectionOrdersSubTitle
    }
  },
  computed: {
    sectionLabel () {
      if (this.title === 'personal_details') {
        return this.sectionsTitle.personal_details
      } else if (this.title === 'summary') {
        return this.sectionsTitle.summary
      } else if (this.title === 'educations') {
        return this.sectionsTitle.educations
      } else if (this.title === 'workExperiences') {
        return this.sectionsTitle.workExperiences
      } else if (this.title === 'socialProfiles') {
        return this.sectionsTitle.socialProfiles
      } else if (this.title === 'skills') {
        return this.sectionsTitle.skills
      } else if (this.title === 'references') {
        return this.sectionsTitle.references
      } else if (this.title === 'courses') {
        return this.sectionsTitle.courses
      } else if (this.title === 'langs') {
        return this.sectionsTitle.langs
      } else if (this.title === 'hobbies') {
        return this.sectionsTitle.hobbies
      } else if (this.title === 'activities') {
        return this.sectionsTitle.activities
      } else if (this.title === 'internships') {
        return this.sectionsTitle.internships
      } else if (this.title === 'custom') {
        return {
          title: this.customTitle ? this.customTitle : 'Untitled',
          sub_title: null
        }
      } else {
        return {
          title: this.title,
          sub_title: null
        }
      }
    }
  },
  mounted () {
    if (this.title === 'custom') {
      this.section_title = this.customTitle
    } else {
      this.section_title = this.title
    }
  },
  methods: {
    onDelete () {
      this.$emit('onDelete')
    },

    onEdit () {
      this.$emit('onEdit')
    },

    onConfirm () {
      if (this.item) {
        this.item.title = this.section_title
      }
      this.$emit('onConfirm')
    },

    onCancel () {
      this.section_title = this.title
      this.$emit('onCancel')
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/resume.scss";
</style>
