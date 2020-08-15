<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
        class="check-button" 
        :is-check = 'selectAll'
        @click.native="btnClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice.toFixed(2)}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算:({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'view/cars/childComps/CheckButton'

export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  computed: {
    totalPrice(){
      return this.$store.state.cartList.filter( item => {
        return item.checked 
      }).reduce( (preValue, item) => {
        return preValue + item.price* item.count
      },0)
    },
    checkLength(){
      return this.$store.state.cartList.filter( item => {
        return item.checked
      }).length
    },
    selectAll(){
      // if(this.$store.state.cartList.length === 0) return false
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      // return !this.$store.state.cartList.find(item => !item.checked)
      return this.$store.state.cartList.length === 0 ? false : !this.$store.state.cartList.find(item => !item.checked)

    }
  },
  methods: {
    btnClick(){
      if(this.selectAll){
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
      
    },
    calcClick(){
      if(this.checkLength === 0 ){
        this.$toast.show('请添加商品', 1500)
      }
    }
  },
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    width: 100%;
    
    position: absolute;
    bottom: 49px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
  .check-content{
    width: 60px;
    display: flex; 
    align-items: center;
    justify-content: center;
    margin-left: 10px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 8px;
  }
  .price{
    flex: 1;
    margin-left: 30px;
  }
  .calculate{
    width: 100px;
    height: 100%;
    background-color: red;
    line-height: 40px;
    color: #fff;
    padding-left: 10px;
  }
</style>