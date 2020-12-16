<template>
  <div id="resume-editor">
    <div class="resume-container d-flex">
      <div class="resume__left-block">
        <div class="resume__form">
          <div class="form__content">
            <div class="rf-padding position-relative">
              <div class="rf-title">
                <template v-if="editable_title">
                  <div class="form-group mb-0 mr-2">
                    <input
                      v-model="resume.name"
                      type="text"
                      class="resume-form-control"
                      @input="updateDataResume"
                    >
                    <div class="line" />
                  </div>
                  <a
                    href="javascript:void(0)"
                    class="rf-section__confirm-lg mr-2"
                    @click="editable_title = false"
                  ><i class="fas fa-check-circle" /></a>
                </template>
                <template v-else>
                  <span class="mr-1">{{ resume.name }}</span>
                  <a
                    href="javascript:void(0)"
                    class="rf-section__edit hover"
                    @click="editable_title = true"
                  ><i class="fas fa-pencil-alt" /></a>
                </template>
              </div>
              <FormSection title="Personal Details">
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label for="wantJob" class="resume-label-control">Want Job Title</label>
                      <input
                        id="wantJob"
                        v-model="resume.position"
                        type="text"
                        class="resume-form-control"
                        @input="updateDataResume"
                      >
                      <div class="line" />
                    </div>
                  </div>
                  <div class="col-12 col-sm-6 d-flex align-items-center">
                    <div class="form-group mb-0 w-100">
                      <UploadAvatar />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label for="firstName" class="resume-label-control">First Name</label>
                      <input
                        id="firstName"
                        v-model="resume.first_name"
                        type="text"
                        class="resume-form-control"
                        @input="updateDataResume"
                      >
                      <div class="line" />
                    </div>
                  </div>
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label for="lastName" class="resume-label-control">Last Name</label>
                      <input
                        id="lastName"
                        v-model="resume.last_name"
                        type="text"
                        class="resume-form-control"
                        @input="updateDataResume"
                      >
                      <div class="line" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label for="email" class="resume-label-control">Email</label>
                      <input
                        id="email"
                        v-model="resume.email"
                        type="email"
                        class="resume-form-control"
                        @input="updateDataResume"
                      >
                      <div class="line" />
                    </div>
                  </div>
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label for="phone" class="resume-label-control">Phone</label>
                      <input
                        id="phone"
                        v-model="resume.phone"
                        type="text"
                        class="resume-form-control"
                        @input="updateDataResume"
                      >
                      <div class="line" />
                    </div>
                  </div>
                </div>
                <div id="showAdditionalDetail" class="collapse">
                  <div class="row">
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="country" class="resume-label-control">Country</label>
                        <input
                          id="country"
                          v-model="resume.country"
                          type="text"
                          class="resume-form-control"
                          @input="updateDataResume"
                        >
                        <div class="line" />
                      </div>
                    </div>
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label class="resume-label-control">City / Province</label>
                        <autocomplete
                          :search="search"
                          :default-value="resumeProvince"
                          aria-label="Search city / province"
                          :get-result-value="getProvinceResultValue"
                          @update="updateProvince"
                          @submit="submitProvince"
                        >
                          <template #result="{ result, props }">
                            <li v-bind="props">
                              <div class="wiki-title">
                                {{ result.name_en }}
                              </div>
                            </li>
                          </template>
                        </autocomplete>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="address" class="resume-label-control">Address</label>
                        <input
                          id="address"
                          v-model="resume.address"
                          type="text"
                          class="resume-form-control"
                          @input="updateDataResume"
                        >
                        <div class="line" />
                      </div>
                    </div>
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="postalCode" class="resume-label-control">Postal Code</label>
                        <input
                          id="postalCode"
                          v-model="resume.postal_code"
                          type="text"
                          class="resume-form-control"
                          @input="updateDataResume"
                        >
                        <div class="line" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="drivingLicense" class="resume-label-control">Driving License</label>
                        <input id="drivingLicense" v-model="resume.driving_license" type="text" class="resume-form-control" @input="updateDataResume">
                        <div class="line" />
                      </div>
                    </div>
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="nationality" class="resume-label-control">Nationality</label>
                        <input id="nationality" v-model="resume.nationality" type="text" class="resume-form-control" @input="updateDataResume">
                        <div class="line" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="pob" class="resume-label-control">Place Of Birth</label>
                        <input
                          id="pob"
                          v-model="resume.pod"
                          type="text"
                          class="resume-form-control"
                          @input="updateDataResume"
                        >
                        <div class="line" />
                      </div>
                    </div>
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="dob" class="resume-label-control">Date Of Birth</label>
                        <datepicker
                          id="dob"
                          v-model="resume.dob"
                          placeholder="dd / MM / YYYY"
                          :format="dateForm"
                          input-class="resume_date_picker"
                          calendar-class="resume_calendar"
                          :initial-view="'year'"
                          @input="updateDataResume"
                          @closed="selectedBirthDate"
                        />
                        <div class="line" />
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  class="btn-link underline-none font-weight-bold"
                  data-toggle="collapse"
                  href="#showAdditionalDetail"
                  role="button"
                  aria-expanded="false"
                  aria-controls="showAdditionalDetail"
                  @click="showAdditionalDetail = !showAdditionalDetail"
                >
                  Edit additional details
                  <i
                    class="fas d-inline-block"
                    :class="showAdditionalDetail ? 'fa-angle-up' : 'fa-angle-down'"
                    style="vertical-align: middle"
                  />
                </a>
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
                          v-model="resume.profile"
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
              <draggable v-model="resume.sections_order" draggable=".item">
                <template v-for="(element, key) in resume.sections_order">
                  <div
                    :key="key"
                    class="item"
                  >
                    <template v-if="element === 'educations'">
                      <FormSection
                        :draggable="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                      >
                        <template v-for="(item, edu_key) in resume.educations">
                          <ItemCollapse
                            :key="edu_key"
                            :item="item"
                            :active-tab="false"
                            :has-sub-title="true"
                            @onDelete="removeSectionItem(resume.educations, item)"
                          >
                            <EducationForm :item="item" :data-provinces="provinces" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(resume.educations, element)"
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
                        <template v-for="(item, emp_key) in resume.work_experiences">
                          <ItemCollapse
                            :key="emp_key"
                            :item="item"
                            :active-tab="false"
                            :has-sub-title="true"
                            @onDelete="removeSectionItem(resume.work_experiences, item)"
                          >
                            <EmploymentForm :item="item" :data-provinces="provinces" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(resume.work_experiences, element)"
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
                        <template v-for="(item, skill_key) in resume.skills">
                          <ItemCollapse
                            :key="skill_key"
                            :item="item"
                            :active-tab="false"
                            :has-sub-title="true"
                            @onDelete="removeSectionItem(resume.skills, item)"
                          >
                            <SkillForm :item="item" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(resume.skills, element)"
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
                        <template v-for="(item, soc_key) in resume.social_profiles">
                          <ItemCollapse
                            :key="soc_key"
                            :item="item"
                            :active-tab="false"
                            :has-sub-title="true"
                            @onDelete="removeSectionItem(resume.social_profiles, item)"
                          >
                            <SocialProfileForm :item="item" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(resume.social_profiles, element)"
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
                        <template v-for="(item, course_key) in resume.courses">
                          <ItemCollapse
                            :key="course_key"
                            :item="item"
                            :active-tab="false"
                            :has-sub-title="true"
                            @onDelete="removeSectionItem(resume.courses, item)"
                          >
                            <CourseForm :item="item" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(resume.courses, element)"
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
                        <template v-for="(item, intern_key) in resume.internships">
                          <ItemCollapse
                            :key="intern_key"
                            :item="item"
                            :active-tab="false"
                            :has-sub-title="true"
                            @onDelete="removeSectionItem(resume.internships, item)"
                          >
                            <InternshipForm :item="item" :data-provinces="provinces" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(resume.internships, element)"
                        >
                          <i class="fas fa-plus mr-2" />
                          <span>Add item</span>
                        </a>
                      </FormSection>
                    </template>
                    <template v-if="element === 'languages'">
                      <FormSection
                        :draggable="true"
                        :has-delete-button="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                        @onDelete="removeSection(element)"
                      >
                        <template v-for="(item, lang_key) in resume.languages">
                          <ItemCollapse
                            :key="lang_key"
                            :item="item"
                            :has-sub-title="true"
                            :active-tab="false"
                            @onDelete="removeSectionItem(resume.languages, item)"
                          >
                            <LanguageForm :item="item" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(resume.languages, element)"
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
                        <template v-for="(item, act_key) in resume.activities">
                          <ItemCollapse
                            :key="act_key"
                            :item="item"
                            :has-sub-title="true"
                            :active-tab="false"
                            @onDelete="removeSectionItem(resume.activities, item)"
                          >
                            <ActivityForm :item="item" :data-provinces="provinces" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(resume.activities, element)"
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
                        <HobbyForm :item="resume.hobbies[0]" />
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
                        <template v-for="(item, ref_key) in resume.references">
                          <ItemCollapse
                            :key="ref_key"
                            :item="item"
                            :active-tab="false"
                            :has-sub-title="true"
                            @onDelete="removeSectionItem(resume.references, item)"
                          >
                            <ReferenceForm :item="item" />
                          </ItemCollapse>
                        </template>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addSectionItem(resume.references, element)"
                        >
                          <i class="fas fa-plus mr-2" />
                          <span>Add item</span>
                        </a>
                      </FormSection>
                    </template>
                    <template v-for="(customSection, custom_key) in resume.custom_sections">
                      <template v-if="customSection && element === 'custom:' + customSection.externalId">
                        <FormSection
                          :key="custom_key"
                          :draggable="true"
                          :has-delete-button="true"
                          :has-edit-button="true"
                          :editable="customSection.editable"
                          :item="customSection"
                          :title="customSection.title ? customSection.title : 'Untitled'"
                          @onDelete="removeSection(element)"
                          @onEdit="editableCustomSection(customSection, true, true)"
                          @onConfirm="editableCustomSection(customSection, true, false)"
                          @onCancel="editableCustomSection(customSection, true, false)"
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
                                <CustomSectionForm :item="item" />
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
                      :class="{'active': checkSectionActive(resume.sections_order, item.value)}"
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
              <span class="mr-1 text-muted">Copyright © 2020 by {{ app_name }}. Power by</span>
              <a href="http://asorasoft.com/" class="text-muted"> Asorasoft</a>
            </div>
          </div>
        </div>
      </div>
      <div class="resume__preview">
        <NuxtLink
          :to="{name: 'index'}"
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
            <button class="btn bnt-lg btn-primary font-weight-bold">
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
        <ModalContent />
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
import { mapState } from 'vuex'
import UploadAvatar from '@/components/UploadAvatar'
import ModalContent from '@/components/resume/ModalContent'
import resume from '@/mixins/resume'

