<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <bottom-bar></bottom-bar>
  </div>
</template>
<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import BottomBar from './BottomBar.vue'
import CartList from './CartList.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    NavBar,
    CartList,
    BottomBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/base.less';
.cart {
  height: 100vh;
  padding-top: 44px;
}
.nav-bar {
  background-color: @tintColor;
  color: #fff;
}
</style>
