import Vue from 'vue'
import App from './App.vue'

require('./main.i18n')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
