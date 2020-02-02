<template>
  <div id="home">
    <!-- 头部导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- tab控制模块 -->
    <tab-control
      ref="tabControl2"
      @tabClick="tabClick"
      :titles="['流行', '新款', '精选']"
      class="istab-control"
      v-show="isTabFixed"
    />
    <scroll
      :pull-up-load="true"
      :probe-type="3"
      @scroll="contentScroll"
      @pullingup="loadMore"
      ref="refScroll"
      class="content"
    >
      <!-- 轮播图 -->
      <!-- <hemo-swiper @swiperImageLoad="swiperImageLoad" :banners="banners"  ></hemo-swiper> -->
      <my-swiper @swiperImageLoad="swiperImageLoad" :banners="banners"></my-swiper>
      <!-- 推荐模块 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- Feature模块 -->
      <feature></feature>
      <!-- tab控制模块 -->
      <tab-control
        ref="tabControl1"
        @tabClick="tabClick"
        :titles="['流行', '新款', '精选']"
        :class="{fixed:isTabFixed}"
      />
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
import { itemListenerMixin } from '@/common/mixin.js'
// import HemoSwiper from './chilComps/HemoSwiper.vue'
import MySwiper from '@/components/common/swiper/MySwiper.vue'

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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  mixins: [itemListenerMixin],
  mounted() {
  },
  components: {
    NavBar,
    // HemoSwiper,
    MySwiper,
    RecommendView,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata()
    // 2. 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  activated() {
    this.$refs.refScroll.scrollTo(0, this.saveY, 0)
    this.$refs.refScroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.refScroll.getScrollY
    this.$bus.$off('itemImgLoad', this.itemListener)
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 返回顶部
    backTop() {
      this.$refs.refScroll.scrollTo(0, 0)
    },
    contentScroll(p) {
      // console.log(p.y)
      // console.log(this.tabOffsetTop
      this.isShowBackTop = -p.y > 1000
      this.isTabFixed = (-p.y) > this.tabOffsetTop
    },
    // 加载更多的方法
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
    },
    /**
     * 网络请求的方法
     */
    getHomeMultidata() {
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
  height: 100vh;
  padding-bottom: 49px;
  padding-top: 44px;
}
.fixed {
  position: relative;
  margin-top: 1px;
}
.home-nav {
  background-color: @tintColor;
  color: #fff;
}
.istab-control {
  position: fixed;
  width: 100%;
  top: 43px;
  left: 0;
  z-index: 9;
  margin-top: 1px;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  // bottom: 49px;
  height: calc(100%-93px);
}
</style>
