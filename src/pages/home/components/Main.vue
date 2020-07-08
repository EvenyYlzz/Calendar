<template>
  <div class="state">
      <div class="title">
          <span class="iconfont">&#xe60f;</span>Calendar
      </div>
      <div class="content">
          <div class="content-button-top">
              <div class="shang">
                  北京时间：{{Time}}
                  <button class="shang-back" @click="getNow()">回到今天</button>
              </div>
              <div class="xia">
                  <button style="background-color:white" @click="subYear()">
                    <span class="iconfont">&#xe692;</span>
                  </button>
                  <button @click="yearXiala()" style="background-color:white">
                    {{year}}
                  <span class="iconfont">&#xe600;</span>
                  </button>
                  <button style="background-color:white" @click="plusYear()">
                    <span class="iconfont">&#xe691;</span>
                  </button>&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;
                  <button style="background-color:white" @click="subMonth()">
                    <span class="iconfont">&#xe692;</span>
                  </button>
                  <button @click="monthXiala()" style="background-color:white">
                    {{month}}
                    <span class="iconfont">&#xe600;</span>
                  </button>
                  <button style="background-color:white" @click="plusMonth()">
                    <span class="iconfont">&#xe691;</span>
                  </button>&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;
                  <button style="background-color:white" @click="subDate()">
                    <span class="iconfont">&#xe692;</span>
                  </button>
                  {{date}}
                  <button style="background-color:white" @click="plusDate()"><span class="iconfont">&#xe691;</span></button>
                  日
                  <ul class="year" :class="{'year-index':bool2}">
                    <li @click="yearGet" class="year-li" v-for="(item,index) in year100" :key="index">{{item}}</li>
                  </ul>
                  <ul class="month" :class="{'month-index':bool1}">
                    <li @click="monthGet" class="month-li" v-for="(item,index) in month12" :key="index">{{item}}</li>
                  </ul>
              </div>
          </div>
          <div class="content-calendar">
            <table class="calendar-table">
              <tbody class="calendar-tbody">
                <tr class="calendar-tr1">
                  <th class="calendar-th" v-for="(item,index) in tbodyDay" :key="index">{{item}}</th>
                </tr>
                <tr class="calendar-tr">
                  <td @click="handleGetNumber" :class="(date==item)?'hasColor':'calendar-td'" v-for="(item,index) in arr1" :key="index">{{item}}</td>
                </tr>
                <tr class="calendar-tr">
                  <td @click="handleGetNumber" :class="(date==item)?'hasColor':'calendar-td'" v-for="(item,index) in arr2" :key="index">{{item}}</td>
                </tr>
                <tr class="calendar-tr">
                  <td @click="handleGetNumber" :class="(date==item)?'hasColor':'calendar-td'" v-for="(item,index) in arr3" :key="index">{{item}}</td>
                </tr>
                <tr class="calendar-tr">
                  <td @click="handleGetNumber" :class="(date==item)?'hasColor':'calendar-td'" v-for="(item,index) in arr4" :key="index">{{item}}</td>
                </tr>
                <tr class="calendar-tr">
                  <td @click="handleGetNumber" :class="(date==item)?'hasColor':'calendar-td'" v-for="(item,index) in arr5" :key="index">{{item}}</td>
                </tr>
                <tr class="calendar-tr">
                  <td @click="handleGetNumber" :class="(date==item)?'hasColor':'calendar-td'" v-for="(item,index) in arr6" :key="index">{{item}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="content-button-bottom">
            <div class="learn">
              <button class="learn-button">学习打卡</button>
            </div>
            <div class="ill">
              <button class="ill-button">疫情打卡</button>
            </div>
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
          date: 0,
          tbodyDay: ['日','一','二','三','四','五','六'],
          monthdays: 0,
          dateday:0,
          arr1:[],
          arr2:[],
          arr3:[],
          arr4:[],
          arr5:[],
          arr6:[],
          bool1: false,
          bool2: false,
          month12:[1,2,3,4,5,6,7,8,9,10,11,12],
          year100:[2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]
      }
    },
    watch:{
      month() {
         this.monthdays = new Date(this.year,this.month,0).getDate()
         this.dateday = new Date(this.year,this.month-1,1).getDay()
         this.arrControl()
         this.bool1 = false
         this.bool2 = false
      },//监听月份
      year() {
         this.monthdays = new Date(this.year,this.month,0).getDate()
         this.dateday = new Date(this.year,this.month-1,1).getDay()
         this.arrControl()
         this.bool1 = false
         this.bool2 = false
      },//监听年份     月份年份改变的时候，重新获取该月天数与该月一号星期几，再调用日历生成函数
      date() {
        this.bool1 = false
        this.bool2 = false
      }
    },
    computed:{
    },
    methods: {
      upDatenowTime () {
        setInterval(this.nowTime,1000) // 这里面的this.nowTime不用在后面加括号，否则执行不了
        console.log("开启定时器")
      }, //设置定时器刷新页面实时北京时间
      nowTime () {
        const date = new Date
        this.Time = date.toLocaleTimeString()
      },//获取此时实时时间，精确到秒
      nowYear () {
        const date = new Date
        this.year = date.getFullYear()
      },//获取今年年份
      nowMonth () {
        const date = new Date
        this.month = date.getMonth()+1 //注意月份的获取要+1
      },//获取今年该月月份
      nowDateDay () {
        const date = new Date
        this.date = date.getDate()
      },//获取今年该月改日期
      subYear () {
        this.year--
      },//按钮年份-1
      plusYear () {
        this.year++
      },//按钮年份+1
      subMonth () {
        this.month--
        if (this.month==0) {
          this.year--
          this.month=12
        }
      },//按钮月份-1
      plusMonth () {
        this.month++
        if (this.month==13) {
          this.year++
          this.month=1
        }
      },//按钮月份+1
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
      },//按钮日期-1
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
      },//按钮
      getNow () {
        this.nowYear()  
        this.nowMonth() 
        this.nowDateDay()
        this.bool1=false
      },//获取此时年月日
      getOneMonthDays () {
        this.monthdays = new Date(this.year,this.month,0).getDate()
      },//获取某月天数
      getDayOfWeek () {
        this.dateday = new Date(this.year,this.month-1,1).getDay() //month必须-1
      },//获取某天星期几
      arr4Ri(){
        this.arr1 = [1,2,3,4,5,6,7]
        this.arr2 = [8,9,10,11,12,13,14]
        this.arr3 = [15,16,17,18,19,20,21]
        this.arr4 = [22,23,24,25,26,27,28]
        this.arr6 = ['','','','','','','']
      },//控制周日是一号的前4个数组+第六个数组
      arr4Yi(){
        this.arr1 = ['',1,2,3,4,5,6]
        this.arr2 = [7,8,9,10,11,12,13]
        this.arr3 = [14,15,16,17,18,19,20]
        this.arr4 = [21,22,23,24,25,26,27]
        this.arr6 = ['','','','','','','']
      },//控制周一是一号的前4个数组+第六个数组
      arr4Er(){
        this.arr1 = ['','',1,2,3,4,5]
        this.arr2 = [6,7,8,9,10,11,12]
        this.arr3 = [13,14,15,16,17,18,19]
        this.arr4 = [20,21,22,23,24,25,26]
        this.arr6 = ['','','','','','','']
      },//控制周二是一号的前4个数组+第六个数组
      arr4San(){
        this.arr1 = ['','','',1,2,3,4]
        this.arr2 = [5,6,7,8,9,10,11]
        this.arr3 = [12,13,14,15,16,17,18]
        this.arr4 = [19,20,21,22,23,24,25]
        this.arr6 = ['','','','','','','']
      },//控制周三是一号的前4个数组+第六个数组
      arr4Si(){
        this.arr1 = ['','','','',1,2,3]
        this.arr2 = [4,5,6,7,8,9,10]
        this.arr3 = [11,12,13,14,15,16,17]
        this.arr4 = [18,19,20,21,22,23,24]
        this.arr6 = ['','','','','','','']
      },//控制周四是一号的前4个数组+第六个数组
      arr4Wu(){
        this.arr1 = ['','','','','',1,2]
        this.arr2 = [3,4,5,6,7,8,9]
        this.arr3 = [10,11,12,13,14,15,16]
        this.arr4 = [15,18,19,20,21,22,23]
      },//控制周五是一号的前4个数组
      arr4Liu(){
        this.arr1 = ['','','','','','',1]
        this.arr2 = [2,3,4,5,6,7,8]
        this.arr3 = [9,10,11,12,13,14,15]
        this.arr4 = [16,17,18,19,20,21,22]
      },//控制周六是一号的前4个数组
      arrControl () {
        if(this.dateday==0){
          this.arr4Ri()
          if(this.monthdays==28){
            this.arr5 = ['','','','','','','']
          }
          else if(this.monthdays==29){
            this.arr5 = [29,'','','','','','']
          }
          else if(this.monthdays==30){
            this.arr5 = [29,30,'','','','','']
          }
          else if(this.monthdays==31){
            this.arr5 = [29,30,31,'','','','']
          }
        }//控制周日是一号的第5个数组
        else if(this.dateday==1){
          this.arr4Yi()
          if(this.monthdays==28){
            this.arr5 = [28,'','','','','','']
          }
          else if(this.monthdays==29){
            this.arr5 = [28,29,'','','','','']
          }
          else if(this.monthdays==30){
            this.arr5 = [28,29,30,'','','','']
          }
          else if(this.monthdays==31){
            this.arr5 = [28,29,30,31,'','','']
          }
        }//控制周一是一号的第5个数组
        else if(this.dateday==2){
          this.arr4Er()
          if(this.monthdays==28){
            this.arr5 = [27,28,'','','','','']
          }
          else if(this.monthdays==29){
            this.arr5 = [27,28,29,'','','','']
          }
          else if(this.monthdays==30){
            this.arr5 = [27,28,29,30,'','','']
          }
          else if(this.monthdays==31){
            this.arr5 = [27,28,29,30,31,'','']
          }
        }//控制周二是一号的第5个数组
        else if(this.dateday==3){
          this.arr4San()
          if(this.monthdays==28){
            this.arr5 = [26,27,28,'','','','']
          }
          else if(this.monthdays==29){
            this.arr5 = [26,27,28,29,'','','']
          }
          else if(this.monthdays==30){
            this.arr5 = [26,27,28,29,30,'','']
          }
          else if(this.monthdays==31){
            this.arr5 = [26,27,28,29,30,31,'']
          }
        }//控制周三是一号的第5个数组
        else if(this.dateday==4){
          this.arr4Si()
          if(this.monthdays==28){
            this.arr5 = [25,26,27,28,'','','']
          }
          else if(this.monthdays==29){
            this.arr5 = [25,26,27,28,29,'','']
          }
          else if(this.monthdays==30){
            this.arr5 = [25,26,27,28,29,30,'']
          }
          else if(this.monthdays==31){
            this.arr5 = [25,26,27,28,29,30,31]
          }
        }//控制周四是一号的第5个数组
        else if(this.dateday==5){
          this.arr4Wu()
          if(this.monthdays==28){
            this.arr5 = [24,25,26,27,28,'','']
            this.arr6 = ['','','','','','','']
          }
          else if(this.monthdays==29){
            this.arr5 = [24,25,26,27,28,29,'']
            this.arr6 = ['','','','','','','']
          }
          else if(this.monthdays==30){
            this.arr5 = [24,25,26,27,28,29,30]
            this.arr6 = ['','','','','','','']
          }
          else if(this.monthdays==31){
            this.arr5 = [24,25,26,27,28,29,30]
            this.arr6 = [31,'','','','','','']
          }
        }//控制周五是一号的后2个数组
        else if(this.dateday==6){
          this.arr4Liu()
          if(this.monthdays==28){
            this.arr5 = [23,24,25,26,27,28,'']
            this.arr6 = ['','','','','','','']
          }
          else if(this.monthdays==29){
            this.arr5 = [23,24,25,26,27,28,29]
            this.arr6 = ['','','','','','','']
          }
          else if(this.monthdays==30){
            this.arr5 = [23,24,25,26,27,28,29]
            this.arr6 = [30,'','','','','','']
          }
          else if(this.monthdays==31){
            this.arr5 = [23,24,25,26,27,28,29]
            this.arr6 = [30,31,'','','','','']
          }
        }//控制周六是一号的后2个数组
      },
      handleGetNumber (e) {
        if(e.target.innerText==''){
          return
        }
        else{
          this.date = e.target.innerText
        }
      },
      monthXiala() {
        this.bool1=!this.bool1
      },
      monthGet (e) {
        this.month = e.target.innerText
      },
      yearXiala() {
        this.bool2=!this.bool2
      },
      yearGet (e) {
        this.year = e.target.innerText
      }
    },
    mounted () {
      this.upDatenowTime()
      this.getNow()//挂载即获取此时年月日
      this.getOneMonthDays()//获取某月天数
      this.getDayOfWeek()//获取某天星期几
      this.arrControl()//写入日历数组
    },
    updated () {
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
    top:1.25rem
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
                .shang-back
                    border-radius:20%
            .xia
                height:.75rem
                line-height:.75rem
                width :100%
                position :relative
                .month-index
                    z-index :2
                .month
                    position : absolute
                    width:0.5rem
                    height:5rem
                    top:0.75rem
                    left:3.65rem
                    overflow :auto
                    background-color:#F5F5F5
                    border-right:1px solid #D3D3D3
                    border-left:1px solid #D3D3D3
                    border-bottom:1px solid #D3D3D3
                    .month-li
                        height:0.5rem
                .year-index
                    z-index :2
                .year
                    position : absolute
                    width:0.8rem
                    height:5rem
                    top:0.75rem
                    left:1.5rem
                    overflow :auto
                    background-color:#F5F5F5
                    border-right:1px solid #D3D3D3
                    border-left:1px solid #D3D3D3
                    border-bottom:1px solid #D3D3D3
                    .year-li
                        height:0.5rem
        .content-calendar
            position:relative
            z-index:1
            height :7rem
            .calendar-table
                background-color :white
                width:100%
                border-right:1px solid #D3D3D3
                border-top:1px solid #D3D3D3
                border-left:1px solid #D3D3D3
                border-bottom:1px solid #D3D3D3
                .calendar-tbody
                    background-color :white
                    .calendar-tr1
                        text-align :center
                        height:1rem
                        line-height :1rem
                        border-bottom:1px solid #D3D3D3
                        .calendar-th
                            background-color :white
                            border-right:1px solid #D3D3D3
                    .calendar-tr
                        text-align :center
                        height:1rem
                        line-height :1rem
                        border-bottom:1px solid #D3D3D3
                        .calendar-td
                            border-right:1px solid #D3D3D3
                        .hasColor
                            background-color :#1E90FF
                            border-right:1px solid #D3D3D3
                            color:white
                            font-weight:bold
        .content-button-bottom
            height:.75rem
            line-height:.75rem
            width:100%
            font-size:.35rem
            .learn
                height:.75rem
                float:left
                width:50%
                text-align:center
                .learn-button
                    border-radius:20%
            .ill
                height:.75rem
                float:left
                width:50%
                text-align:center
                .ill-button
                    border-radius:20%
</style>