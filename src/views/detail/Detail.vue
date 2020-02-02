<template>
  <div id="detail">
    <!-- 商品详情头部导航 -->
    <detail-nav-bar ref="nav" @titleClick="titleClick" />
    <scroll :probe-type="3" @scroll="contentScroll" ref="refScroll" class="content">
      <!-- 商品详情轮播图 -->
      <my-swiper :height="'390px'" :banners="topImages" />
      <!-- 商品详情内容 -->
      <detail-base-info :goods="goods" />
      <!-- 购物车详情 -->
      <detail-shop-info :shop="shop" />
      <detail-goods-info @image-load="imageLoad" :detailInfo="detailInfo" />
      <detail-param-info ref="params" :paramInfo="paramsInfo" />
      <!-- 评论信息 -->
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <!-- 推荐商品 -->
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <!-- 返回顶部 -->
    <back-top @click.native="backTop" v-if="isShowBackTop"></back-top>
    <!-- 底部加入购物车导航 -->
    <detail-bottom-bar @addToCart="addToCart" />
  </div>
</template>
<script>
import DetailNavBar from './DetailNavBar.vue'
import DetailBaseInfo from './DetailBaseInfo.vue'
import DetailShopInfo from './DetailShopInfo.vue'
import DetailGoodsInfo from './DetailGoodsInfo.vue'
import DetailParamInfo from './DetailParamInfo.vue'
import DetailCommentInfo from './DetailCommentInfo.vue'
import DetailBottomBar from './DetailBottomBar.vue'

import MySwiper from '@/components/common/swiper/MySwiper.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'
import BackTop from '@/components/content/backTop/BackTop.vue'
import GoodsList from '@/components/content/goods/GoodsList'
import { itemListenerMixin } from '@/common/mixin.js'
import { getDetail, Goods, Shop, GoodsParam, getRecommend } from '@/network/detail.js'
export default {
  components: {
    // 1.详情navBar组件
    DetailNavBar,
    // 2.详情轮播图组件
    MySwiper,
    // 3.详情基本信息
    DetailBaseInfo,
    // 4.详情购物车参数
    DetailShopInfo,
    // 5.详情页面滚动组件
    Scroll,
    // 6.详情商品信息
    DetailGoodsInfo,
    // 7.参数详情
    DetailParamInfo,
    // 8.评论信息
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  data() {
    return {
      iid: '',
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false
    }
  },
  created() {
    // 1. 获取路由中的iid
    this.iid = this.$route.params.iid
    // 2. 根据iid请求详情数据
    this.getDetail()
    // 获取评论信息
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mixins: [itemListenerMixin],
  mounted() {
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemListener)
  },

  methods: {
    getDetail() {
      getDetail(this.iid).then(res => {
        // 1.把获取的信息保存在data中
        const data = res.result
        // 2.获取轮播图数据
        let imgs = data.itemInfo.topImages
        imgs.forEach(item => {
          let obj = {
            image: item
          }
          this.topImages.push(obj)
        })
        // 3.保存商品相关的信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 4.保存购物车相关的参数
        this.shop = new Shop(data.shopInfo)
        // 5.保存商品详情数据
        this.detailInfo = data.detailInfo
        // 6.保存参数信息
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        setTimeout(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
        }, 3000)
      })
    },
    imageLoad() {
      this.$refs.refScroll.refresh()
    },
    titleClick(index) {
      this.$refs.refScroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(p) {
      const positionY = -p.y
      if (this.themeTopYs) {
        const length = this.themeTopYs.length
        for (let i = 0; i < length; i++) {
          // eslint-disable-next-line no-mixed-operators
          if (this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      }
      this.isShowBackTop = -p.y > 1000
    },
    backTop() {
      this.$refs.refScroll.scrollTo(0, 0, 300)
    },
    // 加入购物车功能
    addToCart() {
      console.log(this.goods)
      const product = {}
      product.image = this.topImages[0].image
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.$route.params.iid
      this.$store.commit('addCart', product)
      this.$toast.show('加入购物车成功', 1500)
    }
  }
}
</script>
<style lang="less" scoped>
#detail {
  position: absolute;
  left: 0;
  padding-bottom: 49px;
  padding-top: 44px;
  background-color: #fff;
  height: 100vh;
  .content {
    height: calc(100%-44px);
  }
}
</style>
