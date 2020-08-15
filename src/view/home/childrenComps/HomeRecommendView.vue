<template>
  <div class="recommends">
    <div class="recommends-item" v-for=" (item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
      <!-- <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a> -->
    </div>
  </div>
</template>

<script>

export default {
  name:'HomeRecommendView',
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommends{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .recommends-item{
    flex: 1;
  }
  .recommends-item img {
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
  }
</style>