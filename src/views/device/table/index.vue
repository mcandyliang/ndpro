<template>
  <div>
    <p class="title">杆塔倾斜设备管理</p>
    <div class="top">
      <div>
        <p>批量删除</p>
      </div>
      <div>
        <p>批量升级</p>
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
        aligen:center
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="num" label="设备序列号"> </el-table-column>
        <el-table-column prop="cardnum" label="流量卡号" width="185">
        </el-table-column>
        <el-table-column prop="class" label="部门" width="70">
        </el-table-column>
        <el-table-column prop="name" label="设备名称" width="100">
        </el-table-column>
        <el-table-column prop="lg" label="经度·纬度" width="100">
        </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column prop="creattime" label="创建时间"> </el-table-column>
        <el-table-column prop="lasttime" label="最后上线时间">
        </el-table-column>
        <el-table-column prop="operate" label="操作"> </el-table-column>
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
          id: 143,
          num: "507224A03B91",
          cardnum: "89860437111870233887领沿达",
          class: "重庆南电科技",
          name: "内蒙古乌海超高压-气象",
          lg: "经：105.452 纬：108.452",
          state: "离线",
          creattime: "2017-05-16 17:51:10",
          lasttime: "2017-05-16 17:51:10",
          operate: ""
        },
        {
          id: 143,
          num: "507224A03B91",
          cardnum: "89860437111870233887领沿达",
          class: "重庆南电科技",
          name: "内蒙古乌海超高压-气象",
          lg: "经：105.452 纬：108.452",
          state: "离线",
          creattime: "2017-05-16 17:51:10",
          lasttime: "2017-05-16 17:51:10",
          operate: ""
        },
        {
          id: 143,
          num: "507224A03B91",
          cardnum: "89860437111870233887领沿达",
          class: "重庆南电科技",
          name: "内蒙古乌海超高压-气象",
          lg: "经：105.452 纬：108.452",
          state: "离线",
          creattime: "2017-05-16 17:51:10",
          lasttime: "2017-05-16 17:51:10",
          operate: ""
        },
        {
          id: 143,
          num: "507224A03B91",
          cardnum: "89860437111870233887领沿达",
          class: "重庆南电科技",
          name: "内蒙古乌海超高压-气象",
          lg: "经：105.452 纬：108.452",
          state: "离线",
          creattime: "2017-05-16 17:51:10",
          lasttime: "2017-05-16 17:51:10",
          operate: ""
        },
        {
          id: 143,
          num: "507224A03B91",
          cardnum: "89860437111870233887领沿达",
          class: "重庆南电科技",
          name: "内蒙古乌海超高压-气象",
          lg: "经：105.452 纬：108.452",
          state: "离线",
          creattime: "2017-05-16 17:51:10",
          lasttime: "2017-05-16 17:51:10",
          operate: ""
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
.cell {
  margin: 0 20px;
}
/deep/ .el-table th {
}
/deep/ .el-table th > .cell {
  padding-right: 0;
  text-align: center;
}
/deep/.el-table .cell {
  text-align: center;
  /* width: 180px; */
  /* margin: 0 5px; */
}
</style>
