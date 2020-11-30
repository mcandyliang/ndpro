<template>
  <div>
    <p class="title">心跳日志</p>
    <div class="top">
      <div>
        共有数据：
        <span>{{ total }}</span
        >条
      </div>
    </div>
    <div class="table">
      <div class="search">
        <el-input
          placeholder="数据搜索"
          v-model="input3"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>

      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
          @selection-change="handleSelectionChange"
          show-overflow-tooltip
        >
          <el-table-column prop="id" label="ID"> </el-table-column>
          <el-table-column prop="name" label="设备序列号"> </el-table-column>
          <el-table-column prop="dw" label="设备描述符(fd)"> </el-table-column>
          <el-table-column prop="lasttime" label="最后一次心跳时间">
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 175,
      input3: "",
      tableData: [
        {
          id: 725169,
          name: "B0D5CC52A27F",
          dw: "49",
          lasttime: "2020-8-27 15:10:13"
        },
        {
          id: 725169,
          name: "B0D5CC52A27F",
          dw: "49",
          lasttime: "2020-8-27 15:10:13"
        },
        {
          id: 725169,
          name: "B0D5CC52A27F",
          dw: "49",
          lasttime: "2020-8-27 15:10:13"
        },
        {
          id: 725169,
          name: "B0D5CC52A27F",
          dw: "49",
          lasttime: "2020-8-27 15:10:13"
        },
        {
          id: 725169,
          name: "B0D5CC52A27F",
          dw: "49",
          lasttime: "2020-8-27 15:10:13"
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.table {
  border-top: 1px solid #666666;
  margin: 10px 30px;
}
.title {
  font-size: 44px;
  margin-top: 40px;
  margin-left: 30px;
}
.top {
  margin: 0 30px;
  /* margin-bottom: 20px; */
  height: 20px;
}
.top div {
  float: right;
}
.top span {
  color: #fc2a2a;
}
.search {
  width: 280px;
  float: right;
}
.input-with-select {
  width: 250px;
  /* height: 25px; */
  margin: 10px;
}
.page {
  /* border-top: 1px solid #666666; */
  /* margin: 5px; */
  padding: 10px 0;
}
/deep/.el-table th > .cell {
  text-align: center;
}

/deep/.el-table .cell {
  text-align: center;
}
</style>
