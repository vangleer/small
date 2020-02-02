<template>
  <div class="goods-item" @click.prevent="itemClick">
    <img v-lazy="showImage" @load="imageLoad" alt />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">
        <i>☆</i>
        {{ goodsItem.cfav }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>
<style lang="less" scoped>
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
