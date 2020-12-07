<template>
  <div class="tab-collapse">
    <div class="tab-collapse-item">
      <a href="javascript:void(0)" class="a-no-underline" @click="active_tab = !active_tab">
        <div class="collapse-header">
          <div>
            <p class="mb-0">
              <i v-if="icon" :class="icon" /> <strong>{{ tabLabel }}</strong>
            </p>
            <p class="collapse-header__subtitle mb-0" v-if="hasSubTitle">Dec, 2020 - Dec, 2020</p>
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
                <a class="dropdown-item" href="#">
                  <i class="fas fa-pen mr-3 text-primary" /> Edit
                </a>
                <a class="dropdown-item" href="#">
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
    tabLabel: {
      type: String,
      default: '(No specified)'
    },
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
    }
  },
  data () {
    return {
      active_tab: this.activeTab
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

  &__subtitle {
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
