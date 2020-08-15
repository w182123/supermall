<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item ="item" />
    </Scroll>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

import Scroll from 'components/common/bscroll/Scroll'
import CartListItem from 'view/cars/childComps/CartListItem'

export default {
  name:'CartList',
  components:{
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  },
}
</script>
  
<style scoped>
  .content{
    position: absolute;
    top: 44px;
    right: 0;
    left: 0;
    bottom: 89px;
    overflow: hidden;
  }
</style>