<template>
  <div id="detail">
    <nav-bar class="detail-nav">
      <div slot="left" class="back" @click="backClick">
        <span></span>
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
  padding: 13px;
  span {
    display: block;
    width: 13px;
    height: 13px;
    border-left: 2px solid #ccc;
    border-top: 2px solid #ccc;
    transform: rotate(-45deg);
  }
}
.detail-nav {
  background-color: #fff;
}
</style>
