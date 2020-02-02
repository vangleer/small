<template>
  <div class="user-service">
    <div class="service-item">
      <img src="../../assets/img/profile/message.svg" alt="" />
      <span>我的消息</span>
    </div>
    <div class="service-item">
      <img src="../../assets/img/profile/shopping.svg" alt="" />
      <span>积分商城</span>
    </div>
    <div class="service-item">
      <img src="../../assets/img/profile/vip.svg" alt="" />
      <span>会员卡</span>
    </div>
    <div class="service-item">
      <img src="../../assets/img/profile/cart.svg" alt="" />
      <span>我的购物车</span>
    </div>
    <div class="service-item">
      <img src="../../assets/img/profile/pointer.svg" alt="" />
      <span>下载购物车APP</span>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.user-service {
  background-color: #eee;
  width: 100%;
  padding-top: 16px;
  .service-item {
    background-color: #fff;
    width: 100%;
    height: 46px;
    border-bottom: 1px solid #ccc;
    padding: 12px;
    &:nth-child(3n) {
      margin-bottom: 12px;
    }
    img {
      width: 18px;
      vertical-align: middle;
      padding-right: 5px;
    }
  }
}
</style>
