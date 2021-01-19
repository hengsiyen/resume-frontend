<template>
  <div class="tab-collapse-row">
    <div class="tab-collapse-col">
      <div class="tab-collapse">
        <div class="tab-collapse-item position-relative">
          <div class="d-flex align-items-center">
            <a
              href="javascript:void(0)"
              class="a-link-title a-no-underline"
              @click="active_tab = !active_tab"
            >
              <div class="collapse-header">
                <div class="collapse-text">
                  <p class="collapse-header__title ellipsis w-100 mb-0">
                    <i v-if="icon" :class="icon" /> <strong>{{ title }}</strong>
                  </p>
                  <p v-if="hasSubTitle" class="collapse-header__subtitle mb-0"> {{ subTabLabel }}</p>
                </div>
                <div class="collapse-action d-flex align-content-center justify-items-center">
                  <div class="collapse-btn d-none d-lg-block">
                    <mdicon v-if="active_tab" name="chevronUp" />
                    <mdicon v-else name="chevronDown" />
                  </div>
                </div>
              </div>
            </a>
            <div class="btn-dropdown position-relative d-block d-lg-none">
              <div class="dropdown collapse-btn collapse-dropdown h-100 d-flex align-items-center justify-content-center">
                <a
                  id="dropdownMenuLink"
                  class="btn-link dropdown-toggle"
                  href="javascript:void(0)"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-h" />
                </a>

                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                  <a class="dropdown-item" href="javascript:void(0)" @click="onDelete">
                    <mdicon name="deleteOutline" class="mr-2 text-primary" :size="22" style="padding-bottom: 3px" /> Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div v-if="active_tab" class="collapse-body">
            <slot />
          </div>
          <div class="btn-delete">
            <a
              href="javascript:void(0)"
              class="rf-section__delete"
              @click="onDelete"
            >
              <mdicon name="deleteOutline" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemCollapse',
  props: {
    icon: {
      type: String,
      default: ''
    },
    activeTab: {
      type: Boolean,
      default: false
    },
    hasSubTitle: {
      type: Boolean,
      default: false
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
      active_tab: this.activeTab
    }
  },
  computed: {
    title () {
      if (this.item) {
        if (this.item.title || this.item.job_title || this.item.employer) {
          let title = null
          if (this.item.title) {
            title = this.item.title
          } else if (this.item.job_title) {
            title = this.item.job_title
          }

          if (title && this.item.employer) {
            return title + ' at ' + this.item.employer
          } else if (!title && this.item.employer) {
            return this.item.employer
          } else {
            return title
          }
        } else if (this.item.school || this.item.degree) {
          if (this.item.school && this.item.degree) {
            return this.item.degree + ' at ' + this.item.school
          } else if (!this.item.school && this.item.degree) {
            return this.item.degree
          } else {
            return this.item.school
          }
        } else if (this.item.label) {
          return this.item.label
        } else if (this.item.skill) {
          return this.item.skill
        } else if (this.item.course) {
          return this.item.course
        } else if (this.item.language) {
          return this.item.language
        } else if (this.item.name) {
          return this.item.name
        } else {
          return ''
        }
      }
      return ''
    },
    subTabLabel () {
      if (this.item) {
        if (this.item.date_from || this.item.date_until) {
          return this.concatDates(this.item.date_from, this.item.date_until, this.item.date_from_format, this.item.date_until_format)
        } else if (this.item.level) {
          return this.item.level
        } else if (this.item.company) {
          return this.item.company
        } else if (this.item.institution) {
          return this.item.institution
        } else if (this.item.link) {
          return this.item.link
        }
      }
      return null
    }
  },
  methods: {
    onDelete () {
      this.$emit('onDelete')
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/elements/_default.scss";
@import "~assets/scss/resume.scss";

.tab-collapse-row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -25px;
  margin-left: -25px;

  &:hover .btn-delete {
    opacity: 1;
  }
}

.tab-collapse-col {
  position: relative;
  width: 100%;
  padding-right: 25px;
  padding-left: 25px;
}

.tab-collapse {
  width: 100%;
  padding-bottom: 12px;
}

.collapse-text {
  width: 90%;
}

.tab-collapse-item {
  border: 1px solid rgb(230, 235, 244);
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  user-select: none;
  pointer-events: auto !important;
  width: 100%;

  & a.a-link-title {
    width: 100%;
    display: block;
  }

  & a.dropdown-item,
  & a.a-link-title {
    color: #262b33;
  }

  & a.dropdown-item:hover,
  & a.dropdown-item:focus,
  & a.dropdown-item:hover .collapse-action .collapse-btn,
  & a.dropdown-item:focus .collapse-action .collapse-btn,
  & a.a-link-title:hover,
  & a.a-link-title:focus,
  & a.a-link-title:hover .collapse-action .collapse-btn,
  & a.a-link-title:focus .collapse-action .collapse-btn{
    color: #3b8af2;
  }
}

.collapse-header {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 70px;
  padding: 15px 20px;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;

  &__title {
    font-size: 16px;
  }

  &__subtitle {
    font-size: 14px;
    color: $resume-gray;
  }
}

.collapse-action {
  & .collapse-btn {
    //width: 40px;
    //height: 40px;
    //text-align: center;
    //margin-left: 8px;
    color: rgb(184, 190, 204);
    //font-size: 22px;
    //padding: 5px 0;

    & a.dropdown-toggle {
      color: rgb(184, 190, 204);

      &:hover,
      &:focus {
        color: #3b8af2;
      }
    }

    & a.btn-link.dropdown-toggle:after {
      content: unset;
    }

    .dropdown-menu a {
      font-size: 20px;
      font-weight: 600;
      color: #262b33;

      &:hover,
      &:focus {
        color: #3b8af2;
      }
    }
  }
}

.collapse-body {
  padding: 4px 20px 24px;
}

.btn-delete {
  opacity: 0;
  position: absolute;
  right: -25px;
  top: 20px;
}

@media screen and (max-width: 991.98px) {
  .tab-collapse-col {
    padding-right: 20px;
  }
  .tab-collapse-row {
    & .btn-delete {
      display: none;
    }

    &:hover .btn-delete {
      opacity: 0 !important;
    }
  }

  .collapse-text {
    width: 100%;
  }

  .tab-collapse-item {
    & a.a-link-title {
      width: 92%;
    }
  }

  .btn-dropdown {
    width: 7%;
    text-align: center;
    height: 45px;
  }
}
@media screen and (max-width: 576px) {
  .tab-collapse-item {
    & a.a-link-title {
      width: 88%;
    }
  }

  .btn-dropdown {
    width: 12%;
  }
}

</style>
