<template>
  <div>
    <div id='myChart1' class='diagram1'></div>
    <div id='myChart2' class='diagram2'></div>
    <div id='myChart3' class='diagram3'></div>
    <div id='myChart4' class='diagram4'></div>
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
      option1: {
        title: {
          text: '课程目标1',
          left: 'center',
          top: 0
        },
        legend: {
          data: ['达成度', '达成值', '平均值'],
          top: '25px'
        },
        xAxis: {
          name: '学生人数',
          nameLocation: 'end',
          nameGap: 3,
          min: 0,
          max: 50,
          interval: 10,
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
        series: []
      },
      option2: {
        title: {
          text: '课程目标2',
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
      },
      option3: {
        title: {
          text: '课程目标3',
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
      },
      option4: {
        title: {
          text: '课程目标4',
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
    }
  },
  methods: {
    drawEchartData (idName, option) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(idName))
      // 绘制图表
      console.log(option)
      myChart.setOption(option)
    },
    getAverage (res) {
      var total = 0
      console.log(res)
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
    for (var i = 1; i < 5; i++) {
      Object.defineProperty(document.getElementById('myChart' + i), 'clientWidth', { get: function () { return 500 } })
      Object.defineProperty(document.getElementById('myChart' + i), 'clientHeight', { get: function () { return 300 } })
    }
    bus.$on('getResult1', (res) => {
      var average = this.getAverage(res)
      this.option1.series = this.getSeries(res, average)
      setTimeout(() => {
        this.drawEchartData('myChart1', this.option1)
      }, 300)
    })
    bus.$on('getResult2', (res) => {
      var average = this.getAverage(res)
      this.option2.series = this.getSeries(res, average)
      setTimeout(() => {
        this.drawEchartData('myChart2', this.option2)
      }, 300)
    })
    bus.$on('getResult3', (res) => {
      var average = this.getAverage(res)
      this.option3.series = this.getSeries(res, average)
      setTimeout(() => {
        this.drawEchartData('myChart3', this.option3)
      }, 300)
    })
    bus.$on('getResult4', (res) => {
      var average = this.getAverage(res)
      this.option4.series = this.getSeries(res, average)
      setTimeout(() => {
        this.drawEchartData('myChart4', this.option4)
      }, 300)
    })
  }
}
</script>

<style lang="stylus" scoped>
  .diagram1
    position : absolute
    width : 200px
    height : 200px
    left: 0px
    top: 1px
  .diagram2
    position : absolute
    width : 200px
    height : 200px
    right: 320px
    top: 1px
  .diagram3
    position : absolute
    width : 200px
    height : 200px
    left: 0px
    top: 250px
  .diagram4
    position : absolute
    width : 200px
    height : 200px
    right: 320px
    top: 250px
</style>
