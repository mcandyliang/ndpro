<template>
  <div>
    <p class="title">远程升级</p>
    <div class="top">
      <div>
        <p>批量删除</p>
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
          border
          :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
          @selection-change="handleSelectionChange"
          show-overflow-tooltip
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="ID" width="100"> </el-table-column>
          <el-table-column prop="name" label="设备序列号" width="500">
          </el-table-column>
          <el-table-column prop="phone" label="MD5" width="500">
          </el-table-column>
          <el-table-column prop="dw" label="创建时间"> </el-table-column>
          <el-table-column label="当前版本"> </el-table-column>
          <el-table-column label="操作"> </el-table-column>
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
          id: 147,
          name:
            "http://www.cqset.com:3000/version/wxpush_arm.6.10.1717_release.zip",
          phone: "3709E6AFD8490FCA817D8A843963D74DF",
          dw: "5:12:31 pm"
        },
        {
          id: 147,
          name:
            "http://www.cqset.com:3000/version/wxpush_arm.6.10.1717_release.zip",
          phone: "3709E6AFD8490FCA817D8A843963D74DF",
          dw: "5:12:31 pm"
        },
        {
          id: 147,
          name:
            "http://www.cqset.com:3000/version/wxpush_arm.6.10.1717_release.zip",
          phone: "3709E6AFD8490FCA817D8A843963D74DF",
          dw: "5:12:31 pm"
        },
        {
          id: 147,
          name:
            "http://www.cqset.com:3000/version/wxpush_arm.6.10.1717_release.zip",
          phone: "3709E6AFD8490FCA817D8A843963D74DF",
          dw: "5:12:31 pm"
        },
        {
          id: 147,
          name:
            "http://www.cqset.com:3000/version/wxpush_arm.6.10.1717_release.zip",
          phone: "3709E6AFD8490FCA817D8A843963D74DF",
          dw: "5:12:31 pm"
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
  border: 1px solid #666666;
  margin: 10px 30px;
}

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
