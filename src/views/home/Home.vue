<template>
  <div id="home">
    <!-- 头部导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll :pull-up-load="true" :probe-type="3" @pullingUp="pullingUp" @scroll="contentScroll" ref="refScroll" class="content">
      <!-- 轮播图 -->
      <hemo-swiper :banners="banners"></hemo-swiper>
      <!-- 推荐模块 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- Feature模块 -->
      <feature></feature>
      <!-- tab控制模块 -->
      <tab-control @tabClick="tabClick" :titles="['流行', '新款', '精选']" />
      <!-- 商品列表 -->
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backTop"></back-top>
  </div>
</template>
<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'

import { getHomeMultidata, getHomeGoods } from '@/network/home'

import HemoSwiper from './chilComps/HemoSwiper.vue'
import RecommendView from './chilComps/RecommendView.vue'
import Feature from './chilComps/Feature.vue'

import Scroll from '@/components/common/scroll/Scroll.vue'
import BackTop from '@/components/content/backTop/BackTop.vue'
export default {
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      scroll: null,
      isShowBackTop: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  mounted() {},
  components: {
    NavBar,
    HemoSwiper,
    RecommendView,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    this.getHomeMultidata()
    // 请求商品数据
    this.getHomeGoods(this.currentType)
  },
  methods: {
    /**
     * 事件监听的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.getHomeGoods(this.currentType)
    },
    // 返回顶部
    backTop() {
      this.$refs.refScroll.scrollTo(0, 0)
    },
    contentScroll(p) {
      this.isShowBackTop = -p.y > 1000
    },
    // 上拉加载事件
    pullingUp() {
      this.getHomeGoods(this.currentType)
      this.$refs.refScroll.scroll.refresh()
    },
    /**
     * 网络请求的方法
     */ getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    // 请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        console.log(res)
        this.$refs.refScroll.finishPullUp()
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/base.less';
#home {
  position: relative;
  padding-top: 44px;
  height: 100vh;
}
.home-nav {
  background-color: @tintColor;
  color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  height: calc(100%-93px);
}
</style>
