<template>
  <div style="background:#F0F0F0; padding-top: 14px;">
    <Card style="height: 50px; border-left: 4px solid #11B3DF; margin: 12px 12px; padding-left: 30px;">
      <div style="margin-top: -7px;">
        <Select
          v-model="selectedCompany" 
          style="width:140px; height: 30px; font-size: 12px; line-height: 17px;">
          <Option 
            v-for="com in companyList" 
            :value="com.value" 
            :key="com.value">
            {{ com.label }}
          </Option>
        </Select>
        <Button
          v-if="!editModel"
          style="float:right;"
          type="primary"
          shape="circle"
          @click="editModel=!editModel">
          编辑
        </Button>
        <Button
          v-if="editModel"
          style="float:right"
          type="primary"
          shape="circle"
          @click="layoutSave">
          保存
        </Button>
        <Button 
          v-if="editModel"
          style="float:right"
          shape="circle"
          @click="layoutCanel">
          取消
        </Button>
      </div>
    </Card>
    <test 
      ref="t1" 
      :text="'1'"
      :cp="'cp1'"
      str="通过test组件传入"/>
    <component 
      ref="t2"
      :is="test"
      :text="'2'"
      :cp="'cp2'"
      str="通过component传入"/>
    <Button @click="onClick">打印</Button>
    <async-component 
      ref="t3"
      :text="'3'"
      :cp="'cp3'"
      :keep-alive="false"
      path="/demo/view/Card1"
      str="通过async-component传入"/>
      <!-- <div id="dragable">
      <grid-layout
        ref="dragable"
        :layout="layout"
        :col-num="2"
        :row-height="240"
        :is-draggable="editModel"
        :is-resizable="false"
        :margin="[12, 12]"
        :use-css-transforms="true"
        @layout-updated="layoutUpdatedEvent">
        <grid-item 
          v-for="(item, index) in layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :drag-allow-from="'.ivu-card-head'"
          :key="item.i">
          <p
            v-if="editModel"
            style="position:absolute;z-index:999;right:12px;top:12px;">
            <Button
              type="text"
              style="width:44px;"
              @click="onReplace(item)">
              替换
            </Button>
          </p>
          <async-component 
            :ref="'Card' + (index + 1)"
            :path="item.page"/>
        </grid-item>
      </grid-layout>
    </div> -->
  </div>
</template>

<style lang="less">
#dragable {
  .vue-grid-placeholder {
    background: #0bb1df;
    opacity: 0.1;
  }
}
</style>

<script>
import Vue from 'vue';
import VueGridLayout from 'vue-grid-layout';
import AsyncComponent from '@/components/AsyncComponent/index';
import test from './test';

const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;



const beforeLayout = [
	{ x: 0, y: 0, w: 1, h: 1, i: '0', page: '/demo/view/Card1' },
	{ x: 1, y: 0, w: 1, h: 1, i: '1', page: '/demo/view/Card2' },
	{ x: 0, y: 1, w: 1, h: 2, i: '2', page: '/demo/view/Card3' },
	{ x: 1, y: 1, w: 1, h: 1, i: '3', page: '/demo/view/Card4' },
	{ x: 1, y: 2, w: 1, h: 1, i: '4', page: '/demo/view/Card5' },
];
/**
 * 需要的数据：
 * 1. 已选模块 selectedModel
 * 		name, type, x, y, w, h, i, page
 * 2. 当前模块布局数据编辑前的缓存
 * 3. 
 */
export default {
	components: {
		GridLayout,
		GridItem,
    AsyncComponent,
    test: () => import('./test.vue')
	},
	data () {
		return {
      test: () => import('./test.vue'),
			// 页面布局更新监听事件
			filePath: '/demo/view/Card4',
			layoutUpdatedEvent (layout) {
			},
			// 编辑模式开关
			editModel: false,
			// 替换模块开关
			replaceModel: false,
			// 公司列表（服务端取数据）
			companyList: [{
				value: 'com1',
				label: '公司1'
			}, {
				value: 'com2',
				label: '公司2'
			}, {
				value: 'com3',
				label: '公司3'
			}],
			// 已选公司列表（服务端取数据 / 客户端缓存数据）
			selectedCompany: 'com1',
			// 页面布局（服务端取数据）
			layout: [],
			// 已选类型
			selectModelType: '图形报表',
			// 所有类型
			allTypes: [
				{ id: 1, name: '图形报表' },
				{ id: 2, name: '地图展示' },
				{ id: 3, name: '视图展示' },
				{ id: 4, name: '工作管理' }
			],
			// 已选模块
			selectModels: [{
				name: '设备分析',
				type: '图形报表'
			}, {
				name: '巡检分析',
				type: '图形报表'
			}, {
				name: '缺陷分析',
				type: '图形报表'
			}, {
				name: '维修分析',
				type: '图形报表'
			}, {
				name: '巡检跟踪',
				type: '工作管理'
			}, {
				name: '巡检工单',
				type: '工作管理'
			}],
			// 待选模块
			waitSelectMoodels: [{
				name: '图形1',
				type: '图形报表'
			}, {
				name: '图形2',
				type: '图形报表'
			}, {
				name: '图形3',
				type: '图形报表'
			}, {
				name: '图形4',
				type: '图形报表'
			}, {
				name: '地图1',
				type: '地图展示'
			}, {
				name: '地图2',
				type: '地图展示'
			}, {
				name: '地图3',
				type: '地图展示'
			}, {
				name: '地图4',
				type: '地图展示'
			}, {
				name: '视图1',
				type: '视图展示'
			}, {
				name: '视图2',
				type: '视图展示'
			}, {
				name: '视图3',
				type: '视图展示'
			}, {
				name: '视图4',
				type: '视图展示'
			}, {
				name: '工作1',
				type: '工作管理'
			}, {
				name: '工作2',
				type: '工作管理'
			}, {
				name: '工作3',
				type: '工作管理'
			}, {
				name: '工作4',
				type: '工作管理'
			}],
			// 选择中模块
			selectedModel: ''
		}
	},
	created () {
    this.layout = beforeLayout.map(item => ({ x: item.x, y: item.y, w: item.w, h: item.h, i: item.i, page: item.page }));
    
  },
  mounted () {
  },
	methods: {
    onClick () {
      this.$refs.t3.editModel = true;
    },
		layoutSave () {
			beforeLayout.length = 0;
			this.layout.forEach(item => {
				beforeLayout.push({ x: item.x, y: item.y, w: item.w, h: item.h, i: item.i, page: item.page });
			});
			this.$Message.info('保存成功');
			this.editModel = false;
		},
		layoutCanel () {
			this.layout = beforeLayout.map(item => ({ x: item.x, y: item.y, w: item.w, h: item.h, i: item.i, page: item.page }));
			this.editModel = false;
		},
		onOK () {

		},
		onRemove (model) {
			const index = this.selectModels.findIndex(item => item.name === model.name);
			this.selectModels.splice(index, 1);
			this.waitSelectMoodels.push(model)
		},

	}
};
</script>