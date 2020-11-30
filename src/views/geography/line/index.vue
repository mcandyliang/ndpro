<template>
  <div>
    <product :data="data"></product>
    <div class="rightlow">
      <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
      </el-amap>
    </div>
  </div>
</template>

<script>
import Product from "../../../components/product";
export default {
  components: {
    Product
  },
  data() {
    return {
      data: {
        title: "线路总览",
        total: 1593,
        subtext: [],
        search: 1
      },
      center: [106.502494, 29.625813],
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [
        {
          enableHighAccuracy: true, //是否使用高精度定位
          timeout: 100, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, //定位成功后在定位到的位置显示点标记
          showCircle: true, //定位成功后用圆圈表示定位精度范围
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见
          extensions: "all",
          pName: "Geolocation"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.rightlow {
  margin: 10px 30px;
  box-shadow: 0 0 8px gray;
  height: 800px;
  margin-top: 100px;
}
</style>
