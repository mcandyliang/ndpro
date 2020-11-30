import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import echarts from 'echarts'
import App from './App'
import store from './store'
import router from './router'
import AMap from 'vue-amap'
import '@/icons' // icon
import '@/permission' // permission control
import axios from 'axios'
axios.defaults.baseURL = 'http://ual8iz2t23.52http.net'
axios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
Vue.use(AMap);
Vue.prototype.$eacharts = echarts
AMap.initAMapApiLoader({
  key: '0c3cef4b333aa2918685e4a0d4559f68',
  plugin: ['AMap.Geolocation']
});
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
