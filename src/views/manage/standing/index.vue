<template>
  <div>
    <product :data="data"></product>
    <div class="search">
      <el-input
        placeholder="从当前设备列表"
        v-model="input"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="detail">
      <div>
        <div v-for="(item, index) in detail" :key="index" class="details">
          <p>{{ item }}</p>
        </div>
      </div>
      <div class="pages">
        <div class="page">
          <p>台账录入</p>
        </div>
        <div class="table">
          <el-table
            ref="multipleTable"
            :data="data.tableData"
            style="width: 100%"
            border
            :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
          >
            <el-table-column
              v-for="(item, index) in table"
              :key="index"
              :prop="item.prop"
              :label="item.label"
            >
            </el-table-column>
          </el-table>
        </div>
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
        title: "台账管理",
        total: 162
      },
      input: "",
      detail: [
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元",
        "110kv临西线43号大号侧庆元"
      ],
      table: [
        { label: "设备序列号", prop: "name" },
        { label: "设备名称", prop: "id" },
        { label: "记录时间", prop: "add" },
        { label: "设备状态", prop: "del" },
        { label: "操作人员", prop: "time" },
        { label: "维护记录", prop: "time" },
        { label: "图片", prop: "time" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.search {
  width: 280px;
  margin: 25px 30px 0 30px;
  height: 50px;
}
.detail {
  width: 96.5%;
  margin: 10px 30px 0 30px;
  border-top: 1px solid #666666;
  display: flex;
}
.details {
  border: 1px solid #666666;
  border-top: none;
  width: 280px;
  p {
    padding: 10px 30px;
    margin: 0;
  }
}
.pages {
  width: 100%;
}
.page {
  margin: 20px;

  width: 9%;
  p {
    font-size: 25px;
    margin: 0;
    padding: 10px;
    color: #00479d;
    text-align: center;
  }
}
.table {
  margin: 20px;
}
</style>
