<template>
  <div id="resume-editor" v-if="user_resume">
    <div class="resume-container d-flex">
      <div class="resume__left-block">
        <div class="resume__form">
          <div class="form__content">
            <div class="rf-padding position-relative">
              <div class="rf-title">
                <template v-if="editable_title">
                  <div class="form-group mb-0 mr-2">
                    <input
                      v-model="user_resume.name"
                      type="text"
                      class="resume-form-control"
                    >
                    <div class="line" />
                  </div>
                  <a
                    href="javascript:void(0)"
                    class="rf-section__confirm-lg mr-2"
                    @click="confirmResumeName"
                  ><i class="fas fa-check-circle" /></a>
                </template>
                <template v-else>
                  <span class="mr-1">{{ user_resume.name ? user_resume.name : 'Untitled' }}</span>
                  <a
                    href="javascript:void(0)"
                    class="rf-section__edit hover"
                    @click="editable_title = true"
                  ><i class="fas fa-pencil-alt" /></a>
                </template>
              </div>
              <FormSection title="Personal Details">
                <PersonalDetailForm
                  :item="user_resume"
                  :data-position="positions"
                  :data-country="countries"
                  :data-province="provinces"
                  :data-nationality="nationalities"
                  :resume-position="resumePosition"
                  :resume-country="resumeCountry"
                  :resume-province="resumeProvince"
                  :resume-nationality="resumeNationality"
                  @refreshResume="refreshResume"
                />
              </FormSection>
              <FormSection
                title="Professional Summary"
                sub-title="Include 2-3 clear sentences about your overall experience"
              >
                <client-only>
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group mb-0">
                        <quill-editor
                          ref="editor"
                          v-model="user_resume.profile"
                          :class="{'editor': show_line}"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @change="updateDataResume"
                        />
                        <div class="ql-editor-line" />
                      </div>
                    </div>
                  </div>
                </client-only>
              </FormSection>
              <draggable v-model="user_resume.sections_order" draggable=".item">
                <template v-for="(element, key) in user_resume.sections_order">
                  <div :key="key" class="item">
                    <template v-if="element === 'educations'">
                      <FormSection
                        :draggable="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                      >
                        <template v-for="(item, edu_key) in user_resume.educations">
                          <ItemCollapse
                            :key="edu_key"
                            :item="item"
                            :active-tab="false"
                            :has-sub-title="true"
                            @onDelete="removeSectionItem(user_resume.educations, item)"
                          >
                            <EducationForm
                              :item="item"
                              :data-provinces="provinces"
                              :data-degree="degrees"
                              @refreshResume="refreshResume"
                            />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(user_resume.educations, element)"
                        >
                          <i class="fas fa-plus mr-2" />
                          <span>Add item</span>
                        </a>
                      </FormSection>
                    </template>
                    <template v-if="element === 'workExperiences'">
                      <FormSection
                        :draggable="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                      >
                        <template v-for="(item, emp_key) in user_resume.work_experiences">
                          <ItemCollapse
                            :key="emp_key"
                            :item="item"
                            :active-tab="false"
                            :has-sub-title="true"
                            @onDelete="removeSectionItem(user_resume.work_experiences, item)"
                          >
                            <EmploymentForm
                              :item="item"
                              :data-provinces="provinces"
                              :data-positions="positions"
                              @refreshResume="refreshResume"
                            />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(user_resume.work_experiences, element)"
                        >
                          <i class="fas fa-plus mr-2" />
                          <span>Add item</span>
                        </a>
                      </FormSection>
                    </template>
                    <template v-if="element === 'skills'">
                      <FormSection
                        :draggable="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                      >
                        <template v-for="(item, skill_key) in user_resume.skills">
                          <ItemCollapse
                            :key="skill_key"
                            :item="item"
                            :active-tab="false"
                            :has-sub-title="true"
                            @onDelete="removeSectionItem(user_resume.skills, item)"
                          >
                            <SkillForm :item="item" @refreshResume="refreshResume" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(user_resume.skills, element)"
                        >
                          <i class="fas fa-plus mr-2" />
                          <span>Add item</span>
                        </a>
                      </FormSection>
                    </template>
                    <template v-if="element === 'socialProfiles'">
                      <FormSection
                        :draggable="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                      >
                        <template v-for="(item, soc_key) in user_resume.social_profiles">
                          <ItemCollapse
                            :key="soc_key"
                            :item="item"
                            :active-tab="false"
                            :has-sub-title="true"
                            @onDelete="removeSectionItem(user_resume.social_profiles, item)"
                          >
                            <SocialProfileForm :item="item" @refreshResume="refreshResume" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(user_resume.social_profiles, element)"
                        >
                          <i class="fas fa-plus mr-2" />
                          <span>Add item</span>
                        </a>
                      </FormSection>
                    </template>
                    <template v-if="element === 'courses'">
                      <FormSection
                        :draggable="true"
                        :has-delete-button="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                        @onDelete="removeSection(element)"
                      >
                        <template v-for="(item, course_key) in user_resume.courses">
                          <ItemCollapse
                            :key="course_key"
                            :item="item"
                            :active-tab="false"
                            :has-sub-title="true"
                            @onDelete="removeSectionItem(user_resume.courses, item)"
                          >
                            <CourseForm :item="item" @refreshResume="refreshResume" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(user_resume.courses, element)"
                        >
                          <i class="fas fa-plus mr-2" />
                          <span>Add item</span>
                        </a>
                      </FormSection>
                    </template>
                    <template v-if="element === 'internships'">
                      <FormSection
                        :draggable="true"
                        :has-delete-button="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                        @onDelete="removeSection(element)"
                      >
                        <template v-for="(item, intern_key) in user_resume.internships">
                          <ItemCollapse
                            :key="intern_key"
                            :item="item"
                            :active-tab="false"
                            :has-sub-title="true"
                            @onDelete="removeSectionItem(user_resume.internships, item)"
                          >
                            <InternshipForm
                              :item="item"
                              :data-provinces="provinces"
                              :data-positions="positions"
                              @refreshResume="refreshResume"
                            />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(user_resume.internships, element)"
                        >
                          <i class="fas fa-plus mr-2" />
                          <span>Add item</span>
                        </a>
                      </FormSection>
                    </template>
                    <template v-if="element === 'langs'">
                      <FormSection
                        :draggable="true"
                        :has-delete-button="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                        @onDelete="removeSection(element)"
                      >
                        <template v-for="(item, lang_key) in user_resume.langs">
                          <ItemCollapse
                            :key="lang_key"
                            :item="item"
                            :has-sub-title="true"
                            :active-tab="false"
                            @onDelete="removeSectionItem(user_resume.lang, item)"
                          >
                            <LanguageForm :item="item" @refreshResume="refreshResume" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(user_resume.langs, element)"
                        >
                          <i class="fas fa-plus mr-2" />
                          <span>Add item</span>
                        </a>
                      </FormSection>
                    </template>
                    <template v-if="element === 'activities'">
                      <FormSection
                        :draggable="true"
                        :has-delete-button="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                        @onDelete="removeSection(element)"
                      >
                        <template v-for="(item, act_key) in user_resume.activities">
                          <ItemCollapse
                            :key="act_key"
                            :item="item"
                            :has-sub-title="true"
                            :active-tab="false"
                            @onDelete="removeSectionItem(user_resume.activities, item)"
                          >
                            <ActivityForm :item="item" :data-provinces="provinces" @refreshResume="refreshResume" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(user_resume.activities, element)"
                        >
                          <i class="fas fa-plus mr-2" />
                          <span>Add item</span>
                        </a>
                      </FormSection>
                    </template>
                    <template v-if="element === 'hobbies'">
                      <FormSection
                        :draggable="true"
                        :has-delete-button="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                        @onDelete="removeSection(element)"
                      >
                        <HobbyForm :item="user_resume.hobbies" @refreshResume="refreshResume" />
                      </FormSection>
                    </template>
                    <template v-if="element === 'references'">
                      <FormSection
                        :draggable="true"
                        :has-delete-button="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                        @onDelete="removeSection(element)"
                      >
                        <template v-for="(item, ref_key) in user_resume.references">
                          <ItemCollapse
                            :key="ref_key"
                            :item="item"
                            :active-tab="false"
                            :has-sub-title="true"
                            @onDelete="removeSectionItem(user_resume.references, item)"
                          >
                            <ReferenceForm :item="item" @refreshResume="refreshResume" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(user_resume.references, element)"
                        >
                          <i class="fas fa-plus mr-2" />
                          <span>Add item</span>
                        </a>
                      </FormSection>
                    </template>
                    <template v-for="(customSection, custom_key) in user_resume.custom_sections">
                      <template v-if="customSection && element === 'custom:' + customSection.external_id">
                        <FormSection
                          :key="custom_key"
                          :draggable="true"
                          :has-delete-button="true"
                          :has-edit-button="true"
                          :editable="customSection.editable"
                          :item="customSection"
                          :title="customSection.title ? customSection.title : 'Untitled'"
                          @onDelete="removeSection(element)"
                          @onEdit="editableCustomSection(customSection, true, true, false)"
                          @onConfirm="editableCustomSection(customSection, true, false, true)"
                          @onCancel="editableCustomSection(customSection, true, false, false)"
                        >
                          <template v-if="customSection.items && customSection.items.length">
                            <template v-for="(item, item_key) in customSection.items">
                              <ItemCollapse
                                v-if="item"
                                :key="item_key"
                                :item="item"
                                :active-tab="false"
                                :has-sub-title="true"
                                @onDelete="removeSectionItem(customSection.items, item)"
                              >
                                <CustomSectionForm
                                  :item="item"
                                  :data-provinces="provinces"
                                  @refreshResume="refreshResume"
                                />
                              </ItemCollapse>
                            </template>
                          </template>
                          <a
                            href="javascript:void(0)"
                            class="btn-add-item"
                            @click="addSectionItem(customSection.items, 'custom')"
                          >
                            <i class="fas fa-plus mr-2" />
                            <span>Add item</span>
                          </a>
                        </FormSection>
                      </template>
                    </template>
                  </div>
                </template>
              </draggable>
              <FormSection title="Add Section">
                <div class="list-section">
                  <template v-for="(item, key) in addSections">
                    <a
                      :key="key"
                      href="javascript:void(0)"
                      class="list-section-item"
                      :class="{'active': checkSectionActive(user_resume.sections_order, item.value)}"
                      @click="addSection(item)"
                    >
                      <div>
                        <i class="fas fa-question-circle fa-2x mr-2" />
                        {{ item.name_en }}
                      </div>
                    </a>
                  </template>
                  <a
                    href="javascript:void(0)"
                    class="list-section-item"
                    @click="addCustomSection"
                  >
                    <div>
                      <i class="fas fa-question-circle fa-2x mr-2" />
                      Custom Section
                    </div>
                  </a>
                </div>
              </FormSection>
            </div>
            <div class="d-flex align-items-center justify-content-center pb-2">
              <span class="mr-1 text-muted">Copyright © 2020 by {{ app_name }}. Powered by</span>
              <a href="http://asorasoft.com/" class="text-muted"> Asorasoft</a>
            </div>
          </div>
        </div>
      </div>
      <div class="resume__preview">
        <NuxtLink
          :to="{name: apiBack}"
          class="resume-cancel position-absolute d-flex align-items-center justify-content-center"
        >
          <i class="fas fa-times" />
        </NuxtLink>
        <div class="top_pdf">
          <button class="btn angle-l" @click="angleLeft">
            <i class="fas fa-angle-left" />
          </button>
          <div class="page_count">
            {{ currentPage }} / {{ pageCount }}
          </div>
          <button class="btn angle-r" @click="angleRight">
            <i class="fas fa-angle-right" />
          </button>
        </div>
        <div class="resume__preview-container">
          <div class="viewer-content position-relative">
            <div class="resume__viewer-canvas">
              <template v-if="pageCount > 0">
                <pdf
                  v-for="(i, k) in pageCount"
                  :key="k"
                  ref="myPdfComponent"
                  class="show_pdf"
                  :src="resume_pdf_src"
                  :page="currentPage"
                />
              </template>
            </div>
          </div>
        </div>
        <div
          class="resume__preview-footer position-absolute d-flex align-items-center justify-content-between"
        >
          <span class="btn-select-template d-flex align-items-center justify-content-center">
            <div class="btn-select-template-icon d-flex align-items-center justify-content-center">
              <i class="fas fa-th-large" />
            </div>
            <NuxtLink
              :to="{name: 'resume-uuid-select-template', params: {uuid: $route.params.uuid}}"
              class="btn-select-template-label"
            >
              Select template
            </NuxtLink>
          </span>
          <div>
            <button class="btn bnt-lg btn-primary font-weight-bold" @click="downloadResume(user_resume.uuid)">
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
              class="dropdown-menu custom-position dropdown-menu-right"
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
        <ModalContent :link="user_resume.link_code" />
      </div>
    </div>
  </div>
