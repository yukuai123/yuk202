<template>
    <div class="display">

        <div ref="myChart" id="myChart" :style="{width: '100%', height: '100%'}"></div>
    </div>
</template>

<script>
  import util from '@/util/filter';
  import echarts from '@/util/echarts';
  import { getAllPage } from '@/util/apiMethods';

  let getDay = util.generateDay,
    getLen = util.getWord;

  export default {
    name: "display",
    data() {
      return {
        pageData: []
      }
    },
    methods: {

      initCharts() {
        let myChart = echarts.init(this.$refs.myChart),

        getVirtulData = (year = '2019') => {
          let date = +echarts.number.parseDate(year + '-01-01'),
            end = +echarts.number.parseDate((+year + 1) + '-01-01'),
            dayTime = 3600 * 24 * 1000,
            data = [];

          for (let time = date; time < end; time += dayTime) {
            data.push([
              echarts.format.formatTime('yyyy-MM-dd', time),
              0,
            ]);
          }
          return data;
        };

        let year = new Date().getFullYear(), data =  this.getData(getVirtulData(year));


        let option = {
          backgroundColor: '#404a59',

          title: {
            top: 30,
            text: '博客统计',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              if (params.data[1] === 0)return;
              return params.data[0]
                +'</br>'
                + (params.data[2]>1?`${params.data[2]}篇文章`: params.data[3])
                +'</br>'
                +`${params.data[1]}字`
                + '</br>';
            }
          },
          legend: {
            top: '30',
            left: '100',
            data: ['字数', '> 600'],
            textStyle: {
              color: '#fff'
            }
          },
          calendar: [{
            top: 100,
            left: 'center',
            range: [year + '-01-01', year + '-06-30'],
            splitLine: {
              show: true,
              lineStyle: {
                color: '#000',
                width: 4,
                type: 'solid'
              }
            },
            yearLabel: {
              formatter: '{start}  1st',
              textStyle: {
                color: '#fff'
              }
            },
            itemStyle: {
              normal: {
                color: '#323c48',
                borderWidth: 1,
                borderColor: '#111'
              }
            }
          }, {
            top: 340,
            left: 'center',
            range: [year + '-07-01', year + '-12-31'],
            splitLine: {
              show: true,
              lineStyle: {
                color: '#000',
                width: 4,
                type: 'solid'
              }
            },
            yearLabel: {
              formatter: '{start}  2nd',
              textStyle: {
                color: '#fff'
              }
            },
            itemStyle: {
              normal: {
                color: '#323c48',
                borderWidth: 1,
                borderColor: '#111'
              }
            }
          }],
          series: [
            {
              name: '字数',
              type: 'scatter',
              coordinateSystem: 'calendar',
              data: data,
              symbolSize: function (val) {
                if (val[1] && val[2] > 1){ return 10 } else if (val[1]) { return 5 }else{ return 0 }
              },
              itemStyle: {
                normal: {
                  color: '#ddb926'
                }
              }
            },
            {
              name: '字数',
              type: 'scatter',
              coordinateSystem: 'calendar',
              calendarIndex: 1,
              data: data,
              symbolSize: function (val) {
                if (val[1]&&val[2]>1){ return 10 }else if (val[1]) { return 5}else{ return 0}
              },
              itemStyle: {
                normal: {
                  color: '#ddb926'
                }
              }
            },
            {
              name: '> 600',
              type: 'effectScatter',
              coordinateSystem: 'calendar',
              calendarIndex: 1,
              data: data,
              symbolSize: function (val) {
                return val[1] > 600? 10: 0;
              },
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
              },
              zlevel: 1
            },
            {
              name: '> 600',
              type: 'effectScatter',
              coordinateSystem: 'calendar',
              data: data,
              symbolSize: function (val) {
                return val[1] > 600? 10: 0;
              },
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
              },
              zlevel: 1
            }
          ]
        };

        myChart.setOption(option);
      },

      getData(target) {
        let filterArr = this.pageData.map((i) => {
          return {
            time: getDay(i.create_time)().use,
            word: getLen(i.content),
            title: i.title
          }
        });

        //根据我们目前的所有博客 给echarts初始化数据
        filterArr.forEach((i) => {
          if (target[i.time][1] !== 0){
            target[i.time][1] += i.word;
            target[i.time][2] = ++target[i.time][2];
          }else{
            target[i.time][1] = i.word;
            target[i.time][2] = 1;
            target[i.time][3] = i.title;
          }
        });

        return target;

      }
    },


    mounted() {
      //下一步是统计字数 拿到 把时间和字数标题存在一个数组中 我们最后显示的只是时间和字数
      getAllPage(this, null, (res, err) => {
        if (err) return console.log(err);
        this.pageData = res.data;

        this.initCharts();
      })
    },

  }
</script>

<style lang="scss">
    .display {
        height: 100%;
        font-size: 1.5rem;
    }
</style>
