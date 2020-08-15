<template>
   <div class="tabbar-items" @click="itemsclick">
     <div v-if="!isActive"><slot name="items-icons"></slot></div>
     <div v-else> <slot name="items-icons-active"></slot></div>
     <div :class="{active:isActive}"> <slot name="items-text"></slot></div>
     </div>
</template>
<script>
export default {
  name: 'tabbaritems',
 computed: {
   isActive(){
     return this.$route.path.indexOf(this.path) !==-1
   }
 },
 props :{
   path :String
 },
  methods: {
    itemsclick(){
      this.$router.push(this.path)
    }
  },
}
</script>

<style scoped>
 .tabbar-items{
   flex: 1;
   text-align: center;
   height: 49px;
   font-size: 14px;
   padding-top: 5px;
 }
 .tabbar-items img{
     width: 24px;
     height: 24px;
     
     margin-bottom: 4px 0 2px 0;
    vertical-align: middle;
 }
 .active{
     color: red;
 }
</style>