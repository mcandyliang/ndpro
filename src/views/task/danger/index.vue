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
        title: "隐患作业管理",
        subtext: [],
        search: 1,
        total: 175,
        change: 1,
        del: 1,
        table: [
          { label: "ID", prop: "name" },
          { label: "定位", prop: "id" },
          { label: "地址详细", prop: "add" },
          { label: "隐患具体描述", prop: "del" },
          { label: "图片", prop: "time" },
          { label: "单位负责人", prop: "time" },
          { label: "负责人电话", prop: "time" },
          { label: "状态", prop: "time" }
        ],
        tableData: [{}]
      }
    };
  }
};
</script>

<style></style>
