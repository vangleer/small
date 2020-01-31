<template>
  <div class="recommends">
    <div class="recommends-item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" />
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    recommends: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>
<style lang="less" scoped>
.recommends {
  width: 100%;
  display: flex;
  padding: 12px 0 16px;
  margin-bottom: 10px;
  background-color: #fff;
  .recommends-item {
    flex: 1;
    text-align: center;
    a {
      width: 100%;
      display: block;
      img {
        width: 80%;
      }
      p {
        margin-top: 8px;
      }
    }
  }
}
</style>
