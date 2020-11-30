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
        title: "计划工作管理",
        subtext: [],
        search: 1,
        total: 175,
        change: 1,
        del: 1,
        table: [
          { label: "ID", prop: "name" },
          { label: "名称", prop: "dw" },
          { label: "定位", prop: "id" },
          { label: "工作描述", prop: "add" },
          { label: "类型", prop: "jg" },
          { label: "开始时间", prop: "del" },
          { label: "结束时间", prop: "time" },
          { label: "人数", prop: "time" },
          { label: "管理单位", prop: "time" },
          { label: "单位负责人", prop: "time" },
          { label: "负责人电话", prop: "time" },
          { label: "大型机具", prop: "time" },
          { label: "风险等级", prop: "time" },
          { label: "状态", prop: "time" }
        ],
        tableData: [{}]
      }
    };
  }
};
</script>

<style></style>
