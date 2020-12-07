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
                      <div class="line"/>
                    </div>
                  </div>
                  <div class="col-12 col-sm-6"/>
                </div>
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label for="firstName" class="resume-label-control">First Name</label>
                      <input id="firstName" type="text" class="resume-form-control">
                      <div class="line"/>
                    </div>
                  </div>
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label for="lastName" class="resume-label-control">Last Name</label>
                      <input id="lastName" type="text" class="resume-form-control">
                      <div class="line"/>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label for="email" class="resume-label-control">Email</label>
                      <input id="email" type="email" class="resume-form-control">
                      <div class="line"/>
                    </div>
                  </div>
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label for="phone" class="resume-label-control">Phone</label>
                      <input id="phone" type="text" class="resume-form-control">
                      <div class="line"/>
                    </div>
                  </div>
                </div>
                <div id="showAdditionalDetail" class="collapse">
                  <div class="row">
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="country" class="resume-label-control">Country</label>
                        <input id="country" type="text" class="resume-form-control">
                        <div class="line"/>
                      </div>
                    </div>
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="city" class="resume-label-control">City</label>
                        <input id="city" type="text" class="resume-form-control">
                        <div class="line"/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="address" class="resume-label-control">Address</label>
                        <input id="address" type="text" class="resume-form-control">
                        <div class="line"/>
                      </div>
                    </div>
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="postalCode" class="resume-label-control">Postal Code</label>
                        <input id="postalCode" type="text" class="resume-form-control">
                        <div class="line"/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="drivingLicense" class="resume-label-control">Driving License</label>
                        <input id="drivingLicense" type="text" class="resume-form-control">
                        <div class="line"/>
                      </div>
                    </div>
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="nationality" class="resume-label-control">Nationality</label>
                        <input id="nationality" type="text" class="resume-form-control">
                        <div class="line"/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="pob" class="resume-label-control">Place Of Birth</label>
                        <input id="pob" type="text" class="resume-form-control">
                        <div class="line"/>
                      </div>
                    </div>
                    <div class="col-12 col-sm-6">
                      <div class="form-group">
                        <label for="dob" class="resume-label-control">Date Of Birth</label>
                        <input id="dob" type="text" class="resume-form-control">
                        <div class="line"/>
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
                        <div class="ql-editor-line"/>
                      </div>
                    </div>
                  </div>
                </client-only>
              </FormSection>
              <draggable v-model="sectionsOrder" draggable=".item">
                <template v-for="(element, key) in sectionsOrder">
                  <div
                    v-if="key != 0"
                    :key="key"
                    class="item"
                  >
                    <template v-if="element === 'educations'">
                      <FormSection
                        :draggable="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                      >
                        <ItemCollapse :active-tab="false" :has-sub-title="true">
                          <EducationForm/>
                        </ItemCollapse>
                      </FormSection>
                    </template>
                    <template v-if="element === 'workExperiences'">
                      <FormSection
                        :draggable="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                      >
                        <ItemCollapse :active-tab="false" :has-sub-title="true">
                          <EmploymentForm/>
                        </ItemCollapse>
                      </FormSection>
                    </template>
                    <template v-if="element === 'socialProfiles'">
                      <FormSection
                        :draggable="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                      >
                        <ItemCollapse :active-tab="false">
                          <SocialProfileForm />
                        </ItemCollapse>
                      </FormSection>
                    </template>
                    <template v-if="element === 'references'">
                      <FormSection
                        :draggable="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                      >
                        <ItemCollapse :active-tab="false" :has-sub-title="false">
                          <ReferenceForm/>
                        </ItemCollapse>
                      </FormSection>
                    </template>
                    <template v-if="element === 'internships'">
                      <FormSection
                        :draggable="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                      >
                        <ItemCollapse :active-tab="false" :has-sub-title="true">
                          <InternshipForm />
                        </ItemCollapse>
                      </FormSection>
                    </template>
                    <template v-if="element === 'languages'">
                      <FormSection
                        :draggable="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                      >
                        <ItemCollapse :active-tab="false">
                          <LanguageForm />
                        </ItemCollapse>
                      </FormSection>
                    </template>
                    <template v-if="element === 'courses'">
                      <FormSection
                        :draggable="true"
                        :title="sectionOrdersSubTitle[element].title"
                        :sub-title="sectionOrdersSubTitle[element].sub_title"
                      >
                        <ItemCollapse :active-tab="false" :has-sub-title="true">
                          <CourseForm />
                        </ItemCollapse>
                      </FormSection>
                    </template>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
        <div class="resume__preview"/>
      </div>
    </div>
  </div>
</template>
<script>

import { dataOptions } from '@/mixins/dataOptions'
import FormSection from '@/components/resume/FormSection'
import draggable from 'vuedraggable'
import EducationForm from '@/components/resume/EducationForm'
// import EmploymentForm from '@/components/resume/EmploymentForm'
import ItemCollapse from '@/components/resume/ItemCollapse'
import SocialProfileForm from '@/components/resume/SocialProfileForm'
import ReferenceForm from '@/components/resume/ReferenceForm'
import InternshipForm from '@/components/resume/InternshipForm'
import LanguageForm from '@/components/resume/LanguageForm'
import CourseForm from '@/components/resume/CourseForm'

export default {
  name: 'Edit',
  components: {
    CourseForm,
    LanguageForm,
    InternshipForm,
    ReferenceForm,
    SocialProfileForm,
    ItemCollapse,
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
      sectionOrdersSubTitle: dataOptions.sectionOrdersSubTitle,
      editorOption: dataOptions.editorOption
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
