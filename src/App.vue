<template>
  <div id="app">
    <p>123</p>
    <hello></hello>
  </div>
</template>
<script>
import Hello from './components/Hello.vue'
export default {
  components: {
    Hello
  }
}
</script>
<style lang="less">
@import './assets/css/base.less';
p {
  color: @tintColor;
}
</style>
