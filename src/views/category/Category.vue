<template>
  <div class="category">
    <nav-bar>
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <div ref="titles" class="cate-titles">
        <ul>
          <li @click="ItemClick(index)" :class="{ active: index === currentIndex }" v-for="(item, index) in cateTitles" :key="index">{{ item.title }}</li>
        </ul>
      </div>
      <div class="cate-list">
        <tab-control @tabClick="tabClick" :titles="['综合', '新品', '销量']"></tab-control>
        <div ref="contentScroll" class="cate-list-content">
          <category-goods :goods="goodsDetail"></category-goods>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import CategoryGoods from './CategoryGoods.vue'
import { getCategories, getCategoryDetail } from '../../network/category.js'
import TabControl from '../../components/content/tabControl/TabControl.vue'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      titleScroll: null,
      contentScroll: null,
      cateTitles: [],
      currentIndex: 0,
      tabCurrentIndex: 0,
      categoryDetail: ['pop', 'new', 'sell'],
      goodsDetail: []
    }
  },
  components: {
    NavBar,
    TabControl,
    CategoryGoods
  },
  mounted() {
    this.titleScroll = new BScroll(this.$refs.titles)
    getCategories().then(res => {
      this.cateTitles = res.data.category.list
    })
    setTimeout(() => {
      getCategoryDetail(this.cateTitles[this.currentIndex].miniWallkey, this.categoryDetail[this.tabCurrentIndex]).then(res => {
        this.goodsDetail = res
      })
    }, 1500)
  },
  methods: {
    // 点击title高亮
    ItemClick(index) {
      this.currentIndex = index
    },
    tabClick(index) {
      this.tabCurrentIndex = index
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/base.less';
.category {
  .nav-bar {
    background-color: @tintColor;
    color: #fff;
  }
  .content {
    position: relative;
    top: 44px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .cate-titles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 600px;
      background-color: #fff;
      ul {
        width: 100%;
        background-color: #eee;
        li {
          width: 100%;
          height: 50px;
          text-align: center;
          line-height: 50px;
        }
        .active {
          color: @textHighColor;
          border-left: 2px solid @tintColor;
          background-color: #fff;
        }
      }
    }
    .cate-list {
      width: 100%;
      height: 600px;
      overflow: hidden;
      padding-left: 110px;
    }
  }
}
</style>
