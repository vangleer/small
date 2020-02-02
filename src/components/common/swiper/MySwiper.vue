<template>
  <swiper :options="swiperOption">
    <swiper-slide class="swiper-slide" v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :height="height" :src="item.image" alt @load="imageLoad" />
      </a>
    </swiper-slide>
    <!-- 分页器 -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.min.css')
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    banners: Array,
    default() {
      return []
    },
    height: {
      type: String,
      default: '210px'
    }
  },
  data() {
    return {
      swiperOption: {
        // 显示分页
        pagination: {
          el: '.swiper-pagination'
        },
        // 自动轮播
        autoplay: {
          //   delay: 2000,
          // 当用户滑动图片后继续自动轮播
          disableOnInteraction: false
        },
        // 开启循环模式
        loop: false
      },
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>
<style lang="less">
.swiper-container {
  width: 100%;
  .swiper-slide {
    width: 100% !important;
    img {
      width: 100%;
    }
  }

  .swiper-pagination {
    .swiper-pagination-bullet {
      background-color: #fff;
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      background-color: #f10;
    }
  }
}
</style>
