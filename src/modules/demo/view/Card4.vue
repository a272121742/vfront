<template>
  <div>
    <Card style="height: 240px;">
      <p slot="title">
        设备情况
      </p>
      <p>
        <EChart
          ref="pie"
          :auto-resize="true"
          :options="pie"
          style="height: 157px; width: 544px;"
          @click="onPieSelected"/>
      </p>
    </Card>
  </div>
</template>

<script>
import Vue from 'vue';
import ECharts from 'vue-echarts/components/ECharts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/dataZoom';

Vue.component('EChart', ECharts);

export default {
  data () {
    return {
      pie: {
        grid: {
          // show:true,
          left: '60%',
          top: '40%',
          bottom: '40%'
        },
        legend: {
          orient: 'vertical',
          x: '28%',
          top: 'center',
          data: ['A类设备', 'B类设备', 'C类设备'],
          icon: 'circle'
        },
        xAxis: {
          show: false,
          gridIndex: 0,
        },
        yAxis: {
          type: 'category',
          gridIndex: 0,
          axisLabel: {
            show: true, //让Y轴数据不显示
          },
          axisTick: {
            show: false, //隐藏Y轴刻度
          },
          axisLine: {
            show: false, //隐藏Y轴线段
          },
          data: ['启用', '维修']
        },
        series: [{
          name: '',
          id: 'pie',
          color: ['#0BB1DF', '#8A93FF', '#7DB1FD'],
          type: 'pie',
          radius: ['20%', '60%'],
          center: ['15%', '50%'],
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: [{
            name: 'A类设备',
            value: 271
          }, {
            name: 'B类设备',
            value: 74
          }, {
            name: 'C类设备',
            value: 35
          }]
        }, {
          type: 'bar',
          id: 'bar',
          itemStyle: {
            color: new ECharts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: '#0BB1DF'
            }, {
              offset: 1,
              color: '#BD73F9'
            }])
          },
          data: [{
            name: '维修',
            value: 3
          }, {
            name: '启用',
            value: 30
          }]
        }]
      },
    };
  },
  methods: {
		onPieSelected (options) {
			const chart = this.$refs.pie
			if(options.seriesId === 'pie'){
				chart.mergeOptions({
					series: {
						id: 'bar',
						data: [{
							name: '运行',
							value: parseInt(Math.random()*10)
						}, {
							name: '维修',
							value: parseInt(Math.random()*50)
						}]
					}
				});
			}
			return false;
		}
	}
}
</script>
