<template>
  <div>
    <p class="title">报警统计</p>
    <div class="top">
      <div class="subtext">
        <div>
          <p>巡检推送</p>
        </div>
        <div>
          <p>报警推送</p>
        </div>
        <div>
          <p>激光推送</p>
        </div>
      </div>
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
      <div class="date">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          border
          :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="id" label="序列号"> </el-table-column>
          <el-table-column prop="name" label="设备名称"> </el-table-column>
          <el-table-column prop="phone" label="隶属单位"> </el-table-column>
          <el-table-column prop="dw" label="报警时间"> </el-table-column>
          <el-table-column prop="user" label="报警图片"> </el-table-column>
          <el-table-column prop="num" label="报警次数"> </el-table-column>
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
      total: 1,
      input3: "",
      value1: "",
      tableData: [
        {
          id: "d39648388",
          name: "布控球测试",
          phone: "重庆南电测试",
          dw: "2020-05-08 09:41:03",
          user: "",
          num: 59
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
  margin: 80px 30px;
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
