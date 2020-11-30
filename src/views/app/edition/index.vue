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
        title: "版本列表",
        subtext: ["国网", "南网", "内蒙", "南电"],
        input3: "",
        search: "1",
        total: 159,
        table: [
          { label: "ID", prop: "name" },
          { label: "名称", prop: "dw" },
          { label: "版本号", prop: "num" },
          { label: "区域ID", prop: "id" },
          { label: "区域", prop: "add" },
          { label: "版本描述", prop: "del" },
          { label: "创建时间", prop: "time" },
          { label: "二维码", prop: "er" },
          { label: "当前版本", prop: "bb" }
        ],
        tableData: [
          {
            name: "23",
            dw: "在线监测",
            num: "1.0.8",
            id: "a50e2710",
            add: "国网",
            del: "版本1.0.8",
            time: "2020-05-08 09:41:03",
            bb: "当前版本"
          }
        ]
      }
    };
  }
};
</script>

<style scoped></style>
