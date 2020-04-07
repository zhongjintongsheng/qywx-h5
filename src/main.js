import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import apis from '@/apis'
import http from '@/tools/http'
import config from '@/config'
import util from '@/tools/util'
import _ from '@/tools/lib/lodash'

import './assets/icons'
import '@/styles/styles.less'

import BaseIcon from './components/base/BaseIcon.vue'
import { Toast, Notify } from 'vant'

Vue.config.productionTip = false

// 全局变量
Vue.prototype.$apis = apis
Vue.prototype.$http = http
Vue.prototype.$config = config
Vue.prototype.$util = util
Vue.prototype._ = _

// 全局组件
Vue.component('base-icon', BaseIcon)

Vue.use(Toast)
Notify.setDefaultOptions({
  duration: 2000
})

Vue.use(Notify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
