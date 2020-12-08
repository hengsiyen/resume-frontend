<template>
  <div id="resume-editor">
    <div class="resume-container">
      <div class="resume__left-block">
        <div class="resume__form">
          <div class="form__content">
            <div class="rf-padding position-relative">
              <div class="rf-title">
                {{ title }}
              </div>
              <!--              <div class="rf-progress">-->
              <!--                <div class="rfp-item">-->
              <!--                  <div class="rfp-content">-->
              <!--                    <div class="rfp-left">-->
              <!--                      <div class="percentage" :class="progressColor">-->
              <!--                        {{ progress }}%-->
              <!--                      </div>-->
              <!--                      Profile completeness-->
              <!--                    </div>-->
              <!--                    <div class="rfp-right">-->
              <!--                      <div class="rtpr-text d-none d-md-block">-->
              <!--                        <div class="rfpr-text-enter">-->
              <!--                          <div class="percentage green">-->
              <!--                            10%-->
              <!--                          </div>-->
              <!--                          Add profile summary-->
              <!--                        </div>-->
              <!--                      </div>-->
              <!--                      <div class="rtpr-tip rtpr-tip-green">-->
              <!--                        <i class="fas fa-question-circle" />-->
              <!--                      </div>-->
              <!--                    </div>-->
              <!--                  </div>-->
              <!--                  <div class="rfp-content-bar">-->
              <!--                    <div class="bar" :class="'bar-' + progressColor" :style="`width: ${progress}%;`" />-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->
              <FormSection title="Personal Details">
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label for="wantJob" class="resume-label-control">Want Job Title</label>
                      <input id="wantJob" type="text" class="resume-form-control">
                      <div class="line" />
                    </div>
                  </div>
                  <div class="col-12 col-sm-6" />
                </div>
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label for="firstName" class="resume-label-control">First Name</label>
                      <input id="firstName" type="text" class="resume-form-control">
                      <div class="line" />
                    </div>
                  </div>
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label for="lastName" class="resume-label-control">Last Name</label>
                      <input id="lastName" type="text" class="resume-form-control">
                      <div class="line" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label for="email" class="resume-label-control">Email</label>
                      <input id="email" type="email" class="resume-form-control">
                      <div class="line" />
                    </div>
                  </div>
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label for="phone" class="resume-label-control">Phone</label>
                      <input id="phone" type="text" class="resume-form-control">
                      <div class="line" />
                    </div>
                  </div>
                </div>
                <div id="showAdditionalDetail" class="collapse">
                  <div class="row">
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="country" class="resume-label-control">Country</label>
                        <input id="country" type="text" class="resume-form-control">
                        <div class="line" />
                      </div>
                    </div>
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="city" class="resume-label-control">City</label>
                        <input id="city" type="text" class="resume-form-control">
                        <div class="line" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="address" class="resume-label-control">Address</label>
                        <input id="address" type="text" class="resume-form-control">
                        <div class="line" />
                      </div>
                    </div>
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="postalCode" class="resume-label-control">Postal Code</label>
                        <input id="postalCode" type="text" class="resume-form-control">
                        <div class="line" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="drivingLicense" class="resume-label-control">Driving License</label>
                        <input id="drivingLicense" type="text" class="resume-form-control">
                        <div class="line" />
                      </div>
                    </div>
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="nationality" class="resume-label-control">Nationality</label>
                        <input id="nationality" type="text" class="resume-form-control">
                        <div class="line" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="pob" class="resume-label-control">Place Of Birth</label>
                        <input id="pob" type="text" class="resume-form-control">
                        <div class="line" />
                      </div>
                    </div>
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="dob" class="resume-label-control">Date Of Birth</label>
                        <input id="dob" type="text" class="resume-form-control">
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
                          v-model="content"
                          :class="{'editor': show_line}"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                        />
                        <div class="ql-editor-line" />
                      </div>
                    </div>
                  </div>
                </client-only>
              </FormSection>
              <draggable v-model="sectionsOrder" draggable=".item">
                <template v-for="(element, key) in sectionsOrder">
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
                        <draggable v-model="educations" draggable=".item">
                          <template v-for="(element, key) in educations">
                            <ItemCollapse :key="key" :active-tab="false" :has-sub-title="true">
                              <EducationForm />
                            </ItemCollapse>
                          </template>
                        </draggable>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addCustomItem(educations)"
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
                        <draggable v-model="workExperiences" draggable=".item">
                          <template v-for="(element, key) in workExperiences">
                            <ItemCollapse :active-tab="false" :has-sub-title="true" :key="key">
                              <EmploymentForm />
                            </ItemCollapse>
                          </template>
                        </draggable>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addCustomItem(workExperiences)"
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
                        <draggable v-model="socialProfiles" draggable=".item">
                          <template v-for="(element, key) in socialProfiles">
                            <ItemCollapse :active-tab="false" :key="key">
                              <SocialProfileForm />
                            </ItemCollapse>
                          </template>
                        </draggable>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addCustomItem(socialProfiles)"
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
                        <draggable v-model="skills" draggable=".item">
                          <template v-for="(element, key) in skills">
                            <ItemCollapse :active-tab="false" :has-sub-title="true" :key="key">
                              <SkillForm />
                            </ItemCollapse>
                          </template>
                        </draggable>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addCustomItem(skills)"
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
                      >
                        <draggable v-model="courses" draggable=".item">
                          <template v-for="(element, key) in courses">
                            <ItemCollapse :active-tab="false" :has-sub-title="true" :key="key">
                              <CourseForm />
                            </ItemCollapse>
                          </template>
                        </draggable>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addCustomItem(courses)"
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
                      >
                        <draggable v-model="internships" draggable=".item">
                          <template v-for="(element, key) in internships">
                            <ItemCollapse :active-tab="false" :has-sub-title="true" :key="key">
                              <InternshipForm />
                            </ItemCollapse>
                          </template>
                        </draggable>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addCustomItem(internships)"
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
                      >
                        <draggable v-model="languages" draggable=".item">
                          <template v-for="(element, key) in languages">
                            <ItemCollapse :active-tab="false" :key="key">
                              <LanguageForm />
                            </ItemCollapse>
                          </template>
                        </draggable>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addCustomItem(languages)"
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
                      >
                        <draggable v-model="activities" draggable=".item">
                          <template v-for="(element, key) in activities">
                            <ItemCollapse :active-tab="false" :key="key">
                              <ActivityForm />
                            </ItemCollapse>
                          </template>
                        </draggable>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addCustomItem(activities)"
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
                      >
                        <HobbyForm />
                      </FormSection>
                    </template>
                    <template v-if="element === 'references'">
                      <FormSection
                        :draggable="true"
                        :has-delete-button="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                      >
                        <draggable v-model="references" draggable=".item">
                          <template v-for="(element, key) in references">
                            <ItemCollapse :active-tab="false" :has-sub-title="false" :key="key">
                              <ReferenceForm />
                            </ItemCollapse>
                          </template>
                        </draggable>
                        <a
                          href="javascript:void(0)"
                          class="btn-add-item"
                          @click="addCustomItem(references)"
                        >
                          <i class="fas fa-plus mr-2" />
                          <span>Add item</span>
                        </a>
                      </FormSection>
                    </template>
                    <template v-if="customSections.length">
                      <template v-for="(customSection, key) in customSections">
                        <template v-if="element === 'custom:' + customSection.externalId">
                          <FormSection
                            :key="key"
                            :draggable="true"
                            :has-delete-button="true"
                            :title="customSection.title ? customSection.title : 'Untitled'"
                          >
                            <template v-if="customSection && customSection.items.length">
                              <template v-for="(item, item_key) in customSection.items">
                                <ItemCollapse
                                  :key="item_key"
                                  :active-tab="false"
                                  :has-sub-title="false"
                                >
                                  <CustomSectionForm />
                                </ItemCollapse>
                              </template>
                            </template>
                            <a
                              href="javascript:void(0)"
                              class="btn-add-item"
                              @click="addCustomItem(customSection.items)"
                            >
                              <i class="fas fa-plus mr-2" />
                              <span>Add item</span>
                            </a>
                          </FormSection>
                        </template>
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
                      :class="{'active': checkSectionActive(sectionsOrder, item.value)}"
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
          </div>
        </div>
        <div class="resume__preview" />
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

