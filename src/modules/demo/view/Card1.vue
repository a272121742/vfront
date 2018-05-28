<template>
  <div>
    <Card style="height:240px;">
      <p slot="title">
        设备状态KPI
        <Button 
          v-if="this.$parent.$parent.$parent.$parent.editModel" 
          type="text" 
          style="width:44px;float:right; margin-right: 32px; padding-top: 3px;"
          @click="editModel=!editModel" 
        >
          编辑
        </Button>
      </p>
      <p style="text-align:center">
        <Button 
          type="ghost"
          shape="circle"
          icon="chevron-left"/>
        2018/3
        <Button
          type="ghost"
          shape="circle"
          icon="chevron-right"/>
      </p>
      <p>
        <Row :gutter="16">
          <Col 
            v-for="(item, index) in data" 
            :key="index" 
            :span="8">
          <div v-if="item.checked">
            <Card style="width:160px;height:60px;margin-bottom:6px;">
              <img 
                src="/static/images/complete.jpg"
                style="position: absolute; bottom: 12px; left: 12px;height: 30px;">
              <p style="font-size: 20px; position:absolute; right: 12px; top: 8px;">
                {{ item.value }}%
              </p>
              <p style="font-size: 12px; position:absolute; right: 12px; top: 32px;">
                {{ item.title }}
              </p>
            </Card>
          </div>
          </Col>
        </Row>
      </p>
    </Card>
    <Modal 
      ref="modal"
      :loading="true"
      v-model="editModel"
      class-name="vertical-center-modal"
      title="添加设备KPI" 
      @on-ok="onOK" 
      @on-cancel="onCancel">
      <Row :gutter="12">
        <Col 
          v-for="(item, index) in data" 
          :key="index" 
          :span="12">
        <div @click="onClick(item)">
          <Card style="width:240px;margin-bottom:6px;">
            <p 
              v-if="item.checked" 
              style="position:absolute;z-index:999;right:12px;top:6px;">
              √
            </p>
            <Row>
              <Col
                :span="3"
                :pull="1">
              <img 
                src="/static/images/complete.jpg" 
                style="height:30px;">
              </Col>
              <Col :span="21">
              <p style="font-weight:bolder;">
                {{ item.title }}
              </p>
              <p style="font-size: 12px;">
                {{ item.des }}
              </p>
              </Col>
            </Row>
          </Card>
        </div>
        </Col>
      </Row>
    </Modal>
  </div>
</template>
<style lang="less">
.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
        top: 0;
    }
}
</style>

<script>
const beforeData = [];
export default {
  data () {
    return {
      editModel: false,
      data: [{
        icon: 'complete.jpg',
        title: '关键设备完好率',
        des: '正常状态的A类设备占比',
        value: 98,
        checked: true
      }, {
        icon: 'complete.jpg',
        title: '缺陷消除率',
        des: '已完成状态消缺任务的占比',
        value: 74,
        checked: false
      }, {
        icon: 'complete.jpg',
        title: '设备维修及时率',
        des: '维修工单24小时内完成占比',
        value: 72,
        checked: false
      }, {
        icon: 'complete.jpg',
        title: '一般设备利用率',
        des: '正常状态的B类和C类设备占比',
        value: 76,
        checked: true
      }, {
        icon: 'complete.jpg',
        title: '维修完成率',
        des: '已完成状态维修工单的占比',
        value: 84,
        checked: false
      }, {
        icon: 'complete.jpg',
        title: '巡检异常率',
        des: '异常状态的巡检任务占比',
        value: 92,
        checked: false
      }, ]
    };
  },
  watch:{
    editModel (newModel, oldModel){
      if(newModel) {
        if(beforeData.length === 0) {
          this.data.forEach(item => {
            beforeData.push({icon: item.icon, title: item.title, des: item.des, value: item.value, checked: item.checked});
          });
        }else{
          beforeData.forEach((item, index) => {
            item.checked = this.data[index].checked;
          });
        }
      }
    }
  },
  created (){
    
  },
  methods: {
    onClick (item) {
      item.checked = !item.checked;
    },
    onOK () {
      setTimeout(() => {
        this.editModel = false;
        this.$Message.info('保存成功');
      }, 200);
    },
    onCancel (){
      this.data.forEach((item, index) => {
        item.checked = beforeData[index].checked;
      });
    }
  },
  
}
</script>
