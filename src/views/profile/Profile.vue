<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">我的档案</div>
    </nav-bar>
    <!-- 用户详情 -->
    <user-info></user-info>
    <!-- 用户服务 -->
    <user-service></user-service>
  </div>
</template>
<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import UserInfo from './UserInfo.vue'
import UserService from './UserService.vue'
export default {
  components: {
    NavBar,
    UserInfo,
    UserService
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/base.less';
.nav-bar {
  background-color: @tintColor;
  color: #fff;
}
</style>
