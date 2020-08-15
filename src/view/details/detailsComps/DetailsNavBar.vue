<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" 
        @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div 
          v-for="(item,index) in titles" 
          :key="index"
          class="title-item"
          :class="{active : currentIndex === index}"
          @click="itemClick(index)">{{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/navbar'

export default {
  name:'DetailsNavBar',
  components:{
    NavBar
  },
  data() {
    return {
      titles:['商品', '参数', '评论', '推荐'],
      currentIndex:0
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex =  index
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()
    }
  },
}
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
    font-size: 15px;
  }
  .active{
    color: var(--color-high-text);
  }
  .back{
    padding-top: 6px;
  }
</style>