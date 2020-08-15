<template>
  <div class="wrapper" ref="">
    <ul class="content">
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
      <li>hello</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'about',
  data() {
    return {
      scroll:null
    }
  },
  //创建组件后执行，但是dom还没挂载，获取不到'.wrapper'
  created() {
    // 错误代码
    // new BScroll(document.querySelector('.wrapper'),{})
    // let wrapper = document.querySelector('.wrapper');
    // this.scroll = new BScroll(wrapper,{
    // })
  },
  mounted() {
    //默认情况BScroll不可以实时监听滚动位置
    this.scroll = new BScroll(document.querySelector('.wrapper'),{
      // probe侦测
      // probeType 0,1 不侦测
      // 2:在手指滚动过程中侦测，手指离开后滚动不侦测
      // 3：只要是滚动就侦测
      probeType:3,
      click:true,
      pullUpload:true
    })
    this.scroll.on('scroll',(position) => {
      console.log(position);
    })
    this.scroll.on('pullingup',() => {
      // 发送网络请求，请求更多页的数据

      // 等数据请求完成，并且将数据展示出来
      setTimeout( () =>{
        this.scroll.finishPullup()
      },2000)
    })
  },
}
</script>

<style scoped>
  .wrapper{
    height: 140px;
    background-color: aqua;
    overflow: hidden;
  }
</style>
