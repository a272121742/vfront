<template>
  <div>
    <Card style="height: 240px;">
      <p slot="title">
        我的任务
      </p>
      <p>
        <Table 
          :columns="columns" 
          :data="data" 
          :show-header="false" 
          size="small"
        />
      </p>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [{
				key: 'name'
			}, {
				key: 'orderId'
			}, {
				key: 'status'
			}, {
				key: 'date'
			}],
      data: [{
        name: '月设备养护确认',
        orderId: '单据编号 7X90002827383936',
        status: '一级审核',
        date: '2018-2-22'
      }, {
        name: '3#水泵维修单',
        orderId: '单据编号 7X90002827383937',
        status: '执行',
        date: '2018-2-21'
      }, {
        name: '4#格栅维修单',
        orderId: '单据编号 7X90002827383938',
        status: '一级审核',
        date: '2018-2-20'
      }, {
        name: '设备养护单',
        orderId: '单据编号 7X90002827383939',
        status: '执行',
        date: '2018-2-19'
      }]
    };
  }
}
</script>
