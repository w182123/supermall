<template>
  <div class="cart">
    <navbar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </navbar>
    <cart-list />
    <cart-bottom-bar/>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
import CartList from 'view/cars/childComps/CartList'
import CartBottomBar from 'view/cars/childComps/CartBottomBar'

import {mapGetters} from 'vuex'

export default {
  name: 'cars',
  components :{
    navbar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 将getters映射为计算属性
    // 两种写法
    ...mapGetters(['cartLength']),
   /*  ...mapGetters({
      cartLength:'cartLength'
    }) */
  },
}
</script>

<style scoped>
  /* .cart{
    height: 100vh;
  } */
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }
</style>