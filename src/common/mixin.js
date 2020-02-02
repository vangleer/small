import { deBounce } from './utils.js'
export const itemListenerMixin = {
  data() {
    return {
      itemListener: null
    }
  },
  mounted() {
    let newRefresh = deBounce(this.$refs.refScroll.refresh, 100)
    this.itemListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemListener)
  }
}
