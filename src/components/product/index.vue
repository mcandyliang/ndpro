<template>
  <div>
    <p class="title">{{ data.title }}</p>
    <div class="top">
      <div class="subtext">
        <div v-for="(item, index) in data.subtext" :key="index">
          <p>{{ item }}</p>
        </div>
      </div>
      <div class="total" v-if="data.total">
        共有数据：
        <span>{{ data.total }}</span
        >条
      </div>
    </div>
    <div class="search">
      <el-input
        placeholder="数据搜索"
        v-model="data.input3"
        class="input-with-select"
        v-if="data.search"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="table" v-if="data.table">
      <div>
        <el-table
          ref="multipleTable"
          :data="data.tableData"
          style="width: 100%"
          border
          :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
        >
          <el-table-column type="selection" width="55" v-if="data.change">
          </el-table-column>
          <el-table-column
            v-for="(item, index) in data.table"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          >
          </el-table-column>
          <el-table-column label="操作" width="100" v-if="data.del">
            <template>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="data.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
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
  margin: 100px 30px;
  /* height: 500px; */
  /* border-radius: 8px; */
  /* text-align: center; */
}
.title {
  font-size: 40px;
  margin-top: 15px;
  margin-left: 30px;
  margin-bottom: 10px;
}
.top {
  margin: -10px 30px;
  /* margin-bottom: 20px; */
  padding-bottom: 30px;
  border-bottom: 1px solid #666666;
}
.subtext {
  display: flex;
}
.subtext div {
  border: 1px solid #666666;
  border-radius: 5px;
  height: 40px;
  margin-right: 10px;
  margin-bottom: -30px;
}

.top p {
  margin-top: 8px;
  padding: 0 5px;
  font-size: 21px;
  color: #2070ce;
  /* font-weight: bold; */
}
.total {
  float: right;
}
.top span {
  color: #fc2a2a;
  /* margin-bottom: 10px; */
}
.search {
  width: 280px;
  float: right;
  margin: 25px 30px 0 0;
  height: 50px;
}
.date {
  margin: 10px 40%;
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
