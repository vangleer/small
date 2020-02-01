import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入css初始化文件
import './assets/css/base.less'
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