export default {
  name: 'Edit',
  components: {
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
    EmploymentForm,
    EducationForm,
    FormSection,
    draggable
  },
  data () {
    return {
      show_line: false,
      progress: 30,
      title: 'Untitled',
      showAdditionalDetail: false,
      content: '<p>I am Example</p>',
      sectionsOrder: dataOptions.sectionOrders,
      customSections: dataOptions.customSections,
      sectionOrdersSubTitle: dataOptions.sectionOrdersSubTitle,
      editorOption: dataOptions.editorOption,
      addSections: dataOptions.addSections,
      educations: [],
      workExperiences: [],
      socialProfiles: [],
      skills: [],
      courses: [],
      internships: [],
      languages: [],
      activities: [],
      hobbies: [],
      references: []
    }
  },
  computed: {
    progressColor () {
      if (this.progress === 0 && this.progress < 30) {
        return 'red'
      } else if (this.progress >= 30 && this.progress < 59) {
        return 'yellow'
      } else if (this.progress >= 60 && this.progress <= 100) {
        return 'green'
      } else {
        return 'default'
      }
    }
  },
  methods: {
    addCustomItem (item) {
      const newItem = {
        title: null,
        city: null,
        start_date: new Date(),
        end_date: new Date(),
        description: null
      }
      item.push(newItem)
    },
    addCustomSection () {
      const newCustomSection = {
        externalId: this.makeExternalId(8),
        title: '',
        items: []
      }
      this.customSections.push(newCustomSection)
      this.sectionsOrder.push('custom:' + newCustomSection.externalId)
    },
    addSection (item) {
      if (item) {
        this.sectionsOrder.push(item.value)
      }
    },
    checkSectionActive (array, key = '') {
      if (array.length > 0) {
        return array.includes(key)
      }
      return false
    },
    onEditorBlur (editor) {
      this.show_line = false
    },
    onEditorFocus (editor) {
      this.show_line = true
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/resume.scss";
</style>
