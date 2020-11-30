<template>
  <div>
    <p class="title">传感器</p>
    <div class="top"></div>
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
      <div class="middle">
        <div>
          <p>添加传感器</p>
        </div>
        <div>
          <p>批量转移</p>
        </div>
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          border
          :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
          @selection-change="handleSelectionChange"
          show-overflow-tooltip
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="id"
            label="传感器ID"
            width="115"
          >
          </el-table-column>
          <el-table-column prop="name" label="传感器名称"> </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="cardnum"
            label="卡号"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="isonline" label="传感器状态">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="lasttime"
            label="最后上线时间"
            width="110"
          >
          </el-table-column>
          <el-table-column prop="num" label="设备序列号"> </el-table-column>
          <el-table-column prop="names" label="设备名称"> </el-table-column>
          <el-table-column prop="bm" label="隶属部门"> </el-table-column>
          <el-table-column label="定位"> </el-table-column>
          <el-table-column label="操作"> </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="20">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input3: "",
      tableData: [
        {
          id: "VK69PQ1B123463545",
          name: "110KV钠铧线105号",
          cardnum: "8986041110123454",
          isonline: "在线",
          lasttime: "2020-07-02 17:03",
          num: "243884600",
          names: "110KV钠铧线82号",
          bm: "杆塔倾斜设备"
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
.title {
  font-size: 44px;
  margin-top: 40px;
  margin-left: 30px;
}
.top {
  display: flex;
  border-bottom: 1px solid #666666;
  margin: 10px 30px;
}
.table {
  border: 1px solid #666666;
  margin: 10px 30px;
}

.search {
  /* margin: 10px; */
  width: 100%;
  border-bottom: 1px solid #666666;
}
.input-with-select {
  width: 250px;
  /* height: 25px; */
  margin: 10px;
}
.middle {
  border-bottom: 1px solid #666666;
  display: flex;
}
.middle div {
  background-color: #00479d;
  margin: 10px;
  border-radius: 7px;
}
.middle p {
  color: #fff;
  margin: 5px 5px;
  font-size: 22px;
}
.page {
  border-top: 1px solid #666666;
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
