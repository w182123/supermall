<template>
  <div id="details">
    <details-nav-bar class="detail-navbar" 
      @titleClick = "titleClick"
      ref="nav"></details-nav-bar>  

    <scroll class="content"  ref="scroll" @scroll = 'contentScroll'
      :probe-type = '3'>
      <detail-swiper :topImages = 'topImages'></detail-swiper>
      <detail-base-info :goods = "goods"></detail-base-info>
      <detail-shop-info :shop = "shop"></detail-shop-info>
      <detail-goods-info :detail-info ="detailInfo" @imageLoad = "imageLoad"></detail-goods-info>
      <detail-params-info ref="param" :param-info = "paramsInfo"></detail-params-info>
      <comment-info ref="comment" :comment-info = 'commentInfo'></comment-info>
      <goods-list ref="recommend" :goods = "recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart = 'addToCart'></detail-bottom-bar>
    <!-- .native监听组件的点击 -->
    <back-top @click.native ="backClick" v-show="isShowBack"
        class="backtop"></back-top>
  </div>
</template>

<script>
import DetailsNavBar from 'view/details/detailsComps/DetailsNavBar'
import DetailSwiper from 'view/details/detailsComps/DetailSwiper'
import DetailBaseInfo from 'view/details/detailsComps/DetailBaseInfo'
import DetailShopInfo from 'view/details/detailsComps/DetailShopInfo'
import DetailGoodsInfo from 'view/details/detailsComps/DetailGoodsInfo'
import DetailParamsInfo from 'view/details/detailsComps/DetailParamsInfo'
import CommentInfo from 'view/details/detailsComps/CommentInfo'
import DetailBottomBar from 'view/details/detailsComps/DetailBottomBar'
import Scroll from 'components/common/bscroll/Scroll'

import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import {getDetails, getRecommend, Goods, Shop, GoodsParam} from 'network/details'
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

import {mapActions, mapGetters} from 'vuex'
 
export default {
  name:'Details',
  components:{
    DetailsNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    CommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  mixins:[itemListenerMixin],
  data() {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramsInfo:{},
      commentInfo:{},
      recommend:[],
      themeTopsY:[],
      currentIndex:0,
      isShowBack:false,
      message:'',
      show:false
    }
  },
  methods: {
    ...mapActions(['addCart']),
    getDetails(){
      //根据iid请求数据
      getDetails(this.iid).then( res => {
        console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //获取商家信息
        this.shop = new Shop(data.shopInfo)
        // 获取商品详细信息
        this.detailInfo = data.detailInfo
        //获取参数信息
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 取出评论信息
        if(data.rate.cRate !==0){
          this.commentInfo = data.rate.list[0]
        }
      })
    },
    getRecommend(){
      //获取推荐信息
      getRecommend().then( res => {
        // console.log(res);
        this.recommend = res.data.list
      })
    },
    imageLoad(){
      this.$refs.scroll.refresh()
      // console.log('imggeload');
      this.getThemeTopsY()
    },
    titleClick(index){
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopsY[index],200)
    },
    contentScroll(position){
      const positionY = -position.y

      const length = this.themeTopsY.length

      /* this.currentIndex !== i 
      防止赋值过于频繁 */

      for(let i = 0; i< length ; i++){
          // Number.MAX_VALUE js能表示的最大值
          // 普通做法 
          if(this.currentIndex !== i && ((i<length - 1 && positionY >= this.themeTopsY[i] && positionY < this.themeTopsY[i + 1])|| 
            (i == length -1 && positionY >= this.themeTopsY[i]))){
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.isShowBack = (-position.y) >1000

    },
    backClick(){
      this.$refs.scroll.scrollTo(0 ,0)
    },
    addToCart(){
      // console.log('---');
    //获取购物车需要的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.price;
      product.iid = this.iid


      this.addCart(product).then( res => {
        /* this.show = true;
        this.message = res

        setTimeout(() => {
          this.show = false
          this.message = ''
        },1500) */
      // console.log(this.$toast);
        this.$toast.show( res , 1500)
      })
      //将商品信息加入购物车
      // this.$store.state.cartList.push(product)
      // this.$store.commit('addCart',product)
      // this.$store.dispatch('addCart',product).then( res => {
      //   console.log(res);
      // })
    }
  },
  created() {
    // 1、保存传入的iid
    this.iid  = this.$route.params.id
    this.getDetails()
    this.getRecommend()
    this.getThemeTopsY = debounce( ()=> {
      this.themeTopsY = []

      this.themeTopsY.push(0)
      this.themeTopsY.push(this.$refs.param.$el.offsetTop -44)
      this.themeTopsY.push(this.$refs.comment.$el.offsetTop -44)
      this.themeTopsY.push(this.$refs.recommend.$el.offsetTop -44)
    },100)
  },
  mounted() {
  },
  updated() {
   
  },
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
}
</script>

<style scoped>
  #details{
    height: 100vh;
    position: relative;
    z-index: 11;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }
  .detail-navbar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .backtop{
    bottom: 58px;
  }
</style>