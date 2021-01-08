import Vue from 'vue'
import loading from 'vuejs-loading-screen'

Vue.use(loading, {
  bg: '#dee2e6ab',
  icon: 'fas fa-circle-notch',
  size: 3,
  icon_color: '#3b8af2',
  slot: '<h3><i class="fas fa-circle-notch fa-spin mr-2"></i> Loading...</h3>'
})
