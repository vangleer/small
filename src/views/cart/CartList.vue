<template>
  <scroll ref="refScroll" class="content">
    <div class="cart-list">
      <cart-list-item v-for="item in list" :itemInfo="item" :key="item.iid"></cart-list-item>
    </div>
  </scroll>
</template>
<script>

import CartListItem from './CartListItem.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
export default {
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    list() {
      return this.$store.state.cartList
    }
  },
  activated() {
    this.$refs.refScroll.refresh()
  }
}
</script>
<style lang="less" scopd>
.content {
  padding: 44px 0 49px 0;
  height: 100%;
  overflow: hidden;
}
</style>
