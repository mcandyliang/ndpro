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
        title: "成绩管理",
        subtext: [],
        search: 1,
        total: 159,
        change: 1,
        del: 1,
        table: [
          { label: "试卷ID", prop: "name" },
          { label: "姓名", prop: "dw" },
          { label: "分数", prop: "num" },
          { label: "部门名称", prop: "id" },
          { label: "试卷类型", prop: "add" },
          { label: "考试用时", prop: "del" },
          { label: "考试结束时间", prop: "time" }
        ],
        tableData: [{}]
      }
    };
  }
};
</script>

<style></style>
