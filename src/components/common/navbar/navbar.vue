<template>
  <div class="NavBar">
  <div class="left"><slot name="left"></slot></div>
  <div class="center"><slot name="center"></slot></div>
  <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
export default {
  name: 'navbar',
}
</script>
<style scoped>
.NavBar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.2);
}
.left{
  width: 60px;
}
.right{
  width: 60px;
}
.center{
    flex: 1;
}
</style>