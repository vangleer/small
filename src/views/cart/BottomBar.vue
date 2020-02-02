<template>
  <div class="bottom-menu">
    <check-button class="select-all" @checkBtnClick="checkBtnClick" :is-checked="isSelectAll"></check-button>
    <span>全选</span>
    <span class="total-price">合计: {{ totalPrice }} ¥</span>
    <span @click="goBuy" class="buy-product">去计算({{ checkedTotalPrice }}¥)</span>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
import { mapGetters } from 'vuex'
export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['totalPrice', 'checkedTotalPrice', 'isSelectAll'])
  },
  data() {
    return {}
  },
  methods: {
    checkBtnClick() {
      this.$store.commit('changeChecked', this.isSelectAll)
    },
    goBuy() {
      if (this.checkedTotalPrice === 0) {
        this.$toast.show('您还没有选择商品', 1500)
      }
    }
  }
}
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
  z-index: 99999;
}
.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}
.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}
.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
