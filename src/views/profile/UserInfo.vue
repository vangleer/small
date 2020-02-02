<template>
  <div class="user-info">
    <div class="info-top">
      <div class="user-login left">
        <div class="avatar">
          <img src="../../assets/img/profile/avatar.svg" alt="" />
        </div>
        <div class="login-desc">
          <p>登录/注册</p>
          <a href="javascript:;">
            <img src="../../assets/img/profile/phone.svg" alt="" />
            <span>暂无绑定手机号</span>
          </a>
        </div>
      </div>
      <div class="right">
        <img src="../../assets/img/common/arrow-left.svg" alt="" />
      </div>
    </div>
    <div class="user-desc">
      <div class="desc-item">
        <p><span>0.00</span>元</p>
        <a href="javascript:;">我的余额</a>
      </div>
      <div class="desc-item">
        <p><span>0</span>个</p>
        <a href="javascript:;">我的秀慧</a>
      </div>
      <div class="desc-item">
        <p><span>0</span>分</p>
        <a href="javascript:;">我的积分</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.info-top {
  height: 80px;
  width: 100%;
  margin-top: 44px;
  padding: 0 16px;
  background-color: #ff7198;
  .user-login {
    display: flex;
    padding-top: 10px;
    .avatar {
      img {
        width: 60px;
      }
    }
    .login-desc {
      padding: 8px;
      color: #fff;
      p {
        padding-left: 5px;
        margin-bottom: 3px;
      }
      span {
        font-size: 12px;
        color: #fff;
      }
    }
  }
  img {
    width: 18px;
    vertical-align: middle;
  }
  .right {
    line-height: 80px;
  }
}
.user-desc {
  display: flex;
  background-color: #fff;
  .desc-item {
    width: 33.33%;
    text-align: center;
    padding: 16px 0;
    border-right: 1px solid #eee;
    &:nth-child(3) {
      border-right: 0;
    }
    p {
      span {
        color: orangered;
        font-size: 18px;
        font-weight: 500;
      }
    }
  }
}
</style>
