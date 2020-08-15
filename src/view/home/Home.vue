<template>
  <div id="home">  
    <nav-bar class="home-navbar">
      <div slot="center">购物街</div>
    </nav-bar>
     <tab-control 
        :titles = "['流行','新款','精选']"
        @tabclick = "tabClick"
        ref="tabcontrol1"
        class="tab-control"
        v-show="isTabFixed">
      </tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type = "3" 
            @scroll="contentScroll"
            :pull-up-load = "true"
            @pullingUp = "loadMore"
            >     
      <home-swiper 
        :banners ="banners"
        @swipperImageLoad = "swipperImageLoad" 
      ></home-swiper>
      <home-recommend-view :recommends ='recommends'></home-recommend-view>
      <home-feature></home-feature>
      <tab-control 
        :titles = "['流行','新款','精选']"
        @tabclick = "tabClick"
        ref="tabcontrol2">
      </tab-control>
      <goods-list :goods = "goods[currentTab].list"></goods-list>
    </scroll>
    <!-- .native监听组件的点击 -->
    <back-top @click.native ="backClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childrenComps/HomeSwiper'
import HomeRecommendView from './childrenComps/HomeRecommendView'
import HomeFeature from './childrenComps/HomeFeature'

import NavBar from 'components/common/navbar/navbar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/bscroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home';
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

export default {
  name: 'home',
  components:{
    HomeSwiper,
    HomeRecommendView,
    HomeFeature,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins:[itemListenerMixin],
  data() {
    return {
      banners :[],
      recommends:[],
      goods:{
        'pop':{page:0, list:[]},
        'new':{page:0, list:[]},
        'sell':{page:0, list:[]}
      },
      currentTab:'pop',
      currentIndex:0,
      // Tablist:['pop', 'new', 'sell'],
      isShowBack:true,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      
    }
  },
  created() {
    // 1、请求多个数据
    this.getMultidata()
    // 2、请求商品数据
    this.getGoods('pop')
    this.getGoods('new')
    this.getGoods('sell')

    // 在created里面拿不到$refs
  },
  mounted() {
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 保存y值
    this.saveY = this.$refs.scroll.getScrollY()
    // 取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.homeImgListener)
  },
  methods: {
     
    /* 监听事件 */
    tabClick(index){
      // this.currentTab = this.Tablist[index],
      switch(index){
        case 0 :
          this.currentTab = 'pop';
          break;
        case 1: 
          this.currentTab = 'new';
          break;
        case 2:
          this.currentTab = 'sell'
          break;
      }
      this.$refs.tabcontrol1.currentIndex = index
      this.$refs.tabcontrol2.currentIndex = index
    },
    backClick(){
      this.$refs.scroll.scrollTo(0 ,0)
    },
    contentScroll(position){
      // 判断backtop是否显示
      this.isShowBack = (-position.y) >1000
      // 2.决定tabcontrol是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getGoods(this.currentTab)
    },
    swipperImageLoad(){
      // 获取tabcontrol的offsetTop
      // 所有组件都有一个属性$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
    },

    /* 网络请求的方法 */
    getMultidata(){
      getHomeMultidata().then(res=>{
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list;
      })
    },
    getGoods(type){
      const page  = this.goods[type].page + 1
      getHomeGoods(type,page).then( res => {
        // 不能直接赋值，传第二个时会覆盖第一个
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    }
    
  }
}
</script>


<style scoped>
  /* scoped作用域 */
  #home{
    width: 100%;
    /* vh :相对于视口的高度。视口被均分为100单位的vh */
    height: 100vh;
    position: relative;
  }

  .home-navbar{
    background-color: var(--color-tint);
    color: #fff;
  /*   position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* 
    .content{
      height:calc(100% - 93px);
      over-flow: hidden;
      margin-top:44px;

    }
   */
</style>