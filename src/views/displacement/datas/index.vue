<template>
  <div>
    <p class="title">边坡位移报警数据</p>

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
          border
          :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
          show-overflow-tooltip
          :row-style="{ height: '20px' }"
          :cell-style="{ padding: '0' }"
        >
          <el-table-column prop="id" label="设备ID" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="deviceName" label="设备名称">
          </el-table-column>
          <el-table-column label="报警数据" prop="data"> </el-table-column>
          <el-table-column label="报警数据时间" prop="time"> </el-table-column>

          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="159">
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
          id: "1",
          deviceName: "3339",
          data: "x:50.00000074505806;y:2.200000000016189;z:",
          time: "2020-11-6 16:20:45.00",
          createTime: "2020-11-16 15:59:06"
        },
        {
          id: "2",
          deviceName: "3339",
          data: "x:50.00000074505806;y:2.200000000016189;z:",
          time: "2020-11-6 16:20:45.00",
          createTime: "2020-11-16 15:59:06"
        },
        {
          id: "3",
          deviceName: "3339",
          data: "x:50.00000074505806;y:2.200000000016189;z:",
          time: "2020-11-6 16:20:45.00",
          createTime: "2020-11-16 15:59:06"
        }
      ]
    };
  }
};
</script>

<style scoped>
.table {
  border: 1px solid #666666;
  margin: 30px 30px;
}

.title {
  font-size: 44px;
  margin-top: 20px;
  margin-left: 30px;
}
.top {
  display: flex;
  /* border-bottom: 1px solid #666666; */
  margin: -40px 30px;
}
.top div {
  border: 1px solid #666666;
  border-radius: 5px;
  height: 40px;
  margin-right: 10px;
}
.top p {
  margin-top: 8px;
  padding: 0 5px;
  font-size: 22px;
  color: #729bdb;
  /* font-weight: bold; */
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
