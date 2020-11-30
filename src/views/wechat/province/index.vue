<template>
  <div>
    <p class="title">绑定省份</p>
    <div class="top">
      <div>
        <p>添加省份</p>
      </div>
      <div>
        <p>绑定省份</p>
      </div>
      <div>
        <p>省份列表</p>
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
          <el-table-column prop="name" label="部门名称"> </el-table-column>

          <el-table-column prop="sf" label="省份名称"> </el-table-column>

          <el-table-column label="操作"> </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="200">
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
          name: "重庆南电科技",
          sf: "重庆市"
        },
        {
          name: "重庆南电科技",
          sf: "重庆市"
        },
        {
          name: "重庆南电科技",
          sf: "重庆市"
        },
        {
          name: "重庆南电科技",
          sf: "重庆市"
        },
        {
          name: "重庆南电科技",
          sf: "重庆市"
        },
        {
          name: "重庆南电科技",
          sf: "重庆市"
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
  /* border: 1px solid #666666; */
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
