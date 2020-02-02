<template>
  <div ref="wrapper" class="goods">
    <div class="goods-list">
      <div class="goods-item" v-for="(item, index) in goods" :key="index">
        <img v-lazy="item.img" alt />
        <div class="goods-info">
          <p>{{ item.title }}</p>
          <span class="price">{{ item.price }}</span>
          <span class="collect">
            <i>☆</i>
            {{ item.cfav }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BScroll
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper)
  }
}
</script>
<style lang="less" scoped>
.goods {
  overflow: hidden;
}
.goods-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 47%;
  img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }
    .price {
      color: #ff5777;
      margin-right: 20px;
    }
    .collect {
      position: relative;
      i {
        margin: 0 5px;
        font-style: normal;
        font-style: 15px;
      }
    }
  }
}
</style>
