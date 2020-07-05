<template>
  <div class="state">
      <div class="title">
          <span class="iconfont">&#xe60f;</span>Calendar
      </div>
      <div class="content">
          <div class="content-button-top">
              <div class="shang">
                  北京时间：{{Time}}
                  <button @click="getNow()">回到今天</button>
              </div>
              <div class="xia">
                  <button @click="subYear()"><span class="iconfont">&#xe692;</span></button>
                  {{year}}
                  <button @click="plusYear()"><span class="iconfont">&#xe691;</span></button>年
                  <button @click="subMonth()"><span class="iconfont">&#xe692;</span></button>
                  {{month}}
                  <button @click="plusMonth()"><span class="iconfont">&#xe691;</span></button>月
                  <button @click="subDate()"><span class="iconfont">&#xe692;</span></button>
                  {{date}}
                  <button @click="plusDate()"><span class="iconfont">&#xe691;</span></button>
                  日
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
          month: 0,
          date: 0
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
      },
      nowYear () {
        const date = new Date
        this.year = date.getFullYear()
      },
      nowMonth () {
        const date = new Date
        this.month = date.getMonth()+1 //注意月份的获取要+1
      },
      nowDateDay () {
        const date = new Date
        this.date = date.getDate()
      },
      subYear () {
        this.year--
      },
      plusYear () {
        this.year++
      },
      subMonth () {
        this.month--
        if (this.month==0) {
          this.year--
          this.month=12
        }
      },
      plusMonth () {
        this.month++
        if (this.month==13) {
          this.year++
          this.month=1
        }
      },
      subDate () {
        if(this.year % 4 == 0 && this.year % 100 != 0 || this.year % 400 == 0){
          if(this.month==1 || this.month==4 || this.month==6 || this.month==8 || this.month==9 || this.month==11){
            this.date--
            if(this.date==0){
              this.month--
              this.date=31
              if(this.month==0){
                this.year--
                this.month=12
              }
            }
          }
          else if(this.month==3){
            this.date--
            if(this.date==0){
              this.month--
              this.date=29
            }
          }
          else if(this.month==2 || this.month==5 || this.month==7 || this.month==10 || this.month==12){
            this.date--
            if(this.date==0){
              this.month--
              this.date=30
            }
          }
        } else{
          if(this.month==1 || this.month==4 || this.month==6 || this.month==8 || this.month==9 || this.month==11){
            this.date--
            if(this.date==0){
              this.month--
              this.date=31
              if(this.month==0){
                this.year--
                this.month=12
              }
            }
          }
          else if(this.month==3){
            this.date--
            if(this.date==0){
              this.month--
              this.date=28
            }
          }
          else if(this.month==2 || this.month==5 || this.month==7 || this.month==10 || this.month==12){
            this.date--
            if(this.date==0){
              this.month--
              this.date=30
            }
          }
        }
      },
      plusDate () {
        if(this.year % 4 == 0 && this.year % 100 != 0 || this.year % 400 == 0){
          if(this.month==1 || this.month==3 || this.month==5 || this.month==7 || this.month==8 || this.month==10 || this.month==12){
            this.date++
            if(this.date==32){
              this.date=1
              this.month++
              if(this.month==13){
                this.month=1
                this.year++
              }
            }
          }
          else if(this.month==2){
            this.date++
            if(this.date==30){
              this.date=1
              this.month++
            }
          }
          else if(this.month==4 || this.month==6 || this.month==9 || this.month==11){
            this.date++
            if(this.date==31){
              this.date=1
              this.month++
            }
          }
        } else{
          if(this.month==1 || this.month==3 || this.month==5 || this.month==7 || this.month==8 || this.month==10 || this.month==12){
            this.date++
            if(this.date==32){
              this.date=1
              this.month++
              if(this.month==13){
                this.month=1
                this.year++
              }
            }
          }
          else if(this.month==2){
            this.date++
            if(this.date==29){
              this.date=1
              this.month++
            }
          }
          else if(this.month==4 || this.month==6 || this.month==9 || this.month==11){
            this.date++
            if(this.date==31){
              this.date=1
              this.month++
            }
          }
        }
      },
      getNow () {
        this.nowYear()  
        this.nowMonth() 
        this.nowDateDay() 
      }
    },
    mounted () {
      this.upDatenowTime()
      this.nowYear()  //挂载即获取当前年份
      this.nowMonth() //挂载即获取当前月份
      this.nowDateDay() 
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