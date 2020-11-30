<template>
  <div>
    <product :data="data"></product>
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
        title: "视频监测设备日志",
        subtext: [],
        total: 6,
        search: 1
      }
    };
  }
};
</script>

<style scoped></style>
