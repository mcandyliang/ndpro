<template>
  <div>
    <p class="title">告警统计</p>
    <div class="top">
      <div class="total">
        共有数据：
        <span>{{ total }}</span
        >条
      </div>
    </div>

    <div class="search">
      <el-input
        placeholder="数据搜索"
        v-model="input3"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="table">
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          border
          :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="id" label="用户名称"> </el-table-column>
          <el-table-column prop="name" label="部门"> </el-table-column>
          <el-table-column prop="phone" label="杆塔线路"> </el-table-column>
          <el-table-column prop="dw" label="杆塔号"> </el-table-column>
          <el-table-column prop="user" label="设备名称"> </el-table-column>
          <el-table-column prop="num" label="序列号"> </el-table-column>
          <el-table-column prop="time" label="时间" width="100">
          </el-table-column>
          <el-table-column prop="type" label="告警类型"> </el-table-column>
          <el-table-column prop="detail" label="告警描述"> </el-table-column>
          <el-table-column prop="check" label="是否处理"> </el-table-column>
          <el-table-column label="现场"> </el-table-column>
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
      value1: "",
      tableData: [
        {
          id: "贵州运检公司",
          name: "检修二班",
          phone: "110KV乌兰线",
          dw: "100#",
          user: "110KV乌兰线25",
          num: "D1254125",
          time: "2020.10.29. 10:00:01",
          type: "视频",
          detail: "车辆闯入",
          check: "已处理"
        },
        {
          id: "贵州运检公司",
          name: "检修二班",
          phone: "110KV乌兰线",
          dw: "100#",
          user: "110KV乌兰线25",
          num: "D1254125",
          time: "2020.10.29. 10:00:01",
          type: "视频",
          detail: "车辆闯入",
          check: "已处理"
        },
        {
          id: "贵州运检公司",
          name: "检修二班",
          phone: "110KV乌兰线",
          dw: "100#",
          user: "110KV乌兰线25",
          num: "D1254125",
          time: "2020.10.29. 10:00:01",
          type: "视频",
          detail: "车辆闯入",
          check: "已处理"
        },
        {
          id: "贵州运检公司",
          name: "检修二班",
          phone: "110KV乌兰线",
          dw: "100#",
          user: "110KV乌兰线25",
          num: "D1254125",
          time: "2020.10.29. 10:00:01",
          type: "视频",
          detail: "车辆闯入",
          check: "已处理"
        },
        {
          id: "贵州运检公司",
          name: "检修二班",
          phone: "110KV乌兰线",
          dw: "100#",
          user: "110KV乌兰线25",
          num: "D1254125",
          time: "2020.10.29. 10:00:01",
          type: "视频",
          detail: "车辆闯入",
          check: "已处理"
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
  margin: 100px 30px;
  /* height: 500px; */
  /* border-radius: 8px; */
  /* text-align: center; */
}
.title {
  font-size: 44px;
  margin-top: 40px;
  margin-left: 30px;
}
.top {
  margin: -10px 30px;
  /* margin-bottom: 20px; */
  padding-bottom: 30px;
  border-bottom: 1px solid #666666;
}

.top p {
  margin-top: 8px;
  padding: 0 5px;
  font-size: 22px;
  color: #729bdb;
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
  margin: 25px 30px;
  height: 50px;
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
