<template>
  <div id="resume-editor" v-if="user_resume">
    <div class="resume-container d-flex">
      <div class="resume__left-block scroll">
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
                      ref="resumeName"
                    >
                    <div class="line" />
                  </div>
                  <!--                  <a-->
                  <!--                    href="javascript:void(0)"-->
                  <!--                    class="rf-section__confirm-lg mr-2"-->
                  <!--                    @click="confirmResumeName"-->
                  <!--                  ><i class="fas fa-check-circle" /></a>-->
                </template>
                <template v-else>
                  <span class="mr-2 mr-sm-1">{{ user_resume.name ? user_resume.name : 'Untitled' }}</span>
                  <a
                    href="javascript:void(0)"
                    class="rf-section__edit hover"
                    @click="editTitle"
                  >
                    <!--                    <mdicon name="pencilOutline" />-->
                  </a>
                </template>
              </div>
              <FormSection title="personal_details">
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
              <FormSection title="summary">
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
              </FormSection>
              <draggable
                v-model="user_resume.sections_order"
                class="list-group"
                @update="refreshResume"
                handle=".handle"
              >
                <transition-group type="transition" name="flip-list">
                  <template v-for="(element, key) in user_resume.sections_order">
                    <div :key="key" class="item position-relative" v-if="key > 0">
                      <div
                        class="rf-section__draggable handle"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Click and drag to move"
                      >
                        <!--                        <mdicon name="dragVertical" :size="22" />-->
                      </div>
                      <template v-if="element === 'educations'">
                        <FormSection
                          :draggable="true"
                          :title="element"
                        >
                          <draggable
                            v-model="user_resume.educations"
                            class="list-group"
                            @update="refreshResume"
                          >
                            <transition-group type="transition" name="flip-list">
                              <template v-for="(item, edu_key) in user_resume.educations">
                                <ItemCollapse
                                  :key="edu_key"
                                  :item="item"
                                  :active-tab="activeTab(item)"
                                  :has-sub-title="true"
                                  @onDelete="removeSectionItem(user_resume.educations, item, element)"
                                >
                                  <EducationForm
                                    :item="item"
                                    :data-provinces="provinces"
                                    :data-degree="degrees"
                                    :data-country="countries"
                                    @refreshResume="refreshResume"
                                  />
                                </ItemCollapse>
                              </template>
                            </transition-group>
                          </draggable>
                          <a
                            href="javascript:void(0)"
                            class="btn-add-item"
                            @click="addSectionItem(user_resume.educations, element)"
                          >
                            <!--                            <mdicon name="plus" class="mr-2" :size="22" />-->
                            <span>Add education</span>
                          </a>
                        </FormSection>
                      </template>
                      <template v-else-if="element === 'workExperiences'">
                        <FormSection
                          :draggable="true"
                          :title="element"
                        >
                          <draggable
                            v-model="user_resume.work_experiences"
                            class="list-group"
                            @update="refreshResume"
                          >
                            <transition-group type="transition" name="flip-list">
                              <template v-for="(item, emp_key) in user_resume.work_experiences">
                                <ItemCollapse
                                  :key="emp_key"
                                  :item="item"
                                  :active-tab="activeTab(item)"
                                  :has-sub-title="true"
                                  @onDelete="removeSectionItem(user_resume.work_experiences, item, element)"
                                >
                                  <EmploymentForm
                                    :item="item"
                                    :data-provinces="provinces"
                                    :data-positions="positions"
                                    :data-country="countries"
                                    @refreshResume="refreshResume"
                                  />
                                </ItemCollapse>
                              </template>
                            </transition-group>
                          </draggable>
                          <a
                            href="javascript:void(0)"
                            class="btn-add-item"
                            @click="addSectionItem(user_resume.work_experiences, element)"
                          >
                            <!--                            <mdicon name="plus" class="mr-2" :size="22" />-->
                            <span>Add employment</span>
                          </a>
                        </FormSection>
                      </template>
                      <template v-else-if="element === 'skills'">
                        <FormSection
                          :draggable="true"
                          :title="element"
                        >
                          <div v-if="suggestionSkills" class="skills-suggestion mb-3">
                            <template v-for="(item, key) in suggestionSkills">
                              <a
                                href="javascript:void(0)"
                                class="skill-suggestion-item"
                                :key="key"
                                @click="addSuggestion(item)"
                              >
                                <span>{{ item }}</span>
                                <!--                                <mdicon name="plus" class="ski-item-icon" :size="16" />-->
                              </a>
                            </template>
                          </div>
                          <draggable
                            v-model="user_resume.skills"
                            class="list-group"
                            @update="refreshResume"
                          >
                            <transition-group type="transition" name="flip-list">
                              <template v-for="(item, skill_key) in user_resume.skills">
                                <ItemCollapse
                                  :key="skill_key"
                                  :item="item"
                                  :active-tab="activeTab(item)"
                                  :has-sub-title="true"
                                  @onDelete="removeSectionItem(user_resume.skills, item, element)"
                                >
                                  <SkillForm
                                    :item="item"
                                    :data-skills="autocompleteSkills"
                                    @refreshResume="refreshResume"
                                  />
                                </ItemCollapse>
                              </template>
                            </transition-group>
                          </draggable>
                          <a
                            href="javascript:void(0)"
                            class="btn-add-item"
                            @click="addSectionItem(user_resume.skills, element)"
                          >
                            <!--                            <mdicon name="plus" class="mr-2" :size="22" />-->
                            <span>Add skill</span>
                          </a>
                        </FormSection>
                      </template>
                      <template v-else-if="element === 'socialProfiles'">
                        <FormSection
                          :draggable="true"
                          :title="element"
                        >
                          <div class="mb-3">
                            <toggle-button
                              :value="user_resume.hide_social"
                              color="#2196f3"
                              :sync="true"
                              :width="35"
                              class="mb-0 mr-1"
                              id="toggleSocial"
                              @change="toggleSection('hide_social')"
                            />
                            <label for="toggleSocial" class="mb-0">I'd like to hide websites & social links</label>
                          </div>
                          <draggable
                            v-model="user_resume.social_profiles"
                            class="list-group"
                            @update="refreshResume"
                          >
                            <transition-group type="transition" name="flip-list">
                              <template v-for="(item, soc_key) in user_resume.social_profiles">
                                <ItemCollapse
                                  :key="soc_key"
                                  :item="item"
                                  :active-tab="activeTab(item)"
                                  :has-sub-title="true"
                                  @onDelete="removeSectionItem(user_resume.social_profiles, item, element)"
                                >
                                  <SocialProfileForm :item="item" @refreshResume="refreshResume" />
                                </ItemCollapse>
                              </template>
                            </transition-group>
                          </draggable>
                          <a
                            href="javascript:void(0)"
                            class="btn-add-item"
                            @click="addSectionItem(user_resume.social_profiles, element)"
                          >
                            <!--                            <mdicon name="plus" class="mr-2" :size="22" />-->
                            <span>Add social link</span>
                          </a>
                        </FormSection>
                      </template>
                      <template v-else-if="element === 'courses'">
                        <FormSection
                          :draggable="true"
                          :has-delete-button="true"
                          :title="element"
                          @onDelete="removeSection(element)"
                        >
                          <draggable
                            v-model="user_resume.courses"
                            class="list-group"
                            @update="refreshResume"
                          >
                            <transition-group type="transition" name="flip-list">
                              <template v-for="(item, course_key) in user_resume.courses">
                                <ItemCollapse
                                  :key="course_key"
                                  :item="item"
                                  :active-tab="activeTab(item)"
                                  :has-sub-title="true"
                                  @onDelete="removeSectionItem(user_resume.courses, item, element)"
                                >
                                  <CourseForm :item="item" @refreshResume="refreshResume" />
                                </ItemCollapse>
                              </template>
                            </transition-group>
                          </draggable>
                          <a
                            href="javascript:void(0)"
                            class="btn-add-item"
                            @click="addSectionItem(user_resume.courses, element)"
                          >
                            <!--                            <mdicon name="plus" class="mr-2" :size="22" />-->
                            <span>Add course</span>
                          </a>
                        </FormSection>
                      </template>
                      <template v-else-if="element === 'internships'">
                        <FormSection
                          :draggable="true"
                          :has-delete-button="true"
                          :title="element"
                          @onDelete="removeSection(element)"
                        >
                          <draggable
                            v-model="user_resume.internships"
                            class="list-group"
                            @update="refreshResume"
                          >
                            <transition-group type="transition" name="flip-list">
                              <template v-for="(item, intern_key) in user_resume.internships">
                                <ItemCollapse
                                  :key="intern_key"
                                  :item="item"
                                  :active-tab="activeTab(item)"
                                  :has-sub-title="true"
                                  @onDelete="removeSectionItem(user_resume.internships, item, element)"
                                >
                                  <InternshipForm
                                    :item="item"
                                    :data-provinces="provinces"
                                    :data-positions="positions"
                                    @refreshResume="refreshResume"
                                  />
                                </ItemCollapse>
                              </template>
                            </transition-group>
                          </draggable>
                          <a
                            href="javascript:void(0)"
                            class="btn-add-item"
                            @click="addSectionItem(user_resume.internships, element)"
                          >
                            <!--                            <mdicon name="plus" class="mr-2" :size="22" />-->
                            <span>Add internship</span>
                          </a>
                        </FormSection>
                      </template>
                      <template v-else-if="element === 'langs'">
                        <FormSection
                          :draggable="true"
                          :has-delete-button="true"
                          :title="element"
                          @onDelete="removeSection(element)"
                        >
                          <draggable
                            v-model="user_resume.langs"
                            class="list-group"
                            @update="refreshResume"
                          >
                            <transition-group type="transition" name="flip-list">
                              <template v-for="(item, lang_key) in user_resume.langs">
                                <ItemCollapse
                                  :key="lang_key"
                                  :item="item"
                                  :has-sub-title="true"
                                  :active-tab="activeTab(item)"
                                  @onDelete="removeSectionItem(user_resume.langs, item, element)"
                                >
                                  <LanguageForm :item="item" @refreshResume="refreshResume" />
                                </ItemCollapse>
                              </template>
                            </transition-group>
                          </draggable>
                          <a
                            href="javascript:void(0)"
                            class="btn-add-item"
                            @click="addSectionItem(user_resume.langs, element)"
                          >
                            <!--                            <mdicon name="plus" class="mr-2" :size="22" />-->
                            <span>Add language</span>
                          </a>
                        </FormSection>
                      </template>
                      <template v-else-if="element === 'activities'">
                        <FormSection
                          :draggable="true"
                          :has-delete-button="true"
                          :title="element"
                          @onDelete="removeSection(element)"
                        >
                          <draggable
                            v-model="user_resume.activities"
                            class="list-group"
                            @update="refreshResume"
                          >
                            <transition-group type="transition" name="flip-list">
                              <template v-for="(item, act_key) in user_resume.activities">
                                <ItemCollapse
                                  :key="act_key"
                                  :item="item"
                                  :has-sub-title="true"
                                  :active-tab="activeTab(item)"
                                  @onDelete="removeSectionItem(user_resume.activities, item, element)"
                                >
                                  <ActivityForm
                                    :item="item"
                                    :data-provinces="provinces"
                                    @refreshResume="refreshResume"
                                  />
                                </ItemCollapse>
                              </template>
                            </transition-group>
                          </draggable>
                          <a
                            href="javascript:void(0)"
                            class="btn-add-item"
                            @click="addSectionItem(user_resume.activities, element)"
                          >
                            <!--                            <mdicon name="plus" class="mr-2" :size="22" />-->
                            <span>Add Activity</span>
                          </a>
                        </FormSection>
                      </template>
                      <template v-else-if="element === 'hobbies'">
                        <FormSection
                          :draggable="true"
                          :has-delete-button="true"
                          :title="element"
                          @onDelete="removeSection(element)"
                        >
                          <HobbyForm :item="user_resume.hobbies" @refreshResume="refreshResume" />
                        </FormSection>
                      </template>
                      <template v-else-if="element === 'references'">
                        <FormSection
                          :draggable="true"
                          :has-delete-button="true"
                          :title="element"
                          @onDelete="removeSection(element)"
                        >
                          <div class="mb-3">
                            <toggle-button
                              :value="user_resume.hide_refs"
                              color="#2196f3"
                              :sync="true"
                              :width="35"
                              class="mb-0 mr-1"
                              @change="toggleSection('hide_refs')"
                              id="toggleRefs"
                            />
                            <label for="toggleRefs" class="mb-0">I'd like to hide references</label>
                          </div>
                          <draggable
                            v-model="user_resume.references"
                            class="list-group"
                            @update="refreshResume"
                          >
                            <transition-group type="transition" name="flip-list">
                              <template v-for="(item, ref_key) in user_resume.references">
                                <ItemCollapse
                                  :key="ref_key"
                                  :item="item"
                                  :active-tab="activeTab(item)"
                                  :has-sub-title="true"
                                  @onDelete="removeSectionItem(user_resume.references, item, element)"
                                >
                                  <ReferenceForm :item="item" @refreshResume="refreshResume" />
                                </ItemCollapse>
                              </template>
                            </transition-group>
                          </draggable>
                          <a
                            href="javascript:void(0)"
                            class="btn-add-item"
                            @click="addSectionItem(user_resume.references, element)"
                          >
                            <!--                            <mdicon name="plus" class="mr-2" :size="22" />-->
                            <span>Add reference</span>
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
                            title="custom"
                            :custom-title="customSection.title"
                            @onDelete="removeSection(element)"
                            @onEdit="editableCustomSection(customSection, true, true, false)"
                            @onConfirm="editableCustomSection(customSection, true, false, true)"
                            @onCancel="editableCustomSection(customSection, true, false, false)"
                          >
                            <template v-if="customSection.items && customSection.items.length">
                              <draggable
                                v-model="customSection.items"
                                class="list-group"
                                @update="refreshResume"
                              >
                                <transition-group type="transition" name="flip-list">
                                  <template v-for="(item, item_key) in customSection.items">
                                    <ItemCollapse
                                      v-if="item"
                                      :key="item_key"
                                      :item="item"
                                      :active-tab="activeTab(item)"
                                      :has-sub-title="true"
                                      @onDelete="removeSectionItem(customSection.items, item, element)"
                                    >
                                      <CustomSectionForm
                                        :item="item"
                                        :data-provinces="provinces"
                                        @refreshResume="refreshResume"
                                      />
                                    </ItemCollapse>
                                  </template>
                                </transition-group>
                              </draggable>
                            </template>
                            <a
                              href="javascript:void(0)"
                              class="btn-add-item"
                              @click="addSectionItem(customSection.items, 'custom')"
                            >
                              <!--                              <mdicon name="plus" class="mr-2" :size="22" />-->
                              <span>Add item</span>
                            </a>
                          </FormSection>
                        </template>
                      </template>
                    </div>
                  </template>
                </transition-group>
              </draggable>
              <FormSection title="Add Section">
                <div class="list-section">
                  <a
                    href="javascript:void(0)"
                    class="list-section-item"
                    @click="addCustomSection"
                  >
                    <div>
                      <i class="fas fa-sliders-h add-section-icon mr-2"></i>
                      Custom Section
                    </div>
                  </a>
                  <template v-for="(item, key) in addSections">
                    <a
                      :key="key"
                      href="javascript:void(0)"
                      class="list-section-item"
                      :class="{'active': checkSectionActive(user_resume.sections_order, item.value)}"
                      @click="addSection(item)"
                    >
                      <div>
                        <i class="add-section-icon mr-2" :class="item.icon" />
                        {{ item.name_en }}
                      </div>
                    </a>
                  </template>
                </div>
              </FormSection>
            </div>
            <SmallFooter />
          </div>
        </div>
      </div>
      <div class="resume__preview scroll">
        <div class="button-float button-float-sm position-absolute button-float-top-right">
          <NuxtLink
            :to="{name: apiBack}"
            class="btn-float btn-float-gray"
          >
            <!--            <mdicon name="windowClose" :size="18" class="pb-3px" />-->
          </NuxtLink>
        </div>
        <div class="top_pdf">
          <div class="resume-saved position-absolute d-flex align-items-center justify-content-center">
            <template v-if="in_progress">
              <!--              <mdicon name="rotateRight" :size="18" spin /> Saving...-->
            </template>
            <template v-else>
              <!--              <mdicon name="cloudCheck" :size="18" /> Saved-->
            </template>
          </div>
          <button class="btn angle-l" @click="angleLeft">
            <!--            <mdicon name="chevronLeft" />-->
          </button>
          <div class="page_count">
            <!--            {{ currentPage }} <mdicon name="slashForward" :size="18" /> {{ pageCount }}-->
          </div>
          <button class="btn angle-r" @click="angleRight">
            <!--            <mdicon name="chevronRight" />-->
          </button>
        </div>
        <div class="resume__preview-container">
          <div class="viewer-content position-relative">
            <div class="resume__viewer-canvas">
              <template v-if="pageCount > 0">
                <pdf
                  v-for="(i, k) in pageCount"
                  :key="k"
                  ref="viewPdfEdit"
                  class="show_pdf"
                  :src="resume_pdf_src"
                  :page="currentPage"
                />
              </template>
            </div>
          </div>
        </div>
        <div class="resume__preview-footer d-flex align-items-center justify-content-between">
          <span class="btn-select-template d-flex align-items-center justify-content-center">
            <div class="btn-select-template-icon d-flex align-items-center justify-content-center">
              <!--              <mdicon name="viewGridOutline" :size="22" />-->
            </div>
            <NuxtLink
              :to="{name: 'resume-uuid-select-template', params: {uuid: $route.params.uuid}}"
              class="btn-select-template-label"
            >
              Select template
            </NuxtLink>
          </span>
          <div>
            <button class="btn btn-primary font-weight-bold" @click="downloadResume(user_resume.uuid)">
              Download PDF
            </button>
            <button
              id="dropdownMenuButton"
              class="btn btn-primary font-weight-bold dropdown-toggle no-icon"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <!--              <mdicon name="dotsHorizontal" />-->
            </button>
            <div
              class="dropdown-menu custom-position-5 dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
            >
              <button
                class="dropdown-item"
                type="button"
                data-toggle="modal"
                data-target="#shareLinkEdit"
              >
                <!--                <mdicon name="link" /> Share a link-->
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button-float button-float-sm position-absolute button-float-top-right show-button-preview">
      <NuxtLink
        :to="{name: apiBack}"
        class="btn-float btn-float-gray"
      >
        <!--        <mdicon name="windowClose" :size="18" class="pb-3px" />-->
      </NuxtLink>
    </div>
    <div class="button-float button-float-lg button-float-bottom-right show-button-preview">
      <NuxtLink
        :to="{name: 'resume-uuid-select-template', params: {uuid: $route.params.uuid}}"
        class="btn-float"
      >
        <i
          class="fas fa-file-alt w-100 h-100 d-flex align-items-center justify-content-center"
          style="font-size: 24px"
        ></i>
      </NuxtLink>
    </div>
    <!--      model share resume-->
    <div
      id="shareLinkEdit"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="shareLinkEdit"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <ModalContent :link="user_resume.link_code" :resume="user_resume" />
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
import SmallFooter from '~/components/section/SmallFooter'

