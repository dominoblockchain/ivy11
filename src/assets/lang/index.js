import { createI18n } from 'vue-i18n'
import zh from './zh'
import tw from './tw'
import en from './en'

const language = localStorage.getItem('language') || 'zh'
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: language,
  messages: {
    zh,
    tw,
    en
  }
})

export default i18n
