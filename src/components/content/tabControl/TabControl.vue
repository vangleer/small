<template>
  <div class="tab-control">
    <div @click="changeIndex(index)" :class="{ active: currentIndex === index }" class="tab-control-item" v-for="(item, index) in titles" :key="index">
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/css/base.less';
.tab-control {
  display: flex;
  position: sticky;
  background-color: #fff;
  margin-top: 0px;
  .tab-control-item {
    flex: 1;
    text-align: center;
    height: 44px;
    line-height: 40px;
    span {
      padding: 3px 5px;
    }
  }
  .active {
    color: @textHighColor;
    span {
      border-bottom: 2px solid @textHighColor;
    }
  }
}
</style>
