<template>
  <div>
    <div
      v-for="item in charts"
      :key="item.value"
      :id="item.id"
      :class="item.class"
    ></div>
    <div v-show="isReady">暂无数据</div>
  </div>
</template>

<script>
import bus from '../assets/js/eventBus.js'
import { TitleComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
let echarts = require('echarts/lib/echarts')
echarts.use([TitleComponent])
echarts.use([LineChart])
echarts.use([LegendComponent])
echarts.use([TooltipComponent])
require('echarts/lib/chart/scatter')
export default {
  name: 'ScatterDiagram',
  data () {
    return {
      charts: [],
      isReady: false,
      num: 0
    }
  },
  created () {
    this.num = JSON.parse(localStorage.getItem('AimNum'))
    console.log(this.num)
  },
  methods: {
    drawEchartData (idName, option) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(idName))
      // 绘制图表
      myChart.setOption(option)
    },
    getAverage (res) {
      var total = 0
      for (var i = 0; i < res.length; i++) {
        total = total + res[i]
      }
      var average = (total / res.length).toFixed(3)
      return average
    },
    getSeries (res, average) {
      var series = [
        {
          symbolSize: 8,
          name: '达成度',
          data: res.map((num, index) => [index, num]),
          type: 'scatter'
        },
        {
          symbolSize: 0,
          name: '平均值',
          lineStyle: {
            type: 'dashed'
          },
          type: 'line',
          data: res.map((num, index) => [index, average])
        },
        {
          symbolSize: 0,
          name: '达成值',
          type: 'line',
          data: res.map((num, index) => [index, 0.701])
        }
      ]
      return series
    }
  },
  mounted () {
    if (JSON.parse(localStorage.getItem('ready'))) {
      try {
        let num = JSON.parse(localStorage.getItem('AimNum'))
        let _this = this
        for (let i = 1; i <= num; i++) {
          _this.charts.push({id: 'myChart' + i, class: 'diagram' + i})
          bus.$on('getResult' + i, (res) => {
            var average = this.getAverage(res)
            let option = {
              title: {
                text: '课程目标' + i,
                left: 'center',
                top: 0
              },
              legend: {
                data: ['达成度', '达成值', '平均值'],
                top: '25px'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                },
                position: 'top'
              },
              xAxis: {
                name: '学生人数',
                nameGap: 3,
                gridIndex: 0,
                min: 0,
                max: 50,
                axisTick: {
                  inside: true
                }
              },
              yAxis: {
                name: '达成度',
                axisTick: {
                  inside: true
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#5470C6'
                  }
                }
              },
              series: []
            }
            option.series = this.getSeries(res, average)
            setTimeout(() => {
              this.drawEchartData('myChart' + i, option)
            }, 300)
          })
        }
        this.isReady = false
      } catch (e) {
        console.log(e)
        this.$message.warning('计算出错，请稍后重试')
      }
    } else {
      this.isReady = true
    }
  }
}
</script>

<style lang="stylus" scoped>
  .diagram1
    position : absolute
    width : 500px
    height : 300px
    left: 0px
    top: 1px
  .diagram2
    position : absolute
    width : 500px
    height : 300px
    right: 10px
    top: 1px
  .diagram3
    position : absolute
    width : 500px
    height : 300px
    left: 0px
    top: 250px
  .diagram4
    position : absolute
    width : 500px
    height : 300px
    right: 10px
    top: 250px
  .diagram5
    position : absolute
    width : 500px
    height : 300px
    left: 0px
    top: 500px
  .diagram6
    position : absolute
    width : 500px
    height : 300px
    right: 10px
    top: 500px
</style>
