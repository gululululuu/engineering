import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations: {
    // 修改token，并将token存入localStorage
    setToken (state, Authorization) {
      state.Authorization = Authorization
      localStorage.setItem('Authorization', Authorization.token)
    },
    // 注销删除用户token信息
    delLogin (state) {
      state.token = ''
      localStorage.removeItem('Authorization')
    }
  }
})

export default store
