<template>
  <div>
    <div id='main' :style="{width:'400px',height:'500px'}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
export default {
  data () {
    return {
      Edata: [],
      rundata: []
    }
  },
  created () {
    let that = this
    axios.get('http://127.0.0.1:3000/userRunData?runId=123')
      .then(function (res) {
        that.rundata = res.data.data
        let date = new Date(that.rundata)
        console.log(date)
        console.log(that.rundata)
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  mounted () {
    let that = this
    function getVirtulData (year) {
      year = year || '2017'
      var date = +echarts.number.parseDate(year + '-01-01')
      var end = +echarts.number.parseDate(year + '-12-31')
      var dayTime = 3600 * 24 * 1000
      var data = []
      for (var time = date; time <= end; time += dayTime) {
        data.push([
          echarts.format.formatTime('yyyy-MM-dd', time),
          Math.floor(Math.random() * 10000)
        ])
      }
      return data
    }
    let myChart = echarts.init(document.getElementById('main'))
    var option = {
      backgroundColor: '#404a59',
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        show: true,
        min: 0,
        man: 1000
      },
      calendar: {
        range: ['2017-05-08', '2017-06-08'], // 设置一个展示的时间范围
        cellSize: '50', //  设置每隔小格的大小
        left: 'center', //  设置区块偏移距离
        splitLine: {
          show: true,
          lineStyle: {
            color: '#000',
            width: 2,
            type: 'dotted',
            shadowBlur: {
              color: 'RGB(97,97,97)',
              shadowBlur: 100
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#323c48',
            borderWidth: 1,
            borderColor: '#111'
          }
        }
      },
      series: {
        name: '步数',
        type: 'scatter',  //  选择散点气泡图
        coordinateSystem: 'calendar',
        data: getVirtulData(2017),
        symbolSize: '25', //  设置每个圆点气泡大小
        itemStyle: {
          normal: {
            color: '#ddb926'
          }
        }
      }
    }
    myChart.setOption(option)
  }
}
</script>

<style scoped>
#id{
  width: 600px;
  height: 600px;
}
</style>
