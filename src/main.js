import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/zh-CN"; // lang i18n

import "@/styles/index.scss"; // global css

// import echarts from "vue-echarts";
import App from "./App";
import store from "./store";
import router from "./router";
import AMap from "vue-amap";
import "@/icons"; // icon
import "@/permission"; // permission control
import axios from "axios";
import Qs from "qs";
// import $ from 'jquery'
// import "../public/zTree_v3/js/jquery.ztree.core.min.js";
// import "../public/zTree_v3/js/jquery.ztree.excheck.min.js";
// import "../public/zTree_v3/css/zTreeStyle/zTreeStyle.css";
// axios.defaults.baseURL = "http://192.168.1.110:3000";
Vue.prototype.baseUrl = "http://www.cqset.com:3000";
Vue.prototype.$get = function(api, data) {
  if (data === undefined) {
    data = {};
  }
  var ox = axios.get(this.baseUrl + api, { params: data });
  return ox;
};
Vue.prototype.$post = function(api, data) {
  data = Qs.stringify(data);
  var ox = axios.post(this.baseUrl + api, data);
  return ox;
};
const token = "111";

// axios.defaults.headers['authorization'] = token;

Vue.use(AMap);
// Vue.prototype.$echarts = echarts;
AMap.initAMapApiLoader({
  key: "0c3cef4b333aa2918685e4a0d4559f68",
  plugin: [
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.PolyEditor", //编辑 折线多，边形
    "AMap.CircleEditor", //圆形编辑器插件
    "AMap.Geolocation", //定位控件，用来获取和展示用户主机所在的经纬度位置
    "AMap.ControlBar"
  ]
});
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
