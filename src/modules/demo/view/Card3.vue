<template>
  <div>
    <Card style="494px">
      <p slot="title">
        厂外巡检跟踪
      </p>
      <p style="text-align:center">
        <Button 
          type="ghost" 
          shape="circle" 
          icon="chevron-left"
        />
        2018/3/10
        <Button 
          type="ghost" 
          shape="circle" 
          icon="chevron-right"
        />
      </p>
      <p>
        <baidu-map 
          :center="{lng: 116.404, lat: 39.915}" 
          :zoom="15" 
          :scroll-wheel-zoom="true"
          class="map" 
          style="width: 480px; height: 375px;" 
        >
          <bm-polyline 
            :path="polylinePath" 
            :stroke-opacity="0.5" 
            :stroke-weight="2"
            stroke-color="blue"
          />
        </baidu-map>
      </p>
    </Card>
  </div>
</template>
<script>
import Vue from 'vue';
import BaiduMap from 'vue-baidu-map';

Vue.use(BaiduMap, {
  ak: '0lPULNZ5PmrFVg76kFuRjezF'
})

export default {
  data () {
    return {
      polylinePath: [
        { lng: 116.404, lat: 39.915 },
        { lng: 116.405, lat: 39.920 },
        { lng: 116.423493, lat: 39.907445 }
      ]
    };
  },
  mounted () {
  },
  methods: {
    
  }
}
</script>
