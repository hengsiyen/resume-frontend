<template>
  <div class="tab-collapse">
    <div class="tab-collapse-item">
      <a
        href="javascript:void(0)"
        class="a-no-underline"
        @click="active_tab = !active_tab"
      >
        <div class="collapse-header">
          <div class="collapse-text">
            <p class="collapse-header__title mb-0">
              <i v-if="icon" :class="icon" /> <strong>{{ title }}</strong>
            </p>
            <p v-if="hasSubTitle" class="collapse-header__subtitle mb-0"> {{ subTabLabel }}</p>
          </div>
          <div class="collapse-action d-flex align-content-center justify-items-center">
            <div class="dropdown collapse-btn collapse-dropdown">
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
                  <i class="fas fa-trash mr-3 text-primary" /> Delete
                </a>
              </div>
            </div>
            <div class="collapse-btn">
              <i class="fas " :class="active_tab ? 'fa-angle-up' : 'fa-angle-down'" />
            </div>
          </div>
        </div>
      </a>
      <div v-if="active_tab" class="collapse-body">
        <slot />
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
        if (this.item.title) {
          return this.item.title
        } else if (this.item.school) {
          return this.item.school
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
          return '(No specified)'
        }
      }
      return '(No specified)'
    },
    subTabLabel () {
      if (this.item) {
        if (this.item.start_date || this.item.end_date) {
          return this.concatDates(this.item.start_date, this.item.end_date)
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

.tab-collapse {
  padding-bottom: 12px;
}

.tab-collapse-item {
  border: 1px solid rgb(230, 235, 244);
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  user-select: none;
  pointer-events: auto !important;

  & a {
    color: #262b33;
  }

  & a:hover,
  & a:focus,
  & a:hover .collapse-action .collapse-btn,
  & a:focus .collapse-action .collapse-btn {
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

  &__title {
    font-size: 18px;
  }

  &__subtitle {
    font-size: 14px;
    color: $resume-gray;
  }
}

.collapse-action {
  & .collapse-btn {
    width: 40px;
    height: 40px;
    text-align: center;
    margin-left: 8px;
    color: rgb(184, 190, 204);
    font-size: 22px;
    padding: 5px 0;

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
</style>
