import Toast from './Toast.vue'
const obj = {}
obj.install = function(Vue) {
  // Vue.extend
  //   document.body.appendChild(Toast.$el)
  const toastConstructor = Vue.extend(Toast)
  // eslint-disable-next-line new-cap
  const toast = new toastConstructor()
  toast.$mount(document.createElement('div'))
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}
export default obj
