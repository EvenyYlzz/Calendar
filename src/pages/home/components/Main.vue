<template>
  <div class="state">
      <div class="title">
          <span class="iconfont">&#xe60f;</span>Calendar
      </div>
      <div class="content">
          <div class="content-button-top">
              <div class="shang">
                  北京时间：{{Time}}
                  <button>回到今天</button>
              </div>
              <div class="xia">
                  <button><span class="iconfont">&#xe692;</span></button>
                  {{year}}
                  <button><span class="iconfont">&#xe691;</span></button>年
                  <button><span class="iconfont">&#xe692;</span></button>
                  {{month}}
                  <button><span class="iconfont">&#xe691;</span></button>月
              </div>
          </div>
          <div class="content-calendar">

          </div>
          <div class="content-button-bottom">

          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'HomeMain',
    data() {
      return {
          Time: '',
          year: 0,
          month: 0
      }
    },
    computed:{
      
    },
    methods: {
      upDatenowTime () {
        setInterval(this.nowTime,1000) // 这里面的this.nowTime不用在后面加括号，否则执行不了
        console.log("开启定时器")
      },
      nowTime () {
        const date = new Date
        this.Time = date.toLocaleTimeString()
        console.log("获取时间"+this.Time)
      },
      nowYear () {
        const date = new Date
        this.year = date.getFullYear()
      },
      nowMonth () {
        const date = new Date
        this.month = date.getMonth()+1 //注意月份的获取要+1
      }
    },
    mounted () {
      this.upDatenowTime()
      this.nowYear()  //挂载即获取当前年份
      this.nowMonth() //挂载即获取当前月份
    },
    beforeDestroy () {
      if (this.nowTime) {
            console.log("销毁定时器")
            clearInterval(this.nowTime) // 在Vue实例销毁前，清除时间定时器,不销毁定时器，定时器叠加，耗费不必要性能
        }
    }
}
</script>

<style lang="stylus" scoped>
.state
    position :relative
    top:2.5rem
    width :100%
    .title
        height:.75rem
        text-align :center
        line-height :.75rem
        font-size : .5rem
        width :100%
    .content
        .content-button-top
            height:1.5rem
            line-height:1.5rem
            width :100%
            text-align :center //水平居中
            .shang
                height:.75rem
                line-height:.75rem
                width :100%
            .xia
                height:.75rem
                line-height:.75rem
                width :100%
        .content-calendar
            background-color:pink
            height :5rem
        .content-button-bottom
            background-color:orange
            height:.75rem
</style>