// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index.js'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 请求拦截器
axios.interceptors.request.use(config => {
  // 判断是否存在token，如果存在将每个页面的header都添加token
  if (localStorage.getItem('Authorization')) {
    config.headers.Authorization = localStorage.getItem('Authorization')
  }
  return config
}, error => {
  // 请求错误
  return Promise.reject(error)
})
