<template>
  <div>
    <p class="title">信通电子</p>
    <div class="top">
      <div>
        <p>线路列表</p>
      </div>
      <div>
        <p>杆塔列表</p>
      </div>
      <div>
        <p>向平台同步设备</p>
      </div>
    </div>
    <div class="table-box">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="设备ID"> </el-table-column>
        <el-table-column prop="name" label="设备名称"> </el-table-column>
        <el-table-column prop="bm" label="部门"> </el-table-column>
        <el-table-column prop="type" label="设备类型"> </el-table-column>
        <el-table-column prop="detail" label="设备详细信息"> </el-table-column>
        <el-table-column prop="set" label="设置当前配置"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "A50E2710-11EA-B757-0143992F1D2C",
          name: "110KV临西线49号 庆元",
          bm: "锡林郭勒电业局输电处",
          type: "图像",
          detail: "设备详细信息",
          set: "当前配置"
        },
        {
          id: "A50E2710-11EA-B757-0143992F1D2C",
          name: "110KV临西线49号 庆元",
          bm: "锡林郭勒电业局输电处",
          type: "图像",
          detail: "设备详细信息",
          set: "当前配置"
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
  border-bottom: 1px solid #000;
  margin: 10px 30px;
}
.top div {
  border: 1px solid #000;
  border-radius: 5px;
  height: 40px;
  margin-right: 10px;
}
.top p {
  margin-top: 8px;
  padding: 0 5px;
  font-size: 22px;
  color: #00479d;
  font-weight: bold;
}
.table-box {
  margin: 10px 30px;
}
/deep/.el-table th > .cell {
  text-align: center;
}

/deep/.el-table .cell {
  text-align: center;
}
</style>
