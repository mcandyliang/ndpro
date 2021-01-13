<template>
  <div>
    <p class="title">杆塔倾斜设备管理</p>
    <div class="top">
      <div class="subtext">
        <div v-for="(item, index) in subtext" :key="index">
          <p>{{ item }}</p>
        </div>
      </div>
      <div class="total">
        共有数据：<span>{{ total }} </span>条

        <!-- 在线设备： <span>{{ line }}</span >台 
        离线设备： <span> {{ online }}</span>台 -->
      </div>
    </div>
    <div class="search">
      <el-input
        placeholder="从当前数据中检索"
        v-model="input3"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="table-box">
      <el-table
        ref="multipleTable"
        :data="Newitem"
        tooltip-effect="dark"
        style="width: 100%"
        :row-style="{ height: '20px' }"
        :cell-style="{ padding: '5px' }"
        :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="deviceSerial" label="设备序列号">
          <template slot-scope="scope">
            <span v-if="scope.row.deviceSerial == ''"
              ><el-button type="text" @click="open(scope.row, scope.$index)"
                >输入序列号</el-button
              >
            </span>
            <span v-else
              ><el-button type="text" @click="open(scope.row, scope.$index)">{{
                scope.row.deviceSerial
              }}</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="设备名称"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="lng" label="经度"> </el-table-column>
        <el-table-column prop="lat" label="纬度"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" style="color:red">
              离线
            </span>
            <span v-else style="color:green">
              在线
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="onlineTime" label="最后上线时间">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template>
            <img src="../../../../public/image/device/03.png" alt="" />
            &nbsp;
            <img src="../../../../public/image/device/05.png" alt="" />
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      departID: "1/",
      input3: "",
      total: 141,
      subtext: ["批量删除", "批量升级"],
      online: 0,
      line: 0
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    open(val, index) {
      // console.log(val);
      // console.log(index);
      this.$prompt("请输入序列号", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: val.deviceSerial
      })
        .then(({ value }) => {
          // this.$alert(value);
          // this.$post("/api/v2/device/update-device-serial", {
          //   deviceSerial: value,
          //   cameraIndexCode: val.cameraIndexCode
          // }).then(res => {
          //   // console.log(res);
          // });

          this.tableData[index].deviceSerial = value;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    getData() {
      this.$post("/api/v2/device/devicelist-wxpush", {
        page: this.page,
        pageSize: this.pageSize,
        departID: this.departID
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.list;
      });
    }
  },
  computed: {
    Newitem() {
      var _this = this;
      var Newitem = [];
      var tableData = _this.tableData;
      tableData.map(function(item) {
        if (
          item.deviceName.search(_this.input3) != -1 ||
          item.deviceSerial.search(_this.input3) != -1 ||
          item.createTime.search(_this.input3) != -1 ||
          (item.id + "").search(_this.input3) != -1 ||
          item.lat.search(_this.input3) != -1 ||
          item.lng.search(_this.input3) != -1 ||
          item.onlineTime.search(_this.input3) != -1
        ) {
          Newitem.push(item);
        }
      });
      return Newitem;
    }
  }
};
</script>

<style scoped>
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
  margin: 25px 30px 0 30px;
  height: 50px;
}
.table-box {
  margin: 10px 30px;
}
.cell {
  margin: 0 20px;
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
