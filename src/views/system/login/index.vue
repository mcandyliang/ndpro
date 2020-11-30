<template>
  <div>
    <p class="title">系统登录</p>
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
          :data="
            tableData.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          style="width: 100%"
          border
          :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="name" label="登录账户"> </el-table-column>
          <el-table-column prop="id" label="登录ID"> </el-table-column>
          <el-table-column prop="address" label="登录地址"> </el-table-column>
          <el-table-column prop="from" label="验证码来源"> </el-table-column>
          <el-table-column prop="phone" label="电话号码"> </el-table-column>

          <el-table-column prop="dw" label="登录验证码"> </el-table-column>
          <el-table-column prop="num" label="登录时间"> </el-table-column>
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
      total: 159,
      input3: "",
      pagesize: 5,
      currentPage: 1,
      tableData: [
        {
          name: "undefined",
          id: "undefined",
          address: "undefined",
          from: "谢映波",
          phone: "13996944144",
          dw: "014596",
          num: "2020-7-29 09:56:39"
        },
        {
          name: "undefined",
          id: "undefined",
          address: "undefined",
          from: "谢映波",
          phone: "13996944144",
          dw: "014596",
          num: "2020-7-29 09:56:39"
        },
        {
          name: "undefined",
          id: "undefined",
          address: "undefined",
          from: "谢映波",
          phone: "13996944144",
          dw: "014596",
          num: "2020-7-29 09:56:39"
        },
        {
          name: "undefined",
          id: "undefined",
          address: "undefined",
          from: "谢映波",
          phone: "13996944144",
          dw: "014596",
          num: "2020-7-29 09:56:39"
        },
        {
          name: "undefined",
          id: "undefined",
          address: "undefined",
          from: "谢映波",
          phone: "13996944144",
          dw: "014596",
          num: "2020-7-29 09:56:39"
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
