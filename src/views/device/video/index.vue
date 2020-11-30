<template>
  <div>
    <p class="title">视频监测账号列表</p>
    <div class="top">
      <div>
        <p>批量删除</p>
      </div>
      <div>
        <p>增加账号</p>
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
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="部门名称" width="500">
        </el-table-column>
        <el-table-column prop="cardnum" label="萤石账号" width="500">
        </el-table-column>
        <el-table-column label="操作"> </el-table-column>
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
          name: "重庆南电科技",
          cardnum: "cqndkj"
        },
        {
          name: "鄂尔多斯电业局",
          cardnum: "cqset_nm_eeds"
        },
        {
          name: "乌海电业局",
          cardnum: "cqset_nm_wh"
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
