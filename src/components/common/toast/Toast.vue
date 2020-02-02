<template>
  <div v-if="isShow" class="toast">{{message}}</div>
</template>
<script>
export default {
  props: {
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    show(message, duration) {
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = message
      }, duration)
    }
  }
}
</script>
<style lang="less" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  padding: 10px 16px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99;
  color: #fff;
  font-size: 16px;
}
</style>
