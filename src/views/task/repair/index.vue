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
        title: "抢修工作管理",
        subtext: [],
        search: 1,
        total: 1,
        change: 1,
        del: 1,
        table: [
          { label: "抢修ID", prop: "name" },
          { label: "定位", prop: "id" },
          { label: "详细地址", prop: "add" },
          { label: "抢修工作类型", prop: "add" },
          { label: "抢修具体描述", prop: "del" },
          { label: "图片", prop: "time" },
          { label: "状态", prop: "time" }
        ],
        tableData: [{}]
      }
    };
  }
};
</script>

<style></style>
