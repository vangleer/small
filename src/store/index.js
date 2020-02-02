import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: [],
    checked: false
  },
  getters: {
    // 获取购物车的商品个数
    cartLength(state) {
      return state.cartList.length
    },
    // 获取购物车中商品的总价格
    totalPrice(state) {
      if (state.cartList.length === 0) {
        return 0
      }
      let total = 0
      state.cartList.forEach(item => {
        total += item.number * item.price
      })
      return total
    },
    // 获取选中的总价格
    checkedTotalPrice(state) {
      let total = 0
      state.cartList.forEach(item => {
        if (item.isChecked) {
          total += item.number * item.price
        }
      })
      return total
    },
    // 查看所有商品是否都选中了
    isSelectAll(state) {
      if (state.cartList.length === 0) {
        return false
      }
      const newCartList = state.cartList.filter(item => {
        return item.isChecked
      })
      return newCartList.length === state.cartList.length
    }
  },
  mutations: {
    // 添加购物车方法
    addCart(state, product) {
      // 判断购物车是否存在这个商品
      const isHave = state.cartList.some(item => {
        if (item.iid === product.iid) {
          // 如果购物车存在这个商品就把number++
          item.number += 1
          return true
        }
      })
      // 如果没有
      if (!isHave) {
        // 给商品设置一个number属性默认为1
        Vue.set(product, 'number', 1)
        Vue.set(product, 'isChecked', false)
        // 把商品push到购物车列表中
        state.cartList.push(product)
      }
    },
    // 全选和全不选
    changeChecked(state, isChecked) {
      state.cartList.forEach(item => {
        item.isChecked = !isChecked
      })
    }
  },
  actions: {},
  modules: {}
})
