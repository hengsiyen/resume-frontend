import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  scope: 'email',
  prompt: 'consent'
}
Vue.use(GAuth, gauthOption)
