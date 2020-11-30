<template>
  <div>
    <product :data="data"></product>
    <div class="navigation">
      <p>导航栏</p>
      <div class="nav">
        <div><p>综合在线监测</p></div>
        <div><p>全塔可视化</p></div>
        <div><p>塔倾监测</p></div>
        <div><p>多功能云台</p></div>
        <div>
          <img src="../../../../public/image/function/add.png" alt="" />
        </div>
      </div>
    </div>
    <div class="navigation">
      <p>功能</p>
      <div class="nav">
        <div>
          <div style="margin:20px 30px">
            <img src="../../../../public/image/function/album.png" alt="" />
            <p>相册</p>
          </div>
        </div>
        <div>
          <div style="margin:20px 30px">
            <img src="../../../../public/image/function/map.png" alt="" />
            <p>地图</p>
          </div>
        </div>
        <div>
          <p>相册</p>
        </div>
        <div>
          <p>相册</p>
        </div>
        <div>
          <p>相册</p>
        </div>
        <div>
          <p>相册</p>
        </div>
        <div>
          <p>相册</p>
        </div>
        <div>
          <p>相册</p>
        </div>
        <div>
          <p>相册</p>
        </div>
        <div>
          <img src="../../../../public/image/function/addplus.png" alt="" />
        </div>
      </div>
    </div>
    <div class="navigation">
      <p>菜单栏</p>
      <div class="nav">
        <div>设备</div>
        <div>巡检信息</div>
        <div>月报表</div>
        <div>地图</div>
        <div>我的</div>
      </div>
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
        title: "功能管理",
        subtext: ["修改功能"]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  margin: 20px 30px;
  border: 0.5px solid #666666;
  background-color: #fff;
  border-radius: 5px;
  p {
    margin: 10px;
  }
}
.nav {
  display: flex;

  p {
    font-size: 18px;
  }
}
.nav > div {
  background-color: #ccc;
  margin: 10px 20px;
  border-radius: 5px;
}
</style>
