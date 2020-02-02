<template>
  <div id="detail">
    <nav-bar class="detail-nav">
      <div slot="left" class="back" @click="backClick">
        <img src="../../assets/img/common/back.svg" alt />
      </div>
      <div class="title" slot="center">
        <div
          :class="{active:index===currentIndex}"
          @click="titleClick(index)"
          v-for="(item,index) in titles"
          :key="index"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/base.less';
.title {
  display: flex;
  div {
    flex: 1;
  }
  .active {
    color: @textHighColor;
  }
}
.back {
  padding-top: 8px;
  img {
    width: 20px;
  }
}
.detail-nav {
  background-color: #fff;
}
</style>
