<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :is-check = "item.checked" @click.native="checkClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="item.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{item.title}}</div>
      <div class="item-desc">商品描述: {{item.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{item.price}}</div>
        <div class="item-count right">x{{item.count}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckButton from "view/cars/childComps/CheckButton";
export default {
  name: "App",
  components: {
    CheckButton
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods:{
    checkClick(){
      this.item.checked = !this.item.checked
    }
  }
};
</script>
<style  scoped>
 #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }.item-img img{
    /* width: 100px; */
    height: 100%;
}
.item-info{
    flex: 1 1;
} 
</style>