</template>
<script>

import { dataOptions } from '@/mixins/dataOptions'
import FormSection from '@/components/resume/FormSection'
import draggable from 'vuedraggable'
import EducationForm from '@/components/resume/EducationForm'
import EmploymentForm from '@/components/resume/EmploymentForm'
import ItemCollapse from '@/components/resume/ItemCollapse'
import SocialProfileForm from '@/components/resume/SocialProfileForm'
import ReferenceForm from '@/components/resume/ReferenceForm'
import InternshipForm from '@/components/resume/InternshipForm'
import LanguageForm from '@/components/resume/LanguageForm'
import CourseForm from '@/components/resume/CourseForm'
import HobbyForm from '@/components/resume/HobbyForm'
import SkillForm from '@/components/resume/SkillForm'
import ActivityForm from '@/components/resume/ActivityForm'
import CustomSectionForm from '@/components/resume/CustomSectionForm'
import ModalContent from '@/components/resume/ModalContent'
import { debounce } from 'debounce'
import PersonalDetailForm from '@/components/resume/PersonalDetailForm'

export default {
  name: 'Edit',
  layout: 'secondary',
  components: {
    PersonalDetailForm,
    ModalContent,
    FormSection,
    draggable,
    EducationForm,
    CustomSectionForm,
    ActivityForm,
    SkillForm,
    HobbyForm,
    CourseForm,
    LanguageForm,
    InternshipForm,
    ReferenceForm,
    SocialProfileForm,
    ItemCollapse,
    EmploymentForm
  },
  asyncData (ctx) {
    return ctx.$axios.post(ctx.env.VUE_APP_API + '/api/frontend/resume/show', {
      uuid: ctx.params.uuid
    }).then((res) => {
      return {
        fetchDataResume: res.data.data
      }
    })
  },
  data () {
    return {
      show_pdf: false,
      app_name: process.env.VUE_APP_NAME,
      editable_title: false,
      show_line: false,
      sectionOrdersSubTitle: dataOptions.sectionOrdersSubTitle,
      editorOption: dataOptions.editorOption,
      addSections: dataOptions.addSections,
      positions: [],
      nationalities: [],
      countries: [],
      degrees: [],
      show_pdf_0: true,
      show_pdf_1: false
    }
  },
  computed: {
    apiBack () {
      if (this.$store.state.user.authenticated) {
        return 'user-dashboard'
      } else {
        return 'index'
      }
    },
    resumePosition () {
      if (this.user_resume.position) {
        return this.user_resume.position
      }
      return null
    },
    resumeProvince () {
      if (this.user_resume.province) {
        return this.user_resume.province
      }
      return null
    },
    resumeNationality () {
      if (this.user_resume.nationality) {
        return this.user_resume.nationality
      }
      return null
    },
    resumeCountry () {
      if (this.user_resume.country) {
        return this.user_resume.country
      }
      return null
    }
  },
  created () {
    this.user_resume = this.fetchDataResume
  },
  mounted () {
    this.getProvinces()
    this.getPosition()
    this.getNationality()
    this.getCountry()
    this.getDegree()
  },
  methods: {
    confirmResumeName () {
      this.editable_title = false
      this.updateDataResume()
    },
    updateDataResume () {
      this.refreshResume()
    },
    addCustomSection () {
      const newCustomSection = {
        external_id: this.makeExternalId(8),
        title: '',
        editable: false,
        items: []
      }
      this.addSectionItem(newCustomSection.items, 'custom')
      this.user_resume.custom_sections.push(newCustomSection)
      this.user_resume.sections_order.push('custom:' + newCustomSection.external_id)
    },
    editableCustomSection (item, isCustom = false, isEdit = false, isRefresh = false) {
      if (isCustom) {
        item.editable = isEdit
        if (isRefresh) {
          this.refreshResume()
        }
      }
    },
    addSection (item) {
      if (item) {
        if (!this.user_resume.sections_order.includes(item.value)) {
          this.user_resume.sections_order.push(item.value)
        }
      }
    },
    removeSectionItem (model, item) {
      if (Array.isArray(model)) {
        if (model.includes(item)) {
          const self = this
          self.$swal({
            title: 'Delete Entry',
            text: 'Are you sure you want to delete this entry?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#FF4C4C',
            cancelButtonColor: '#909090'
          }).then((result) => {
            if (result.value) {
              const index = model.indexOf(item)
              if (index > -1) {
                model.splice(index, 1)
              }
            }
          })
        }
      }
    },
    removeSection (item) {
      if (this.user_resume.sections_order.includes(item)) {
        const self = this
        self.$swal({
          title: 'Delete Section',
          text: 'Are you sure you want to delete this section?',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#FF4C4C',
          cancelButtonColor: '#909090'
        }).then((result) => {
          if (result.value) {
            const index = this.user_resume.sections_order.indexOf(item)
            if (index > -1) {
              this.user_resume.sections_order.splice(index, 1)
            }
          }
        })
      }
    },
    checkSectionActive (array, key = '') {
      if (array && array.length > 0) {
        return array.includes(key)
      }
      return false
    },
    onEditorBlur (editor) {
      this.show_line = false
    },
    onEditorFocus (editor) {
      this.show_line = true
    },
    getDegree () {
      this.$axios
        .get(this.$base_api + '/api/frontend/degree/get-option')
        .then((res) => {
          this.degrees = res.data.data
        })
    },
    getPosition () {
      this.$axios
        .get(this.$base_api + '/api/frontend/position/get-option')
        .then((res) => {
          this.positions = res.data.data
        })
    },
    getNationality () {
      this.$axios
        .get(this.$base_api + '/api/frontend/nationality/get-option')
        .then((res) => {
          this.nationalities = res.data.data
        })
    },
    getCountry () {
      this.$axios
        .get(this.$base_api + '/api/frontend/country/get-option')
        .then((res) => {
          this.countries = res.data.data
        })
    },

    refreshResume: debounce(function () {
      this.$axios
        .post(this.$base_api + '/api/frontend/resume/store', this.user_resume)
        .then((res) => {
          this.user_resume = res.data.data
          this.logContent()
        }).catch((error) => {
          this.onResponseError(error)
        })
    }, 2000),

    logContent: debounce(function () {
      this.resume_pdf_src = this.$pdf.createLoadingTask(this.$base_api + `/resume/preview-resume/${this.user_resume.uuid}`, {
        responseType: 'blob'
      })
      if (this.resume_pdf_src) {
        this.resume_pdf_src.promise.then((pdf) => {
          this.pageCount = pdf.numPages
          this.currentPage = 1
        })
      }
    }, 500)

  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/resume.scss";

.pdf_1 {
  transform: scale(1);
  transform-origin: left top;
  opacity: 1;
  transition: none 0s ease 0s;
}

.pdf_0 {
  transform: scale(1);
  transform-origin: left top;
  opacity: 0;
  transition: opacity 0.2s ease 0s;
}
</style>
