<template >
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name:'Scroll',
    data() {
        return {
            scroll:null,
            wrapper:null,
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    methods: { 
        scrollTo(x, y, time = 500){
           this.scroll && this.scroll.scrollTo(x, y ,time)
        },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll && this.scroll.refresh()
        },
        getScrollY(){
            return this.scroll ? this.scroll.y : 0
        }
    },
    mounted() {
        this.wrapper =this.$refs.wrapper
        // 创建BScroll对象
        this.scroll = new BScroll(this.wrapper,{
            // probeType:3,
            probeType:this.probeType,
            click:true,
            // pullUpload:true
            pullUpLoad:this.pullUpLoad
            
        })

        // 监听滚动的位置
        if( this.probeType == 2 || this.probeType ==3){
            this.scroll.on('scroll',(position) => {
                this.$emit("scroll",position)
            })
        }
        // 监听上拉事件
        if(this.pullUpLoad){
            this.scroll.on("pullingUp", ()=>{
            this.$emit("pullingUp")
            })
        }
        
    },
    
}
</script>

<style  scoped>

</style>