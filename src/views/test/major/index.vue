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
        title: "专业管理",
        subtext: ["添加专业"],
        search: 1,
        total: 159,
        change: 1,
        del: 1,
        table: [
          { label: "专业ID", prop: "name" },
          { label: "专业名称", prop: "dw" },
          { label: "部门名称", prop: "id" },
          { label: "类型", prop: "add" },
          { label: "考试及格线", prop: "jg" },
          { label: "考试开始时间", prop: "del" },
          { label: "考试结束时间", prop: "time" }
        ],
        tableData: [{}]
      }
    };
  }
};
</script>

<style></style>
