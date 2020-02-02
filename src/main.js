import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入css初始化文件
import './assets/css/base.less'
// 导入fastclick
import FastClick from 'fastclick'
// 导入图片懒加载
import VueLazyLoad from 'vue-lazyload'
import toast from './components/common/toast'
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(toast)
Vue.use(VueLazyLoad)
FastClick.attach(document.body)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
