<template>
  <div>
    <div id='main' :style="{width:'auto',height:'500px'}"></div>
    <div id='two' :style="{width:'auto',height:'500px'}"></div>
    <div id='three' :style="{width:'auto',height:'500px'}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
export default {
  data () {
    return {
      rundata: []
    }
  },
  created () {
    let that = this
    let rundataTemp
    if (that.$store.state.data.data) {
      rundataTemp = JSON.parse(sessionStorage.ls_data)
    } else {
      rundataTemp = that.$store.state.data.data
    }
    for (let i = 0; i < rundataTemp.length; i++) {
      let dateTemp = new Date(rundataTemp[i].timestamp * 1000)
      let step = rundataTemp[i].step
      that.rundata.push([
        echarts.format.formatTime('yyyy-MM-dd', dateTemp),
        step
      ])
    }
  },
  mounted () {
    let that = this
    let myChartTwo = echarts.init(document.getElementById('two'))
    let rundata = (that.rundata).reverse()
    let arrLength = rundata.length
    let twoDateArr = []
    let twoData = []
    for (let i = 0; i < arrLength; i++) {
      twoDateArr.push(rundata[i][0].slice(5))
      twoData.push(rundata[i][1])
    }
    let links = twoData.map(function (item, i) {
      return {
        source: i,
        target: i + 1
      }
    })
    myChartTwo.setOption({
      title: {
        text: '笛卡尔坐标系上的 每天运动步数',
        padding: [
          5, // 上
          10, // 右
          5,  // 下
          400 // 左
        ],
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowBlur: 10
      },
      tooltip: {}, // 设置鼠标移动上去显示数据
      xAxis: {
        type: 'category', // 坐标轴类型,'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据
        boundary: false,
        data: twoDateArr
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'graph',  // 用于展现节点以及节点之间的关系数据。
          layout: 'none',
          coordinateSystem: 'cartesian2d',  // 该系列使用的坐标系
          symbolSize: 40,
          label: { // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
            normal: {
              show: true,
              color: '#fff'
            }
          },
          edgeSymbol: ['circle', 'arrow'], // 边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，
          edgeSymbolSize: [4, 10], // 边两端的标记大小，可以是一个数组分别指定两端
          data: twoData,
          links: links,
          lineStyle: {
            normal: {
              color: '#2f4554'
            }
          }
        }
      ]
    })
    let firstDay = that.rundata[0][0]
    let lastDay = that.rundata[30][0]
    // 画图
    let myChart = echarts.init(document.getElementById('main'))
    var option = {
      title: {
        text: '日历图上 每天运动步数',
        padding: [
          30, // 上
          10, // 右
          5,  // 下
          400 // 左
        ],
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowBlur: 10,
        textStyle: {
          color: 'RGB(145,151,159)'
        }
      },
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
        range: [firstDay, lastDay], // 设置一个展示的时间范围
        cellSize: '50', //  设置每隔小格的大小
        left: 'center', //  设置区块偏移距离
        splitLine: {
          show: true,
          lineStyle: {
            color: '#000', // 边框颜色
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
        },
        dayLabel: {
          margin: 20,
          nameMap: 'cn',
          textStyle: {
            color: 'RGB(145,151,159)',
            fontWeight: 'bold'
          }
        },
        yearLabel: {
          margin: 60,
          textStyle: {
            color: 'RGB(145,151,159)',
            fontWeight: 'bold'
          }
        },
        monthLabel: {
          margin: 20,
          nameMap: 'cn',
          textStyle: {
            color: 'RGB(145,151,159)',
            fontWeight: 'bold'
          }
        }
      },
      series: [
        {
          name: '步数',
          type: 'scatter',  //  选择散点气泡图
          data: that.rundata,
          coordinateSystem: 'calendar',
          symbolSize: '25', //  设置每个圆点气泡大小
          itemStyle: {
            normal: {
              color: '#ddb926'
            }
          }
        }, {
          name: 'Top 12',
          type: 'effectScatter',
          coordinateSystem: 'calendar',
          calendarIndex: 1,
          data: that.rundata.sort(function (a, b) {
            return b[1] - a[1]
          }).slice(0, 10),
          symbolSize: '50',
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          itemStyle: {
            normal: {
              color: '#f4e925',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          }
        }
      ]
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
