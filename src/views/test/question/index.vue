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
        title: "题库管理",
        subtext: ["添加题库"],
        total: 8709,
        table: [
          { label: "序号", prop: "name" },
          { label: "题目内容", prop: "dw" },
          { label: "题目选项", prop: "num" },
          { label: "题目答案", prop: "id" },
          { label: "题目类型", prop: "add" },
          { label: "题目状态", prop: "del" },
          { label: "专业名称", prop: "time" }
        ],
        tableData: [{}]
      }
    };
  }
};
</script>

<style></style>
