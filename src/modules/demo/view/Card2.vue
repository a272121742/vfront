<template>
  <div>
    <Card height="240px;">
      <p slot="title">设备利用率分析</p>
      <p id="chart">
        <Tabs value="name1">
          <TabPane
            label="月分析"
            name="name1">
            <EChart
              :auto-resize="true"
              :options="lineMonth"
              style="height:105px;"/>
          </TabPane>
          <TabPane
            label="周分析"
            name="name2">
            <EChart
              :auto-resize="true"
              :options="lineWeek"
              style="height:105px;"/>
          </TabPane>
        </Tabs>
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

function createMonthData () {
	const todayMonth = new Date().getMonth();
	const todayYear = new Date().getFullYear();
	const month = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
	const monthData = [];
	const monthValue = [];
	const monthLength = 60;
	let beginYear = todayYear - monthLength / 12;
	for (let i = 0; i < monthLength; i++) {
		const index = (i + 12 + todayMonth) % 12;
		if (index === 0) {
			++beginYear;
		}
		monthData.push(beginYear + '年\n' + month[index]);
		monthValue.push(600 + Math.random() * 400);
	}
	return {
		monthData,
		monthValue
	}
}
function createWeekData () {
	let beginYear = 2018;
	let beginWeek = 21;
	const weekData = [];
	const weekValue = [];
	for (let i = 260; i > 0; i--) {
		if ((beginWeek + 260) % 52 + 1 === 52) {
			beginYear--;
		}
		weekData.unshift(beginYear + '年\n' + ((beginWeek-- + 260) % 52 + 1) + '周');
		weekValue.push(380 + Math.random() * 120);
	}
	return {
		weekData,
		weekValue
	}
}

const mData = createMonthData();
const wData = createWeekData();
export default {

  data () {
    return {
      lineMonth: {
        grid: {
          top: '4%',
          left: '4%',
          right: '14%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        toolbox: {
          show: false,
          right: '12%',
          top: '0%',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        dataZoom: [
          {
            show: true,
            startValue: mData.monthValue.length - 12,
            endValue: mData.monthValue.length - 1
          },
          {
            type: 'inside',
            startValue: mData.monthValue.length - 12,
            endValue: mData.monthValue.length - 1
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: mData.monthData,
            axisLabel: {
              formatter (value, index) {
                if (~value.indexOf('1月')) {
                  return value;
                } else {
                  return value.split('\n')[1];
                }
              }
            }
          }
        ],
        yAxis: [
          {
            show: false,
            type: 'value'
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            data: mData.monthValue
          }
        ]
      },
      lineWeek: {
        grid: {
          top: '4%',
          left: '4%',
          right: '12%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        dataZoom: [
          {
            show: true,
            startValue: wData.weekValue.length - 12,
            endValue: wData.weekValue.length - 1
          },
          {
            type: 'inside',
            startValue: wData.weekValue.length - 12,
            endValue: wData.weekValue.length - 1
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: wData.weekData,
            axisLabel: {
              formatter (value, index) {
                if (~value.indexOf('1周')) {
                  return value;
                } else {
                  return value.split('\n')[1];
                }
              }
            }
          }
        ],
        yAxis: [
          {
            show: false,
            type: 'value'
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            data: wData.weekValue
          }
        ]
      },
    };
  }
}
</script>