export default {
  name: 'Edit',
  layout: 'secondary',
  components: {
    SmallFooter,
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
      show_pdf: true,
      app_name: process.env.VUE_APP_NAME,
      editable_title: false,
      show_line: false,
      editorOption: dataOptions.editorOption,
      addSections: dataOptions.addSections,
      in_progress: 0,
      old_pdf: null,
      old_pdf_class: 'hiddenpdf',
      pdf_class: 'showpdf',
      current_skills: [],
      positions: [],
      nationalities: [],
      countries: [],
      degrees: [],
      suggestionSkills: [],
      autocompleteSkills: []
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
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
    if (!this.$store.state.user.authenticated) {
      this.$router.push({
        name: 'index',
        replace: true
      })
    }
  },
  mounted () {
    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.client) {
      window.addEventListener('keypress', this.onPressEnter)
    }
    this.getProvinces()
    this.getPosition()
    this.getNationality()
    this.getCountry()
    this.getDegree()
    this.getSkillAutocomplete()
    if (this.user_resume) {
      if (this.user_resume.skills.length > 0) {
        this.current_skills = []
        this.user_resume.skills.forEach((item) => {
          this.current_skills.push(item.skill)
        })
      }
      this.getSkillSuggestion()
      this.logContent()
    }
  },
  methods: {
    addSuggestion (item) {
      this.addSectionItemSkill(this.user_resume.skills, item)
      this.refreshResume()
    },
    activeTab (item) {
      return item.hasOwnProperty('active_tab')
    },
    toggleSection (item) {
      this.user_resume[item] = !this.user_resume[item]
      this.refreshResume()
    },
    editTitle () {
      this.editable_title = true
      this.$nextTick(() => {
        const resumeInputName = this.$refs.resumeName
        if (resumeInputName) {
          resumeInputName.addEventListener('blur', (event) => {
            this.confirmResumeName()
          })
          window.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
              this.confirmResumeName()
            }
          })
        }
      })
    },
    confirmResumeName () {
      this.$nextTick(() => {
        const resumeInputName = this.$refs.resumeName
        if (resumeInputName) {
          resumeInputName.removeEventListener('blur', (e) => {})
          window.removeEventListener('keypress', (e) => {})
        }
      })
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
    removeSectionItem (model, item, section) {
      this.in_progress = 1
      if (Array.isArray(model)) {
        console.log(item)
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
              if (!item.uuid) {
                const index = model.indexOf(item)
                if (index > -1) {
                  model.splice(index, 1)
                }
              } else {
                this.$axios
                  .post(this.$base_api + '/api/frontend/resume/delete-section-item', {
                    resume_uuid: this.user_resume.uuid,
                    uuid: item.uuid,
                    section
                  })
                  .then((res) => {
                    this.user_resume = res.data.data
                    if (this.user_resume.skills.length > 0) {
                      this.current_skills = []
                      this.user_resume.skills.forEach((item) => {
                        this.current_skills.push(item.skill)
                      })
                    }
                    this.getSkillSuggestion()
                    this.logContent()
                  })
              }
            }
          })
        }
      }
    },
    removeSection (item) {
      this.in_progress = 1
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
            if (this.user_resume.uuid) {
              this.$axios
                .post(this.$base_api + '/api/frontend/resume/delete-section', {
                  uuid: this.user_resume.uuid,
                  section: item
                })
                .then((res) => {
                  this.user_resume = res.data.data
                  this.logContent()
                })
            } else {
              const index = this.user_resume.sections_order.indexOf(item)
              if (index > -1) {
                this.user_resume.sections_order.splice(index, 1)
              }
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

    // Get Data
    getSkillSuggestion () {
      this.$axios
        .post(this.$base_api + '/api/frontend/skill/suggestion', {
          current_skills: this.current_skills
        })
        .then((res) => {
          this.suggestionSkills = res.data.data
        })
    },
    getSkillAutocomplete () {
      this.$axios
        .get(this.$base_api + '/api/frontend/skill/autocomplete')
        .then((res) => {
          this.autocompleteSkills = res.data.data
        })
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

    storeResume: debounce(function () {
      this.resume_pdf_src = null
      this.old_pdf_class = 'showpdf'
      this.pdf_class = 'hiddenpdf'

      if (this.user_resume.skills.length > 0) {
        this.current_skills = []
        this.user_resume.skills.forEach((item) => {
          this.current_skills.push(item.skill)
        })
      }
      this.getSkillSuggestion()
      this.$axios
        .post(this.$base_api + '/api/frontend/resume/store', this.user_resume)
        .then((res) => {
          this.user_resume = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        }).finally(() => {
          this.logContent()
        })
    }, 2000),

    refreshResume () {
      this.in_progress = 1
      this.storeResume()
    },

    logContent () {
      this.resume_pdf_src = this.$pdf.createLoadingTask(this.$base_api + `/resume/preview-resume/${this.user_resume.uuid}`)
      if (this.resume_pdf_src) {
        this.resume_pdf_src.promise.then((pdf) => {
          this.pageCount = pdf.numPages
          this.currentPage = 1
          this.in_progress = 0
        })
      }
      if (!this.old_pdf) {
        this.old_pdf = this.resume_pdf_src
      }
    }
  },
  destroyed () {
    window.removeEventListener('keypress', this.onPressEnter)
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/resume.scss";

.showpdf {
  transform: scale(1);
  transform-origin: left top;
  opacity: 1 !important;
  transition: none 0.2s ease 0s;
  z-index: 1;
}

.hiddenpdf {
  transform: scale(1);
  transform-origin: left top;
  opacity: 0 !important;
  transition: opacity 0.2s ease 0s;
  z-index: 2;
}

.text-btn-preview {
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  display: block;
  position: relative;
  color: rgb(255, 255, 255);
  padding: 0 16px 0 4px;
  opacity: 1;
  transition-property: opacity;
  transition-duration: 0.3s;
  transition-delay: 0.2s;
}
</style>
