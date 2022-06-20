import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/theme/default/index.less'
import i18n from '@/assets/lang'
import CalculateMining from '@/plugs/CalculateMining'
import { DropdownMenu, DropdownItem, Overlay, Field, Icon, Button, Toast, Cell, CellGroup, Radio, RadioGroup, Notify, Empty, NoticeBar } from 'vant'

createApp(App).use(store).use(router).use(i18n)
  .use(CalculateMining)
  .use(DropdownMenu).use(DropdownItem).use(Overlay).use(Field).use(Icon).use(Button)
  .use(Toast).use(Cell).use(CellGroup).use(Radio).use(RadioGroup).use(Notify).use(Empty).use(NoticeBar)
  .mount('#app')