export default {
  name: 'Edit',
  layout: 'secondary',
  components: {
    ModalContent,
    UploadAvatar,
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
  data () {
    return {
      dateForm: 'dd MMM, yyyy',
      show_pdf: false,
      app_name: process.env.VUE_APP_NAME,
      editable_title: false,
      show_line: false,
      showAdditionalDetail: false,
      sectionOrdersSubTitle: dataOptions.sectionOrdersSubTitle,
      editorOption: dataOptions.editorOption,
      addSections: dataOptions.addSections
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    }),
    resumeProvince () {
      return resume.province
    }
  },
  mounted () {
    this.getProvinces()
    this.resume.first_name = this.user.first_name
    this.resume.last_name = this.user.last_name
    this.resume.email = this.user.email
    this.logContent()
  },
  methods: {
    updateDataResume () {
      this.refreshResume()
    },
    addCustomSection () {
      const newCustomSection = {
        externalId: this.makeExternalId(8),
        title: '',
        editable: false,
        items: []
      }
      this.addSectionItem(newCustomSection.items, 'custom')
      this.resume.custom_sections.push(newCustomSection)
      this.resume.sections_order.push('custom:' + newCustomSection.externalId)
    },
    editableCustomSection (item, isCustom = false, isEdit = false) {
      if (isCustom) {
        item.editable = isEdit
      }
    },
    addSection (item) {
      if (item) {
        if (!this.resume.sections_order.includes(item.value)) {
          this.resume.sections_order.push(item.value)
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
      if (this.resume.sections_order.includes(item)) {
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
            const index = this.sectionsOrder.indexOf(item)
            if (index > -1) {
              this.sectionsOrder.splice(index, 1)
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
    selectedBirthDate () {
      this.resume.dob = this.convertDateFormat(this.resume.dob, 'YYYY-MM-DD')
    },
    search (input) {
      this.resume.province = input
      this.refreshResume()
      if (input < 1) {
        return []
      }
      return this.provinces.filter((province) => {
        return province.name_en.toLowerCase().startsWith(input.toLowerCase())
      })
    },
    getProvinceResultValue (result) {
      return result.name_en
    },
    updateProvince (results, selectedIndex) {
      if (selectedIndex > -1) {
        if (results[selectedIndex]) {
          this.resume.province = results[selectedIndex].name_en
        }
      }
    },
    submitProvince (result) {
      if (result) {
        this.resume.province = result.name_en
        this.refreshResume()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/resume.scss";
</style>
