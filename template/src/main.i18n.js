import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

Vue.config.lang = 'ko'
Vue.config.fallbackLang = 'en'

const locales = ['ko', 'en']
locales.forEach((lang) => {
  Vue.locale(lang, require(`i18n/${lang}`))
})
