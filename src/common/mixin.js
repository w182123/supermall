import {debounce} from './utils'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener:null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,500)
    //3、监听item图片加载完成，通过事件总线
    //通过事件总线，可以发送事件，

    // 对监听事件进行保存
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener )
    // console.log('混入的内容');
  },
}