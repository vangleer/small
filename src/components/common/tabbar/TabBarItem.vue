<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :class="{active:isActive}">
      <slot name="item-name"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    path: String
  },
  data() {
    return {
    }
  },
  computed: {
    // eslint-disable-next-line vue/no-dupe-keys
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img {
  width: 25%;
}
.active {
  color: #ff5777;
}
</style>
