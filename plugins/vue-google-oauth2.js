import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '826419561432-hl6ukjcck23dm9etpklm1he7a554jspj.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent'
}
Vue.use(GAuth, gauthOption)
