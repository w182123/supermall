<template>
   <tab-bar> 
<tab-bar-items path="/home">
   <img slot="items-icons" src="~assets/img/tabbar/home.svg" alt="" srcset=""> 
   <img slot="items-icons-active" src="~assets/img/tabbar/home1.svg" alt="" srcset=""> 
  <div slot="items-text">首页</div>
  </tab-bar-items>  
  <tab-bar-items path="/about">
   <img slot="items-icons" src="~assets/img/tabbar/about.svg" alt="" srcset=""> 
   <img slot="items-icons-active" src="~assets/img/tabbar/about1.svg" alt="" srcset=""> 
  <div slot="items-text">分类</div>
  </tab-bar-items>
  <tab-bar-items path="/cars">
   <img slot="items-icons" src="~assets/img/tabbar/car.svg" alt="" srcset=""> 
   <img slot="items-icons-active" src="~assets/img/tabbar/car1.svg" alt="" srcset=""> 
  <div slot="items-text">购物车</div>
  </tab-bar-items>
  <tab-bar-items path="/me">
   <img slot="items-icons" src="~assets/img/tabbar/me.svg" alt="" srcset=""> 
   <img slot="items-icons-active" src="~assets/img/tabbar/me1.svg" alt="" srcset=""> 
  <div slot="items-text">我的</div>
  </tab-bar-items>
  </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/tabbar'
import TabBarItems from 'components/common/tabbar/tabbaritems'
export default {
  name: '',
  components :{
    TabBar,
    TabBarItems
  },
}
</script>

<style scoped>
</style>